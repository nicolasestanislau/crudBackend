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
  const { name, id, status } = req.body;

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExist) {
    return res.status(404).json("Todo not exist");
  }
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });

  return res.status(200).json(todo);
});

//Delete
allRoutes.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const intId = parseInt(id);

  if (!intId) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return res.status(404).json("Todo not exist");
  }

  await prisma.todo.delete({ where: { id: intId } });
  return res.status(200).send();
});

module.exports = allRoutes;
