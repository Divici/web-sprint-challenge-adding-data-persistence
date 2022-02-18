const express = require('express');
const TaskModel = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
  TaskModel.getAll()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
    const task = req.body
    const {task_description} = req.body;
    if(task_description === undefined || typeof task_description !== 'string' || !task_description.trim() ){
        next({status: 400, message: "invalid task_description"})
    }
    else {
        TaskModel.add(task)
            .then(task => {
                res.status(201).json(task)
            })
            .catch(next)
    }
  
  })

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;