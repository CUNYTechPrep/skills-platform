import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/test", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the CTP Skills Platform",
  });
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
