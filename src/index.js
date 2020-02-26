const express = require('express');

const App = new express();

const proj = [];
let indice = null;
let Count = 0
App.use(express.json());
App.use(logs);


function logs(req, res, next) {
  console.count('Numero de requisições');
  return next();
}
function ProjExist(req, res, next) {
  const { id } = req.params;
  const prj = proj.find(e => e.id === id)
  if (!prj) {
    return res.json({ error: "Id informado não foi encontrado" });
  }
  indice
  return next();
}


App.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;

  proj.push({
    id: id,
    title: title,
    tasks: tasks

  });

  res.json(proj);
});

App.post('/projects/:id/tasks', ProjExist, (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  const prj = proj.find(e => e.id === id);

  prj.tasks.push(title);

  return res.json(prj)

});


App.get("/projects", (req, res) => {
  res.json(proj);
});

App.put("/projects/:id", ProjExist, (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const { tasks } = req.body;

  const prj = proj.find(e => e.id === id);

  prj.title = title;
  prj.tasks = tasks;

  res.json(proj);
  return next();
});


App.delete("/projects/:id", ProjExist, (req, res, next) => {
  const { id } = req.params;

  const prjIndex = proj.findIndex(e => e.id === id);

  proj.splice(prjIndex, 1);

  return res.send();
});


App.listen("3000");