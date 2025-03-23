'use client'
import ClientPusher from 'pusher-js';
import { env } from '~/env';


let clientPusher: ClientPusher | undefined;

export function getClientPusher() {  
  if (clientPusher) return clientPusher;
  clientPusher =  new ClientPusher(env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    channelAuthorization: {
      endpoint: '/api/pusher',
      transport: 'ajax'
    },
  });
  return clientPusher
}
