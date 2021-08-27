const express = require('express');
const router = express.Router({mergeParams: true});
const middleware = require('../middleware');
const Todo = require('../models/todo');
const List = require('../models/list');

/* GET home page. */
router.post('/', middleware.isLoggedIn , async function(req, res, next) {
    const newTodo = await Todo.create(req.body.todo);
    const parentList = await List.findById(req.params.id);
    parentList.todos.push(newTodo);
    parentList.save();
    console.log(parentList);
    console.log('111');
    res.redirect(`/lists/${parentList._id}`);
});
router.delete('/:_id', middleware.isLoggedIn ,async (req, res, next) => {
  const listToRemove = await Todo.findById(req.params._id);
  await listToRemove.remove();
  res.redirect(`/lists/${req.params.id}`);
});
router.put('/:_id', middleware.isLoggedIn , async (req, res, next) => {
  console.log('update route');
  console.log(req.body.todo);
  if(req.body.todo === undefined){
    req.body.todo = {isDone: true};
  }else if(req.body.todo.isDone === 'on'){
    req.body.todo.isDone = false;
  }
  const newTodo = req.body.todo;
  await Todo.findByIdAndUpdate(req.params._id, newTodo);
  res.redirect(`/lists/${req.params.id}`);
})
module.exports = router;
