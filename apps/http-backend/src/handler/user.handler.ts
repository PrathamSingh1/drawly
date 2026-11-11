import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  CreateRoomSchema,
  SigninSchema,
  SignupSchema,
} from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/config";

export const signupUser = (req: Request, res: Response) => {
  try {
    const data = SignupSchema.safeParse(req.body);
    if (!data.success) {
      return res.json({
        message: "Incorrect Inputs",
      });
    }

    // db logic

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signinUser = (req: Request, res: Response) => {
  try {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
      return res.json({
        message: "Incorrect Inputs",
      });
    }

    const userId = 1;
    const token = jwt.sign(
      {
        userId,
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

export const roomHandler = (req: Request, res: Response) => {
  try {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
      return res.json({
        message: "Incorrect Inputs",
      });
    }

    return res.status(200).json({
      message: "Room for the user",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
