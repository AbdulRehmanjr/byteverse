import { type NextRequest, NextResponse } from 'next/server'
import { serverPusher } from '~/lib/pusher'

export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const socket_id = formData.get('socket_id') as string;
    const channel_name = formData.get('channel_name') as string;
    
    
    const auth = serverPusher.authorizeChannel(socket_id, channel_name)

    return NextResponse.json(auth)
}