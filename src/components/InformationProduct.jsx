import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg', launchDate: '2023-01-01', videoUrl: 'https://www.example.com/product1-video.mp4' },
    { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg', launchDate: '2023-02-15', videoUrl: 'https://www.example.com/product2-video.mp4' },
    { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg', launchDate: '2023-03-30', videoUrl: 'https://www.example.com/product3-video.mp4' },
    { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg', launchDate: '2023-04-10', videoUrl: 'https://www.example.com/product4-video.mp4' },
    { id: 5, name: 'Product 5', price: 59.99, image: '/placeholder.svg', launchDate: '2023-05-20', videoUrl: 'https://www.example.com/product5-video.mp4' },
    { id: 6, name: 'Product 6', price: 69.99, image: '/placeholder.svg', launchDate: '2023-06-05', videoUrl: 'https://www.example.com/product6-video.mp4' },
];

export default function ProductDetail() {
  const id = 1; 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-center mb-8 mt-8">
            <video 
              src={product.videoUrl} 
              controls 
              className="w-2/3 h-auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col md:flex-row p-6">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <img 
                src={product.image} 
                alt={product.name} 
                width={500} 
                height={500} 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
              <p className="text-gray-600 mb-2">Launch Date: {product.launchDate}</p>
              <p className="text-2xl font-semibold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
              <div className="mt-16">
                <Link 
                  to="/buy" // Dùng Link để điều hướng
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center block" // Thêm class text-center và block
                >
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}