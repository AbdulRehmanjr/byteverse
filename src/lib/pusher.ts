import Pusher from 'pusher';
import { env } from '~/env';

export const serverPusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
});

export function triggerMessage(channelId: string, event: string, data: unknown) {
  return serverPusher.trigger(channelId, event, data);
}