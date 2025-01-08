import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-purple-500 text-xl" />
        </button>
      </div>
    </div>
  );
}