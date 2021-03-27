const app = require('express')()
const http = require('http').Server(app)

const io = require('socket.io')(http)
const PORT = 3000

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
	socket.on('connection', (nickname) => {
		io.emit('connection', `${nickname} entrou no chat`)
	})

	socket.on('disconnect', () => {
		console.log('disconnected')
  })

	socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
})

http.listen(PORT, () => {
	console.info(`APP running in port ${PORT}`)
})
