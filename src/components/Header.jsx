import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li><Link to="/exchanges" className="hover:text-blue-600">Exchanges</Link></li>
            <li><Link to="/information" className="hover:text-blue-600">Information</Link></li>
          </ul>
        </nav>
        <div className="space-x-4">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
        </div>
      </div>
    </header>
  );
}