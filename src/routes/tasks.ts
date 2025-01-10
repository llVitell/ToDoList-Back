import { Router } from 'express'
import {
	getTask,
	getTasks,
	getTodayTasks,
	getUpcomingTasks,
	getCompletedTasks,
	deleteTask,
	createTask,
	updateTask
} from '../controllers/tasks'

const tasksRouter = Router()

tasksRouter.get('/', getTasks)
tasksRouter.get('/today', getTodayTasks)
tasksRouter.get('/upcoming', getUpcomingTasks)
tasksRouter.get('/completed', getCompletedTasks)
tasksRouter.post('/', createTask)
tasksRouter.put('/:id', updateTask)
tasksRouter.get('/:id', getTask)
tasksRouter.delete('/:id', deleteTask)

export default tasksRouter
