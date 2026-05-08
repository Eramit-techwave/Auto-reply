import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { senderPhone, targetPhone, platform, message, scheduledAt } = body;

    if (!senderPhone || !targetPhone || !platform || !message || !scheduledAt) {
      return NextResponse.json(
        { error: 'Sab fields required hain!' },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      senderPhone,
      targetPhone,
      platform,
      message,
      scheduledAt: new Date(scheduledAt),
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, message: 'Message schedule ho gaya!', data: newMessage },
      { status: 201 }
    );

  } catch (error) {
    console.error('EXACT ERROR:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}