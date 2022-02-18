const db = require('../../data/dbConfig')

async function getAll() {
    const projects = await db('projects')

    const result = []

    projects.forEach(project=>{
        if(project.project_id){
            result.push({
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: project.project_completed
            })
        }
    })
    return result
}

async function add(project) { 
    const project_id = await db('projects').insert(project)
    
    return db('projects').where('project_id', project_id).first()
}

module.exports = {
    getAll,
    add,
}