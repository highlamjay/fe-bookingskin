import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  // Giả lập trạng thái đăng nhập và thông tin người dùng
  const [isLoggedIn] = useState(false); // Đặt là true để mô phỏng
  const user = {
    name: 'John Doe',
    avatar: '/avatar-placeholder.png', // Thay thế bằng đường dẫn hình ảnh avatar thực tế
  };

  const pathname = window.location.pathname;

  return (
    <header className="bg-white bg-opacity-0 fixed w-full z-10">
      <div className="container flex justify-between items-center">
        <nav>
          <ul className="flex">
            <li>
              <Link
                to="/"
                className={`flex h-12 items-center justify-center ${pathname === '/' ? 'bg-gray-600 text-white' : 'text-gray-700'} hover:bg-gray-600 hover:text-white transition duration-200 px-4`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex h-12 items-center justify-center ${pathname === '/products' ? 'bg-gray-600 text-white' : 'text-gray-700'} hover:bg-gray-600 hover:text-white transition duration-200 px-4`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/exchanges"
                className={`flex h-12 items-center justify-center ${pathname === '/exchanges' ? 'bg-gray-600 text-white' : 'text-gray-700'} hover:bg-gray-600 hover:text-white transition duration-200 px-4`}
              >
                Exchanges
              </Link>
            </li>
            <li>
              <Link
                to="/information"
                className={`flex h-12 items-center justify-center ${pathname === '/information' ? 'bg-gray-600 text-white' : 'text-gray-700'} hover:bg-gray-600 hover:text-white transition duration-200 px-4`}
              >
                Information
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 transition-transform duration-200 ease-in-out transform hover:scale-110">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="rounded-full w-full h-full object-cover"
                  onClick={() => window.location.href = '/user-info'} // Điều hướng đến trang thông tin người dùng khi bấm vào avatar
                />
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}