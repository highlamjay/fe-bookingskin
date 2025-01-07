import { Link } from 'react-router-dom'; // Sử dụng Link từ react-router-dom

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-16">
            <li><Link to="/" className="hover:text-blue-600">Trang chủ</Link></li>
            <li><Link to="/products" className="hover:text-blue-600">Trang phục</Link></li>
            <li><Link to="/exchanges" className="hover:text-blue-600">Trao đổi</Link></li>
            <li><Link to="/information" className="hover:text-blue-600">Thông tin</Link></li>
          </ul>
        </nav>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">Đăng Nhập</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Đăng ký</Link>
        </div>
      </div>
    </header>
  );
}