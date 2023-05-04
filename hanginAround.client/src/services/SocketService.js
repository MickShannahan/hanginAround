import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super(true)
    this.name = 'Bobby' + Math.random()
    logger.error('🤖', this.name)
    this
      .on('error', this.onError)
      .on('CONNECTED:ROOM', this.connectedRoom)
      .on('INSTRUCTOR:JOINED:ROOM', this.instructorJoinedRoom)
      .on('LEFT:ROOM', this.leftRoom)
  }

  // OUTGOING
  joinRoom(roomName) {
    this.emit('JOIN:ROOM', { roomName })
  }
  leaveRoom(roomName) {
    this.emit('LEAVE:ROOM', { roomName })
  }
  // INCOMING
  connectedRoom(payload) {
    logger.log('⚡[CONNECTED TO ROOM]', payload)
    AppState.helpInstructors = payload.users.filter(u => u.role == 'instructor')
    AppState.students = payload.users.filter(u.role != 'instructor')
  }
  instructorJoinedRoom(payload) {
    logger.log('⚡[INSTRUCTOR JOINED ROOM]', payload)
    if (payload.user.id != AppState.user.id) {
      AppState.helpInstructors.push(payload.user)
    }
  }

  leftRoom(payload) {
    logger.log('⚡[SOMEONE LEFT]')
    let index = AppState.helpInstructors.find(u => u.id == payload.id)
    AppState.helpInstructors.splice(index, 1)
  }

  onError(e) {
    logger.error(e)
    Pop.toast('⚡ ' + e.message, 'error')
  }
}
const sockey = new SocketService()
export const socketService = sockey
