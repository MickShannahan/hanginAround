import { socketProvider } from '../SocketProvider.js'
import { logger } from '../utils/Logger.js'
import { SocketHandler } from '../utils/SocketHandler'

const rooms = {}
function _setUpRoom(roomName) {
  if (!rooms[roomName]) rooms[roomName] = []
}
export class TestHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    this
      .on('JOIN:ROOM', this.joinRoom)
      .on('LEAVE:ROOM', this.leaveRoom)
      .on('disconnect', this.disconnect)
  }

  async joinRoom(payload) {
    _setUpRoom(payload.roomName)
    rooms[payload.roomName].push({ socket: this.socket.id, ...this.profile })
    this.socket.join(payload.roomName)

    let socketUsers = rooms[payload.roomName]
    let seeStudents = this.user.permissions.includes('read:students')
    let filteredUsers = socketUsers.filter(u => u.role == 'instructor' || seeStudents)
    logger.log(socketUsers)
    socketProvider.messageUser(this.user.id, 'CONNECTED:ROOM', { roomName: payload.roomName, users: filteredUsers })
    if (this.user.permissions.includes('tutor:student')) {
      socketProvider.messageRoom(payload.roomName, 'INSTRUCTOR:JOINED:ROOM', { user: this.profile })
    }
  }

  async leaveRoom(payload) {
    const room = rooms[payload.roomName]
    this.socket.leave(payload.roomName)
    if (!room) return
    let index = room.findIndex(u => u.id == this.user.id)
    room.splice(index, 1)
    socketProvider.messageRoom(payload.roomName, 'LEFT:ROOM', this.profile)
  }

  async disconnect() {
    logger.log('disconnected', this.user)
    for (let name in rooms) {
      let room = rooms[name]
      let index = room.findIndex(u => u.id == this.user.id)
      if (index >= 0) {
        room.splice(index, 1)
        socketProvider.messageRoom(name, 'LEFT:ROOM', this.profile)
      }
    }
  }
}

