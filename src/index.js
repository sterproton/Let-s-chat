$(() => {
    const socket = new WebSocket('wss://localhost:443')
    $('form').submit(() => {
        socket.send($('#m').val())
        // socket.emit('chat message', $('#m').val())
        $('#m').val('')
        return false
    })
    socket.onmessage = (e) => {
        $('#messages').append($('<li>').text(e.data))
    }
})
