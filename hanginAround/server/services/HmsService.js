import * as HMS from "@100mslive/server-sdk";



const hms = new HMS.SDK(process.env.HMS_ACCESS_KEY, process.env.HMS_SECRET)

class HMSService {
  async getTokenForRoom(roomId, role, user) {
    const tokenConfig = {
      roomId,
      role,
      userId: user.id
    }
    const token = await hms.auth.getAuthToken(tokenConfig)
    return token
  }

  async getRooms(query = {}) {
    const rooms = await hms.api.get('rooms')
    return rooms
  }

  async getOneRoom(roomId) {
    const room = await hms.api.get('rooms/' + roomId)
    return room
  }
}

export const hmsService = new HMSService();
