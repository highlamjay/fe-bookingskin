import { Link } from "react-router-dom";

const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg' },
    { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg' },
    { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg' },
    { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg' },
    { id: 5, name: 'Product 5', price: 59.99, image: '/placeholder.svg' },
    { id: 6, name: 'Product 6', price: 69.99, image: '/placeholder.svg' },
  ];
  
  export default function ProductGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <Link to={`/products-id`} className="mt-4 block w-full bg-blue-600 text-white py-2 text-center rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Details
            </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }