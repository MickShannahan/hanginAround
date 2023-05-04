import { HMSReactiveStore, selectIsLocalVideoEnabled, selectPeers, selectRoom, selectScreenShareByPeerID } from "@100mslive/hms-video-store";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { computed, reactive } from "vue";
import Pop from "../utils/Pop.js";
import { api } from "./AxiosService.js";

export const HMS = new HMSReactiveStore();
HMS.triggerOnSubscribe()

export const hmsActions = HMS.getActions()
export const hmsStore = HMS.getStore()
export const hmsNotifications = HMS.getNotifications()


hmsNotifications.onNotification((note) => {
  logger.log('✨[NOTIFICATION]', note)
})


class HMSService {
  constructor() {
    this.trackId = ''
    hmsStore.subscribe((data) => {
      logger.log('🦧 update peers')
      AppState.peers = data
    }, selectPeers)
  }


  async getRooms() {
    try {
      const res = await api.get('api/rooms')
      logger.log('🦧[ROOMS]', res.data)
      AppState.rooms = res.data.data
    } catch (error) {
      Pop.error(error)
    }
  }

  async getOneRoom(roomId) {
    try {
      const res = await api.get(`api/rooms/${roomId}`)
      logger.log('🦧[ONE ROOM]', res.data)
      AppState.activeRoom = res.data
    } catch (error) {
      Pop.error(error)
    }
  }

  async getTokenForRoomAndRole(roomId, role) {
    const res = await api.get(`api/rooms/${roomId}/auth`)
    logger.log('🦧[HMS TOKEN]', res.data)
    return res.data.token
  }

  async joinRoom(roomId, user, options = { isAudioMuted: true, isVideoMuted: true }) {
    try {
      AppState.peers = []
      logger.log(user.name, 'joining video call')
      const authToken = await this.getTokenForRoomAndRole(roomId, 'instructor')
      await hmsActions.join({
        userName: user.name,
        authToken, settings: {
          ...options
        },
        metaData: { ...user },
        rememberDeviceSelection: true,
        alwaysRequestPermissions: true
      })
      this.getPeers()
    } catch (error) {
      logger.error(error)
    }
  }

  async leaveRoom() {
    if (hmsStore.getState(selectRoom)) {
      await hmsActions.leave()
    }
  }

  async getPeers() {
    try {
      const peers = hmsStore.getState(selectPeers)
      AppState.peers = peers
    } catch (error) {
      logger.error(error)
    }
  }

  async loadStream(trackId, videoElm) {
    try {
      logger.log(trackId, videoElm)
      logger.log(trackId, videoElm)
      if (this.trackId) await hmsActions.detachVideo(this.trackId, videoElm)
      await hmsActions.attachVideo(trackId, videoElm)
      this.trackId = trackId
    } catch (error) {
      logger.error(error)
    }
  }

  async screenShare(peerId, elm) {
    try {
      await hmsActions.setScreenShareEnabled(true)
      const shareVideoTrack = hmsStore.getState(selectScreenShareByPeerID(peerId))
      logger.log('🦧', shareVideoTrack)
      this.loadStream(shareVideoTrack.id, elm)
    } catch (error) {
      logger.error(error)
    }
  }

  async kick(peerId, reason = "You've been given the boot🥾") {
    try {
      await hmsActions.removePeer(peerId, reason)
      let index = AppState.peers.findIndex(p => p.id == peerId)
      AppState.peers.splice(index, 1)
    } catch (error) {
      logger.error(error)
    }
  }

  async toggleVideo() {
    let camOn = hmsStore.getState(selectIsLocalVideoEnabled)
    await hmsActions.setLocalVideoEnabled(!camOn)
  }
}


export const hms = new HMSService()
