'use client'

import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const mockProducts = [
  { id: 1, name: 'Product A', price: 19.99, stock: 100, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 29.99, stock: 50, category: 'Clothing' },
  { id: 3, name: 'Product C', price: 39.99, stock: 75, category: 'Home & Garden' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [setSelectedProduct] = useState(null)

  const handleEdit = (product) => {
    setSelectedProduct(product)
    // In a real app, you'd open a modal or navigate to an edit page
    console.log('Edit product:', product)
  }

  const handleDelete = (productId) => {
    // In a real app, you'd call an API to delete the product
    setProducts(products.filter(p => p.id !== productId))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

