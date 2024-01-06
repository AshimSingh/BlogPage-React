import { socket } from '../main'

const addComment = ({ author, comment, room }) => {
    const timestamp = new Date()
    console.log(author, 'here ash')
    socket.emit('Comment', author, comment, timestamp, room)
}

export default addComment
