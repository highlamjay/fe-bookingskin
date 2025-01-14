'use client'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'; // Thêm thư viện icon

// Mock user data
const user = {
  name: 'John Doe',
  username: 'johndoe123',
  email: 'john.doe@example.com',
  avatar: '/avatar-placeholder.png',
  balance: 1000,
  transactions: [
    { id: 1, date: '2023-06-01', description: 'Purchase', amount: -50, details: 'Product A - Quantity: 1' },
    { id: 2, date: '2023-06-05', description: 'Deposit', amount: 200, details: 'Bank transfer' },
    { id: 3, date: '2023-06-10', description: 'Purchase', amount: -30, details: 'Product B - Quantity: 2' },
  ]
}

export default function UserInfoPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState(user.avatar);

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result);
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">
            <Link to='/'>Home</Link>
        </h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 bg-gray-50 relative">
              <div className="text-center">
                <img
                  src={newAvatar}
                  alt={`${user.name}'s avatar`}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <button 
                  onClick={() => setShowAvatarModal(true)} 
                  className="absolute top-21 left-80 bg-blue-500 text-white rounded-full p-1" // Di chuyển gần hơn
                >
                  <FaEdit />
                </button>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Current Balance</p>
                <p className="text-2xl font-bold">${user.balance.toFixed(2)}</p>
              </div>
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Deposit
                </button>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Change Password
                </button>
              </div>
              <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Date</th>
                      <th className="py-2">Description</th>
                      <th className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b cursor-pointer hover:bg-gray-50" onClick={() => openTransactionModal(transaction)}>
                        <td className="py-2">{transaction.date}</td>
                        <td className="py-2">{transaction.description}</td>
                        <td className={`py-2 ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Đăng xuất */}
      <div className="flex justify-center p-4">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => alert('Logged out')}
        >
          Log Out
        </button>
      </div>
      {/* Modal để thay đổi avatar */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Change Avatar</h2>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <button
              onClick={() => setShowAvatarModal(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Các modal khác */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Deposit</h2>
            <p>Deposit functionality would go here.</p>
            <button
              onClick={() => setShowDepositModal(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <p>Change password functionality would go here.</p>
            <button
              onClick={() => setShowChangePasswordModal(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
            <div className="space-y-2">
              <p><strong>Date:</strong> {selectedTransaction.date}</p>
              <p><strong>Description:</strong> {selectedTransaction.description}</p>
              <p><strong>Amount:</strong> <span className={selectedTransaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${Math.abs(selectedTransaction.amount).toFixed(2)}
              </span></p>
              <p><strong>Details:</strong> {selectedTransaction.details}</p>
            </div>
            <button
              onClick={() => setSelectedTransaction(null)}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}