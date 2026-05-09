import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to, message) {
  try {
    let phone = to.replace(/^\+/, '').replace(/^91/, '').trim();
    const fullPhone = '+91' + phone;

    console.log('Sending SMS to:', fullPhone);

    const result = await client.messages.create({
      body: message,
      messagingServiceSid: 'MG0c2e895b5d5557c2d33e5fb0f8793b52',
      to: fullPhone,
    });

    console.log('SMS sent! SID:', result.sid);
    return { success: true, sid: result.sid };

  } catch (error) {
    console.error('SMS Error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendWhatsApp(to, message) {
  try {
    let phone = to.replace(/^\+/, '').replace(/^91/, '').trim();
    const fullPhone = '+91' + phone;

    console.log('Sending WhatsApp to:', fullPhone);

    const result = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${fullPhone}`,
    });

    console.log('WhatsApp sent! SID:', result.sid);
    return { success: true, sid: result.sid };

  } catch (error) {
    console.error('WhatsApp Error:', error.message);
    return { success: false, error: error.message };
  }
}
export async function sendTelegram(to, message) {
  try {
    const chatId = to.trim();
    
    console.log('Sending Telegram to:', chatId);

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await response.json();
    console.log('Telegram Response:', data);

    if (data.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.description };
    }
  } catch (error) {
    console.error('Telegram Error:', error.message);
    return { success: false, error: error.message };
  }
}