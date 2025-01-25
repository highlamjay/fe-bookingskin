import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white bg-opacity-0 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-700 hover:text-2xl transition-all duration-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-700 hover:text-2xl transition-all duration-300">Products</Link></li>
            <li><Link to="/community" className="hover:text-blue-700 hover:text-2xl transition-all duration-300">Community</Link></li>
            <li><Link to="/information" className="hover:text-blue-700 hover:text-2xl transition-all duration-300">Information</Link></li>
          </ul>
        </nav>
        <div className="space-x-4">
          <Link to="/login" className="text-black hover:text-blue-700">Login</Link>
          <Link to="/register" className="bg-white text-black px-4 py-2 rounded hover:bg-blue-700">Register</Link>
        </div>
      </div>
    </header>
  );
}