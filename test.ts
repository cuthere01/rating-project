const a: number = 5; 

const data = {
	"userId": 1,
	"id": 1,
	"title": "delectus aut autem",
	"info": {
		"desc": "delectus aut autem",
		"isActive": true
	},
	"tags": [
		{
			"name": "my name",
			"value": 1000
		}
	]
}

interface info {
	desc: string,
	isActive: boolean
}

interface tags {
	name: string,
	value: number
}

interface extData {
	userId: number,
	id: number,
	title: string,
	info: {
		desc: string,
		isActive: boolean
	},
	tags: [
		name: string,
		value: number
	]
}

interface extDataSmort {
	userId: number,
	id: number,
	title: string,
	info: info,
	tags: tags[]
}