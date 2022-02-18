const express = require('express');
const ProjectModel = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
  ProjectModel.getAll()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {
    const project = req.body
    const {project_name} = req.body;
    if(project_name === undefined || typeof project_name !== 'string' || !project_name.trim() ){
        next({status: 400, message: "invalid project_name"})
    }
    else {
        ProjectModel.add(project)
            .then(project => {
                res.status(201).json({
                    ...project,
                    project_completed: project.project_completed === 0 ? false : true
                })
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

