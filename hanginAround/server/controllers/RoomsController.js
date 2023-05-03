import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { hmsService } from "../services/HmsService.js";




export class RoomsController extends BaseController {
  constructor() {
    super('api/rooms')
    this.router
      .get('', this.getRooms)
      .get('/:roomId', this.getOneRoom)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:roomId/auth', this.getTokenForRole)
  }


  async getTokenForRole(req, res, next) {
    try {
      const token = await hmsService.getTokenForRoom(req.params.roomId, 'instructor', req.userInfo)
      return res.send(token)
    } catch (error) {
      next(error)
    }
  }

  async getRooms(req, res, next) {
    try {
      const rooms = await hmsService.getRooms()
      return res.send(rooms)
    } catch (error) {
      next(error)
    }
  }

  async getOneRoom(req, res, next) {
    try {
      const room = await hmsService.getOneRoom(req.params.roomId)
      return res.send(room)
    } catch (error) {
      next(error)
    }
  }
}
