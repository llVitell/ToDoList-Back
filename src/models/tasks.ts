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

const getUpcomingTasksModel = async () => {
	const [upcomingTasks] = await dbpool.query(
		'SELECT * FROM tasks WHERE type = ?',
		['upcoming']
	)
	return upcomingTasks
}

const getCompletedTasksModel = async () => {
	const [completedTasks] = await dbpool.query(
		'SELECT * FROM tasks WHERE completed = ?',
		[true]
	)
	return completedTasks
}

const createTaskModel = async (task: Partial<Task>) => {
	await dbpool.query(
		`INSERT INTO tasks (title, description, priority, type) 
             VALUES (?, ?, ?, ?)`,
		[task.title, task.description, task.priority || 'low', task.type || 'today']
	)
}

const updateTaskModel = async (id: number, task: Partial<Task>) => {
	await dbpool.query(
		`UPDATE tasks SET title = ?, description = ?, priority = ?, type = ?, completed = ? WHERE id = ?`,
		[task.title, task.description, task.priority, task.type, task.completed, id]
	)
}

const deleteTaskModel = async (id: number) => {
	await dbpool.query('DELETE FROM tasks WHERE id = ?', [id])
}

const deleteCompletedTasksModel = async () => {
	await dbpool.query('DELETE FROM tasks WHERE completed = ?', ['true'])
}

export {
	getTasksModel,
	getTaskModel,
	getTodayTasksModel,
	getUpcomingTasksModel,
	getCompletedTasksModel,
	createTaskModel,
	updateTaskModel,
	deleteTaskModel,
	deleteCompletedTasksModel
}
