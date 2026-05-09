import axios from 'axios';

export async function sendSMS(to, message) {
  try {
    let phone = to.replace(/^\+91/, '').replace(/^91/, '').trim();
    const fullPhone = '91' + phone;

    console.log('Sending SMS to:', fullPhone);

    const response = await axios.post(
      'https://control.msg91.com/api/v5/flow/',
      {
        template_id: '',
        short_url: '0',
        mobiles: fullPhone,
        message: message,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('MSG91 Response:', response.data);
    return { success: true };

  } catch (error) {
    console.error('SMS Error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

export async function sendWhatsApp(to, message) {
  return sendSMS(to, message);
}
