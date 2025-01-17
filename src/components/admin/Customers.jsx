'use client'

import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Pagination from '../Pagination' // Đảm bảo bạn đã tạo file Pagination.jsx

const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', registeredDate: '2023-01-15', totalOrders: 5, image: 'link_to_image_1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', registeredDate: '2023-02-20', totalOrders: 3, image: 'link_to_image_2' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', registeredDate: '2023-03-10', totalOrders: 7, image: 'link_to_image_3' },
  // Thêm nhiều customer hơn nếu cần
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [setSelectedCustomer] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const customersPerPage = 2

  const handleEdit = (customer) => {
    setSelectedCustomer(customer)
    console.log('Edit customer:', customer)
  }

  const handleDelete = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId))
  }

  const handleViewTransactions = (customer) => {
    console.log('View transactions for customer:', customer)
  }

  // Tính toán index của customer trên trang hiện tại
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={customer.image} alt={customer.name} className="w-16 h-16 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.registeredDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(customer)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-900 mr-2">
                    <FaTrash />
                  </button>
                  <button onClick={() => handleViewTransactions(customer)} className="text-green-600 hover:text-green-900">
                    View Transactions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"> {/* Thêm margin-top cho khoảng cách */}
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalCustomers={customers.length} 
          customersPerPage={customersPerPage} 
        />
      </div>
    </div>
  )
}