export interface Task {
	id: number
	title: string
	description?: string
	priority: 'low' | 'medium' | 'high'
	type: 'today' | 'upcoming'
	completed?: boolean
}
