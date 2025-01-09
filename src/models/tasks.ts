import dbpool from '../db/connection'
import { Task } from '../interfaces/task'

const getTasksModel = async () => {
	const [tasks] = await dbpool.query('SELECT * FROM tasks')
	return tasks
}

const getTaskModel = async (id: number) => {
	const [task] = await dbpool.query('SELECT * FROM tasks WHERE id = ?', [id])
	return task
}

const getTodayTasksModel = async () => {
	const [todaytasks] = await dbpool.query(
		'SELECT * FROM tasks WHERE type = ?',
		['today']
	)
	return todaytasks
}

const deleteTaskModel = async (id: number) => {
	await dbpool.query('DELETE FROM tasks WHERE id = ?', [id])
}

const createTaskModel = async (task: Partial<Task>) => {
	await dbpool.query(
		`INSERT INTO tasks (title, description, priority, type) 
             VALUES (?, ?, ?, ?)`,
		[task.title, task.description, task.priority || 'low', task.type || 'today']
	)
}

export {
	getTasksModel,
	getTaskModel,
	getTodayTasksModel,
	deleteTaskModel,
	createTaskModel
}
