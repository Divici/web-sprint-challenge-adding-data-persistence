const db = require('../../data/db-config')

function getAll() {
    return db('resources')
}

function add(resource) { 
    
    return db('resources').insert(resource)
    .then(([resource_id])=>{
      return db('resources').where('resource_id', resource_id).first()
    })
}

module.exports = {
    getAll,
    add,
}