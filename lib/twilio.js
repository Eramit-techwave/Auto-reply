import axios from 'axios';

export async function sendSMS(to, message) {
  try {
    let phone = to.replace(/^\+/, '').replace(/^91/, '').trim();
    const fullPhone = '+91' + phone;
    
    console.log('Sending to phone:', fullPhone);

    const response = await axios.post(
      'https://textbelt.com/text',
      {
        phone: fullPhone,
        message: message,
        key: 'textbelt',
      }
    );

    console.log('SMS Response:', response.data);

    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    console.error('SMS Error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendWhatsApp(to, message) {
  return sendSMS(to, message);
}