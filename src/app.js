const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    url: url,
    title: title,
    techs: techs,
    likes: 0,
  };
  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { url, title, techs } = request.body;
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index < 0) {
    return response.status(400).send("not found");
  }

  repositories[index].url = url ? url : repositories[index].url;
  repositories[index].title = title ? title : repositories[index].title;
  repositories[index].techs = techs ? techs : repositories[index].techs;

  return response.status(200).json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);
  if (index < 0) {
    return response.status(400).send("not found");
  }
  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);
  if (index < 0) {
    return response.status(400).send("not found");
  }
  repositories[index].likes++

  return response.status(200).json(repositories[index]);
});


module.exports = app;
