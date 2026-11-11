import express, { type Express } from "express";
import userRouter from "./router/user.route";

const app: Express = express();

app.use(express.json());

// Routes
app.use("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/user", userRouter);

export default app;
