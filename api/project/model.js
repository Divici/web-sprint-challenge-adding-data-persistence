const db = require('../../data/db-config')

function getAll() {
    return db('projects')
}

function add(project) { 
    
    return db('projects').insert(project)
    .then(([project_id])=>{
      return db('projects').where('project_id', project_id).first()
    })
}

module.exports = {
    getAll,
    add,
}