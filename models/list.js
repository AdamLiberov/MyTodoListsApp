const mongoose = require('mongoose');
const Todo = require('./todo');

const ListS = mongoose.Schema({
title: String,
image: String,
todos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }
]
});

ListS.pre('remove', async function(){
 await Todo.remove({
     _id: {
      $in: this.todos    
     }
 })
})
module.exports = mongoose.model('List', ListS);