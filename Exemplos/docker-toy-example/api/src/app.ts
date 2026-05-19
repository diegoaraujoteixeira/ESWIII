import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
  }),
);

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

export { app };