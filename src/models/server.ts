import express from 'express'
import cors from 'cors'
import tasksRouter from '../routes/tasks'

class Server {
	private port: string
	private app = express()

	constructor(port: string) {
		this.port = port
		this.middleware()
		this.routes()
		this.listen()
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`)
		})
	}

	routes() {
		this.app.use('/tasks', tasksRouter)
	}

	middleware() {
		this.app.use(
			cors({
				origin: '*'
			})
		)
		this.app.use(express.json())
	}
}

export default Server
