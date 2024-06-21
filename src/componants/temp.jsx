const socket = io("http://123.55", {
    transports: ['websocket', 'polling'],
    withCredentials: true
})

socket.on('message', (msg) => {
    setMesage(prev => [...prev, meg])
})
socket.on('connect_error', (err) => {
    console.log(error);
})

return () => {
    socket.off('message')
}

socket.emit('join room', room)
