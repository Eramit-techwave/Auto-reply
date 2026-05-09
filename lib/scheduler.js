import cron from 'node-cron';
import connectDB from './mongodb.js';
import Message from '../models/Message.js';
import { sendSMS, sendWhatsApp, sendTelegram } from './twilio.js';

let isRunning = false;

export function startScheduler() {
  if (isRunning) return;
  isRunning = true;

  cron.schedule('* * * * *', async () => {
    try {
      await connectDB();

      const now = new Date();
      console.log('⏰ Checking at:', now);

      const pendingMessages = await Message.find({
        status: 'pending',
        scheduledAt: { $lte: now },
      });

      console.log(`📨 Pending messages found: ${pendingMessages.length}`);

      for (const msg of pendingMessages) {
        console.log(`📤 Sending to: ${msg.targetPhone}`);
        console.log(`📝 Message: ${msg.message}`);
        console.log(`🌐 Platform: ${msg.platform}`);

        let result;

        if (msg.platform === 'whatsapp') {
          result = await sendWhatsApp(msg.targetPhone, msg.message);
        } else if (msg.platform === 'telegram') {
          result = await sendTelegram(msg.targetPhone, msg.message);
        } else {
          result = await sendSMS(msg.targetPhone, msg.message);
        }

        console.log('📊 Result:', result);

        if (result.success) {
          await Message.findByIdAndUpdate(msg._id, { status: 'sent' });
          console.log(`✅ Message sent to ${msg.targetPhone}`);
        } else {
          await Message.findByIdAndUpdate(msg._id, { status: 'failed' });
          console.log(`❌ Failed: ${result.error}`);
        }
      }
    } catch (err) {
      console.error('❌ Scheduler error:', err.message);
    }
  });

  console.log('✅ Scheduler started!');
}
