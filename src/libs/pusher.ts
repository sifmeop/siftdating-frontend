import Pusher from 'pusher-js'
import { API_URL, PUSHER_CLUSTER, PUSHER_KEY } from '~/utils/env'

export const pusherClient = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  authEndpoint: API_URL + '/pusher/auth'
})
