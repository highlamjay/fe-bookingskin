'use client'

import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock user data
const user = {
  name: 'John Doe',
  username: 'johndoe123',
  email: 'john.doe@example.com',
  avatar: '/avatar-placeholder.png',
  balance: 1000,
  transactions: [
    { id: 1, date: '2023-06-01', description: 'Purchase', amount: -50 },
    { id: 2, date: '2023-06-05', description: 'Deposit', amount: 200 },
    { id: 3, date: '2023-06-10', description: 'Purchase', amount: -30 },
  ]
}

export default function UserInfoPage() {
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

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
            <div className="md:w-1/3 p-8 bg-gray-50">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
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
                      <tr key={transaction.id} className="border-b">
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
      {/* Deposit Modal */}
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
      {/* Change Password Modal */}
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
    </div>
  )
}