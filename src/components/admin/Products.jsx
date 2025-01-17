'use client'

import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Pagination from '../Pagination' // Đảm bảo bạn đã tạo file Pagination.jsx

const mockProducts = [
  { id: 1, name: 'Product A', price: 19.99, stock: 100, category: 'Electronics', image: 'link_to_image_1' },
  { id: 2, name: 'Product B', price: 29.99, stock: 50, category: 'Clothing', image: 'link_to_image_2' },
  { id: 3, name: 'Product C', price: 39.99, stock: 75, category: 'Home & Garden', image: 'link_to_image_3' },
  // Thêm nhiều sản phẩm hơn nếu cần
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 2

  const handleEdit = (product) => {
    setSelectedProduct(product)
    console.log('Edit product:', product)
  }

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  // Tính toán index của sản phẩm trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"> {/* Thêm khoảng cách phía trên cho pagination */}
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalProducts={products.length} 
          productsPerPage={productsPerPage} 
        />
      </div>
    </div>
  )
}