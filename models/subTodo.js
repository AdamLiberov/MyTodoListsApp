const mongoose = require('mongoose');

const subTodoS = new mongoose.Schema({
body: String,
isDone: {type: Boolean, default: false}
});


module.exports = mongoose.model('SubTodo', subTodoS);