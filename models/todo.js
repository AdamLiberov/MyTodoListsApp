const mongoose = require('mongoose');
const SubTodo = require('./subTodo');

const TodoS = new mongoose.Schema({
title: String,
isDone: { type: Boolean, default: false },
subTodos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo'
    }
]
});

TodoS.pre('remove', async function(){
    await SubTodo.remove({
        _id: {
         $in: this.subTodos    
        }
    })
   })
module.exports = mongoose.model('Todo', TodoS);