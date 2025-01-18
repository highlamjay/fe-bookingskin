'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaEye} from 'react-icons/fa'
import Pagination from '../Pagination'

const mockTransactions = [
  { id: 1, customerName: 'Nguyễn Văn A', productName: 'Sản phẩm 1', purchaseDate: '2023-06-15', price: 100 },
  { id: 2, customerName: 'Trần Thị B', productName: 'Sản phẩm 2', purchaseDate: '2023-06-20', price: 200 },
  { id: 3, customerName: 'Lê Văn C', productName: 'Sản phẩm 3', purchaseDate: '2023-06-25', price: 300 },
  { id: 4, customerName: 'Phạm Thị D', productName: 'Sản phẩm 4', purchaseDate: '2023-07-05', price: 400 },
  { id: 5, customerName: 'Nguyễn Văn E', productName: 'Sản phẩm 5', purchaseDate: '2023-07-10', price: 500 },
  { id: 6, customerName: 'Trần Thị F', productName: 'Sản phẩm 6', purchaseDate: '2023-07-15', price: 600 },
  { id: 7, customerName: 'Lê Văn G', productName: 'Sản phẩm 7', purchaseDate: '2023-08-01', price: 700 },
]

export default function HistoryBuy() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    customerName: '',
    productName: '',
    purchaseDate: '',
    price: '',
  });
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 6
  
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setNewTransaction(transaction);
    setIsEditModalOpen(true);
  }

  const handleDelete = (transactionId) => {
    setTransactions(transactions.filter(t => t.id !== transactionId))
  }

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  }



  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    setTransactions(transactions.map(t => t.id === selectedTransaction.id ? { ...newTransaction, price: parseFloat(newTransaction.price) } : t));
    setIsEditModalOpen(false);
    setNewTransaction({ customerName: '', productName: '', purchaseDate: '', price: '' });
  }

  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lịch sử giao dịch</h1>
      </div>

      

      {/* Modal sửa giao dịch */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Sửa giao dịch</h2>
            <form onSubmit={handleUpdateTransaction}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên khách hàng</label>
                <input 
                  type="text" 
                  value={newTransaction.customerName} 
                  onChange={(e) => setNewTransaction({ ...newTransaction, customerName: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tên sản phẩm</label>
                <input 
                  type="text" 
                  value={newTransaction.productName} 
                  onChange={(e) => setNewTransaction({ ...newTransaction, productName: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ngày mua</label>
                <input 
                  type="date" 
                  value={newTransaction.purchaseDate} 
                  onChange={(e) => setNewTransaction({ ...newTransaction, purchaseDate: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Giá</label>
                <input 
                  type="number" 
                  value={newTransaction.price} 
                  onChange={(e) => setNewTransaction({ ...newTransaction, price: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                  Lưu
                </button>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal hiển thị thông tin chi tiết giao dịch */}
      {isDetailModalOpen && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Chi tiết giao dịch</h2>
            <p><strong>Tên khách hàng:</strong> {selectedTransaction.customerName}</p>
            <p><strong>Tên sản phẩm:</strong> {selectedTransaction.productName}</p>
            <p><strong>Ngày mua:</strong> {selectedTransaction.purchaseDate}</p>
            <p><strong>Giá:</strong> {selectedTransaction.price} VNĐ</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsDetailModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày mua</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.purchaseDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.price} VNĐ</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleView(transaction)} className="text-gray-600 hover:text-gray-900 mr-2">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPosts={transactions.length} 
          postsPerPage={transactionsPerPage} 
        />
      </div>
    </div>
  )
}