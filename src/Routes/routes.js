const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const arrayTODO = [{ name: "nicolas", status: false }];
const allRoutes = express.Router();

// Create
allRoutes.post("/todos", async (req, res) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  //arrayTODO.push({ name, status: false });
  return res.status(201).json(arrayTODO);
});

//Read
allRoutes.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  return res.status(200).json(todos);
});

//Update
allRoutes.put("/todos", async (req, res) => {
  const { name, id, stauts } = req.body;

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });
});

module.exports = allRoutes;
