import { useEffect, useState } from 'react';
import Header from './Header';

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg', launchDate: '2023-01-01' },
  { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg', launchDate: '2023-02-15' },
  { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg', launchDate: '2023-03-30' },
  { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg', launchDate: '2023-04-10' },
  { id: 5, name: 'Product 5', price: 59.99, image: '/placeholder.svg', launchDate: '2023-05-20' },
  { id: 6, name: 'Product 6', price: 69.99, image: '/placeholder.svg', launchDate: '2023-06-05' },
];

export default function Buy() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === 1); // Luôn lấy sản phẩm 1
    setProduct(foundProduct);
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Purchase Confirmation</h1>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <img
                src="/qr-placeholder.png"
                alt="QR Code"
                width={300}
                height={300}
                className="mx-auto"
              />
              <p className="text-center mt-4 text-gray-600">Scan this QR code to complete your purchase</p>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Name:</strong> {product.name}</p>
                <p className="mb-2"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p className="mb-2"><strong>Launch Date:</strong> {product.launchDate}</p>
              </div>
              <img 
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="mt-4 mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}