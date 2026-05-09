'use client';
import { useState } from 'react';

const platforms = [
  { id: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500', emoji: '💬' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500', emoji: '📸' },
  { id: 'snapchat', name: 'Snapchat', color: 'bg-yellow-400', emoji: '👻' },
  { id: 'telegram', name: 'Telegram', color: 'bg-blue-500', emoji: '✈️' },
  { id: 'sms', name: 'SMS', color: 'bg-gray-500', emoji: '📱' },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [senderPhone, setSenderPhone] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleStep1 = () => {
    if (!senderPhone || !targetPhone) {
      setError('Please Enter Both phone numbers!');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleStep2 = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time!');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleStep3 = (platformId) => {
    setSelectedPlatform(platformId);
    setStep(4);
  };

  const handleSubmit = async () => {
    if (!message) {
      setError('Please enter a message!');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`);

      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderPhone,
          targetPhone,
          platform: selectedPlatform,
          message,
          scheduledAt,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setStep(5);
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Failed to connect to the server!');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSenderPhone('');
    setTargetPhone('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedPlatform('');
    setMessage('');
    setSuccess(false);
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">⏰ Auto-Reply</h1>
          <p className="text-white/60">Schedule your messages</p>
          {/* Progress */}
          <div className="flex justify-center gap-2 mt-4">
            {[1,2,3,4].map(s => (
              <div key={s} className={`h-2 w-8 rounded-full transition-all ${step >= s ? 'bg-purple-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* STEP 1: Phone Numbers */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold mb-4">📱 Phone Numbers</h2>
            <div>
              <label className="text-white/70 text-sm mb-1 block">Tumhara Phone Number</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-1 block">Friend Ka Phone Number (Target)</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
              />
            </div>
            <button
              onClick={handleStep1}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Aage Baro →
            </button>
          </div>
        )}

        {/* STEP 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold mb-4">📅 Date & Time</h2>
            <div>
              <label className="text-white/70 text-sm mb-1 block">Date Select Karo</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm mb-1 block">Time Select Karo</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all"
              >
                ← Wapas
              </button>
              <button
                onClick={handleStep2}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Aage Baro →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Platform */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold mb-4">🌐 Platform Select Karo</h2>
            <div className="grid grid-cols-1 gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleStep3(p.id)}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 text-white transition-all hover:border-purple-400"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="font-semibold">{p.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all"
            >
              ← Wapas
            </button>
          </div>
        )}

        {/* STEP 4: Message */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-white text-xl font-semibold mb-4">✍️ Message Likho</h2>
            <div className="bg-white/5 rounded-lg p-3 text-white/60 text-sm space-y-1">
              <p>📱 To: {targetPhone}</p>
              <p>📅 {selectedDate} at {selectedTime}</p>
              <p>🌐 {selectedPlatform}</p>
            </div>
            <textarea
              placeholder="Apna message yahan likho... (eg: Sita Ram 🙏)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition-all"
              >
                ← Wapas
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? '⏳ Bhej raha...' : '🚀 Schedule Karo!'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success */}
        {step === 5 && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-white text-2xl font-bold">Schedule Ho Gaya!</h2>
            <p className="text-white/60">
              Tumhara message <span className="text-purple-400 font-semibold">{targetPhone}</span> ko{' '}
              <span className="text-purple-400 font-semibold">{selectedDate} at {selectedTime}</span> pe bheja jayega!
            </p>
            <button
              onClick={resetForm}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              + Naya Message Schedule Karo
            </button>
          </div>
        )}

      </div>
    </main>
  );
}