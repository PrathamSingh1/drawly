import express, { type Router } from "express";
import { roomHandler, signinUser, signupUser } from "../handler/user.handler";
import { userMiddleware } from "../middleware/user.middleware";

const router: Router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/room", userMiddleware, roomHandler);

export default router;
