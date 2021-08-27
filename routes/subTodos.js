const express = require('express');
const router = express.Router({mergeParams: true});
const middleware = require('../middleware');
const Todo = require('../models/todo');
const List = require('../models/list');
const SubTodo = require('../models/subTodo');

/* GET home page. */
router.post('/', middleware.isLoggedIn ,middleware.asyncErrorHandler(async function(req, res, next){
 console.log('5');
 const newSubTodo =  await SubTodo.create(req.body.subTodo);
 const parentTodo = await Todo.findById(req.params._id);
 console.log('6 ', parentTodo);
 parentTodo.subTodos.push(newSubTodo);
 parentTodo.save();
 console.log('7', parentTodo);
 res.redirect(`/lists/${req.params.id}`);
}))

router.put('/:__id', middleware.isLoggedIn ,async (req, res, next) => {
    if(req.body.subTodo === undefined){
        req.body.subTodo = {isDone: true};
      }else if(req.body.subTodo.isDone === 'on'){
        req.body.subTodo.isDone = false;
      }
    await SubTodo.findByIdAndUpdate(req.params.__id, req.body.subTodo);
res.redirect(`/lists/${req.params.id}`);
});

router.delete('/:__id', middleware.isLoggedIn ,async (req, res, next) => {
    await SubTodo.findByIdAndRemove(req.params.__id);
    res.redirect(`/lists/${req.params.id}`);
})
module.exports = router;
