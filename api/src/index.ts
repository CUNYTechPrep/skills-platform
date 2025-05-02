import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/test", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the CTP Skills Platform",
  });
});

//User Routes
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.post.findMany();
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
})

app.post("/api/users", async (req: Request, res: Response) => {
  const { email, name, password, role } = req.body;
  try {
    const user = await prisma.pots.create({
      data: {
        email, 
        name,
        role
      }, 
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
})

//Quiz Routes
app.get("/api/quizzes", async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany(); 
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

app.get("/api/users/:userId/quizzes", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const userQuizzes = await prisma.userCompletion.findMany({
      where: { userId },
      include: { quiz: true }, 
    });
    res.json(userQuizzes);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch quizzes for user ID ${userId}` });
  }
});

app.post("/api/quizzes", async (req: Request, res: Response) => {
  const { name, topicId, numQuestions } = req.body;
  try {
    const newQuiz = await prisma.quiz.create({
      data: {
        name,
        topicId,
        numQuestions,
      },
    });
    res.json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

//Table of Questions

//String question
//Array of answers 
//Question name
//Function to turn answers into a storabke format