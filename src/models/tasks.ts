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
		'SELECT * FROM tasks WHERE type = ? AND completed = ?',
		['today', false]
	)
	return todaytasks
}

const getUpcomingTasksModel = async () => {
	const [upcomingTasks] = await dbpool.query(
		'SELECT * FROM tasks WHERE type = ? AND completed = ?',
		['upcoming', false]
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
		`INSERT INTO tasks (title, description, priority, type, completed) 
             VALUES (?, ?, ?, ?, ?)`,
		[
			task.title,
			task.description,
			task.priority || 'low',
			task.type || 'today',
			task.completed || false
		]
	)
}

const updateTaskModel = async (id: number, task: Partial<Task>) => {
	const updates = Object.keys(task)
	const query = `UPDATE tasks SET ${updates.map(
		update => `${update} = ?`
	)} WHERE id = ?`
	const properties = [...Object.values(task), id]

	await dbpool.query(query, properties)
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
