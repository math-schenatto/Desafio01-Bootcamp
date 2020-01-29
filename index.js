const express = require('express');

const server = express();
server.use(express.json());

projects_list = [];
var count = 0;


//Middlewares
function checkValidId(req, res, next){
  const { id } = req.params;
  
  for(var project in projects_list){
    if(projects_list[project].id == id){
      next();
    }
  }

  return res.status(400).json({ error: 'Invalid ID'});

}

function countReq(req, res, next){
  
  count+=1;
  console.log(`Requisição nº ${count}`);
  next();
  
}
////////////////////////////////////////////////////////////////

server.get('/projects', countReq, (req, res) =>{

  return res.json(projects_list);

});

server.post('/projects', countReq, (req, res)=>{
  
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;

  const new_project = {
    id: id,
    title: title, 
    tasks: tasks,
  }

  projects_list.push(new_project);

  return res.json(projects_list);

});

server.put('/projects/:id', checkValidId, countReq, (req, res) =>{

  const { id } = req.params;
  const { title } = req.body;

  for(var project in projects_list){
    if(projects_list[project].id == id){
      projects_list[project].title = title;
    }
  }

  return res.json(projects_list);

});

server.delete('/projects/:id', checkValidId, countReq, (req, res) =>{
  const { id } = req.params;

  for(var project in projects_list){
    if(projects_list[project].id == id){
      projects_list.splice(project, 1);
      break;
    }
  }

  return res.json(projects_list);

});

server.post('/projects/:id/tasks', checkValidId, countReq, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;
  
  for(var project in projects_list){
    if(projects_list[project].id == id){
      projects_list[project].tasks.push(title);
    }
  }

  return res.json(projects_list);

});

server.listen(3000);

