const TodoItem = require('../models/TodoItem.js')

const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  console.log('landed')
  console.log(req.body)
  const testTodo = new TodoItem({
      task: req.body.data.task
    });

    testTodo.save()
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        res.send(error);
      })

});

router.get('/all', (req,res) => {
  console.log("hit all")
  TodoItem.find({}, (err,result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
      res.send(result)
    }
  })
})
router.post('/toggle', (req,res) => {
  console.log(req)
  let id = req.body.id
  TodoItem.findOne({_id:id}, (err,todo) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(todo)
      todo.completed = !todo.completed
      todo.save( (err) => {
        if (err){
          console.log("ERROR: ", error)
        }
        else {
          res.send(todo)
        }
      })

    }
  })
})

router.post('/delete', (req,res) => {
  console.log(req)
  TodoItem.remove({_id:req.body.id}, (err) => {
    if (err){
      console.log("err", err)

    }
    else {
      console.log('Successfully removed')
    }
  })
})

module.exports = router;
