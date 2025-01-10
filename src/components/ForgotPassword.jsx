import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const navigate = useNavigate();

  const handleSendCode = () => {
    // Gửi mã xác nhận đến email
    console.log('Sending code to:', email);
    
    // Bắt đầu đếm ngược
    let timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển đến trang nhập mật khẩu mới
    navigate('/confirm', { state: { email, confirmationCode } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSendCode}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Send Code
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Mã Xác Nhận"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={timeLeft === 0}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Time: {timeLeft} s</span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
            disabled={timeLeft === 0}
          >
            Confirm
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back To Login
          </Link>
        </div>
      </div>
    </div>
  );
}