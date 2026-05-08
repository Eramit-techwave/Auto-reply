import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  senderPhone: {
    type: String,
    required: true,
  },
  targetPhone: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['whatsapp', 'instagram', 'snapchat', 'telegram', 'sms'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.models.Message || 
mongoose.model('Message', MessageSchema);

export default Message;