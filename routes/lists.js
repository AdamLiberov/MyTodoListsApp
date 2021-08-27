const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const List = require('../models/list');
const User = require('../models/user');
const mongoose = require('mongoose');

//routes: 
router.get('/', middleware.isLoggedIn ,middleware.asyncErrorHandler(async (req, res, next) => {
  console.log('1'); 
  const user = await User.findById(req.user._id).populate({
    path: 'lists',
    options: { sort: {'_id': -1} }
  });
  console.log(user.lists);
  res.render('lists', {lists: user.lists});
}));

router.post('/', middleware.isLoggedIn, middleware.asyncErrorHandler(async (req, res, next) => {
  const newList = await List.create(req.body.list);
  console.log(newList);
  const foundUser = await User.findById(req.user._id);
  foundUser.lists.push(newList);
  foundUser.save();
  req.user = foundUser;
  res.redirect(`/lists`);
}));

router.get('/:id', middleware.isLoggedIn ,async (req, res, next) => {
 console.log('9');
  const list = await List.findById(req.params.id).populate({
   path: 'todos',
   populate: {
      path: 'subTodos', model: 'SubTodo'
  }
 });
 console.log(list.todos);
 res.render('show', {list: list});
});

router.delete('/:id', middleware.isLoggedIn, async (req, res, next) => {
const list = await List.findById(req.params.id);
list.remove();
res.redirect('/lists');
});
router.put('/:id', async (req, res, next) => {
  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body.list);
  res.redirect(`/lists/${updatedList._id}`);
});
module.exports = router;
