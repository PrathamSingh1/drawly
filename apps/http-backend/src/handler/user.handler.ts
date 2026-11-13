import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  CreateRoomSchema,
  SigninSchema,
  SignupSchema,
} from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";

export const signupUser = async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.status(201).json({
      userId: user.id,
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.json({
        message: "Incorrect Inputs",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.username,
        password: parsedData.data.password,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "User NOT Found",
      });
    }

    const token = jwt.sign(
      {
        userId: user?.id,
      },
      JWT_SECRET,
    );

    return res.status(200).json({
      message: "User Login successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const roomHandler = async (req: Request, res: Response) => {
  try {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.json({
        message: "Incorrect Inputs",
      });
    }

    // @ts-ignore
    const userId = req.userId;

    try {
      const room = await prisma.room.create({
        data: {
          slug: parsedData.data.name,
          adminId: userId,
        },
      });

      return res.status(200).json({
        roommId: room.id,
      });
    } catch (error) {
      return res.json({
        message: "Room is already taken",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
