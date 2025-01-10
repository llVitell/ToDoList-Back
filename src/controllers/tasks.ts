import { Request, Response } from 'express'
import {
	getTasksModel,
	getTaskModel,
	getTodayTasksModel,
	getUpcomingTasksModel,
	getCompletedTasksModel,
	createTaskModel,
	updateTaskModel,
	deleteTaskModel,
	deleteCompletedTasksModel
} from '../models/tasks'

const getTasks = async (req: Request, res: Response) => {
	const tasks = await getTasksModel()

	res.json(tasks)
}

const getTask = async (req: Request, res: Response) => {
	const { id } = req.params
	const task = await getTaskModel(Number(id))

	res.json(task)
}

const getTodayTasks = async (req: Request, res: Response) => {
	const todayTasks = await getTodayTasksModel()

	res.json(todayTasks)
}

const getUpcomingTasks = async (req: Request, res: Response) => {
	const upcomingTasks = await getUpcomingTasksModel()

	res.json(upcomingTasks)
}

const getCompletedTasks = async (req: Request, res: Response) => {
	const completedTasks = await getCompletedTasksModel()

	res.json(completedTasks)
}

const createTask = async (req: Request, res: Response) => {
	const { body } = req

	await createTaskModel(body)
	res.json({ message: 'Task created', body })
}

const updateTask = async (req: Request, res: Response) => {
	const { body } = req
	const { id } = req.params

	await updateTaskModel(Number(id), body)
	res.json({ message: 'Task updated', body })
}

const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params

	await deleteTaskModel(Number(id))
	res.json({ message: `Task ${id} deleted` })
}

const deleteCompletedTasks = async (req: Request, res: Response) => {
	await deleteCompletedTasksModel()
	res.json({ message: 'Completed tasks deleted' })
}

export {
	getTasks,
	getTask,
	getTodayTasks,
	getUpcomingTasks,
	getCompletedTasks,
	createTask,
	updateTask,
	deleteTask,
	deleteCompletedTasks
}
