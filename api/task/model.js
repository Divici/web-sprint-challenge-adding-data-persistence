const db = require('../../data/dbConfig')

async function getAll() {
    const tasks = await db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select('t.*', 'p.project_name', 'p.project_description')

    const result = []

    tasks.forEach(task=>{
        if(task.task_id){
            result.push({
                task_id: task.task_id,
                task_description: task.task_description,
                task_notes: task.task_notes,
                task_completed: task.task_completed === 0 ? false : true,
                project_name: task.project_name,
                project_description: task.project_description,
            })
        }
    })
    return result
}

async function add(task) { 
    const [id] = await db('tasks').insert(task)
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .where('task_id', id)
        .select('t.*').first()
}

module.exports = {
    getAll,
    add,
}