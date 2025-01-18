import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/customers" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <span className="material-icons text-xl"></span>
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/productadmin" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <span className="material-icons text-xl"></span>
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/post" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <span className="material-icons text-xl"></span>
                <span>Posts</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/history" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <span className="material-icons text-xl"></span>
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/revenue" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <span className="material-icons text-xl"></span>
                <span>Revenue</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}