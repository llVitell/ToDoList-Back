import { Router } from 'express'
import {
	getTask,
	getTasks,
	getTodayTasks,
	getUpcomingTasks,
	deleteTask,
	createTask
} from '../controllers/tasks'

const tasksRouter = Router()

tasksRouter.get('/', getTasks)
tasksRouter.get('/today', getTodayTasks)
tasksRouter.get('/upcoming', getUpcomingTasks)
tasksRouter.post('/', createTask)
tasksRouter.get('/:id', getTask)
tasksRouter.delete('/:id', deleteTask)

export default tasksRouter
