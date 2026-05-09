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
  return sendSMS(to, message);
}