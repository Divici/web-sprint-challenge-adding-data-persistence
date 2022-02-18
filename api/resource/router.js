const express = require('express');
const ResourceModel = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
  ResourceModel.getAll()
    .then(resources => {
        res.json(resources)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
    const resource = req.body
    const {resource_name} = req.body;
    if(resource_name === undefined || typeof resource_name !== 'string' || !resource_name.trim() ){
        next({status: 400, message: "invalid resource_name"})
    }
    else {
        ResourceModel.add(resource)
            .then(resource => {
                res.status(201).json(resource)
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