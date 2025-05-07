import express, { Request, Response } from "express";
import { VM } from "vm2"; // Import vm2 for secure code execution

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the CTP Skills Platform API");
});

app.get("/api/test", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the CTP Skills Platform",
  });
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});



