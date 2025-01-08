import { Request, Response } from 'express'
import {
	getTasksModel,
	getTaskModel,
	getTodayTasksModel,
	deleteTaskModel,
	createTaskModel
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
	const tasks = await getTodayTasksModel()
	res.json(tasks)
}

const getUpcomingTasks = (req: Request, res: Response) => {
	res.json({ message: 'Upcoming tasks completed' })
}

const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params
	await deleteTaskModel(Number(id))
	res.json({ message: `Task ${id} deleted` })
}

const createTask = async (req: Request, res: Response) => {
	const { body } = req

	await createTaskModel(body)
	res.json({ message: 'Task created', body })
}

export {
	getTasks,
	getTask,
	getTodayTasks,
	getUpcomingTasks,
	deleteTask,
	createTask
}
