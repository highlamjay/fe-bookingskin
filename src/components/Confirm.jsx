'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {Link} from 'react-router-dom'

export default function ConfirmPage() {
  const [confirmationCode, setConfirmationCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(90)
  const searchParams = useSearchParams()

  // Kiểm tra xem searchParams có hợp lệ không
  const email = searchParams ? searchParams.get('email') : null
  const correctCode = searchParams ? searchParams.get('code') : null

  // Kiểm tra xem email hay mã xác thực có hợp lệ không
  const isValid = email && correctCode

  useEffect(() => {
    let timer;
    if (isValid) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isValid])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (confirmationCode === correctCode) {
      console.log('Confirmation successful')
      // Điều hướng đến trang login
      window.location.href = '/login'
    } else {
      alert('Invalid confirmation code. Please try again.')
    }
  }

  const handleResendCode = () => {
    // Logic để gửi lại mã xác nhận
    console.log('Resending confirmation code...')
    // Ví dụ: Gọi API để gửi mã mới
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Confirm Your Email</h2>
        <p className="text-center mb-4">
          We&apos;ve sent a confirmation code to {email}. Please enter it below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Confirmation Code"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Time remaining: {timeLeft} seconds</span>
            <button
              type="button"
              onClick={handleResendCode}
              className={`ml-4 text-blue-600 hover:underline`}
              disabled={timeLeft > 0}
            >
              Gửi lại code
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={timeLeft === 0}
          >
            Confirm <Link to="/login" className="underline"></Link>
          </button>
        </form>
        {timeLeft === 0 && (
          <p className="mt-4 text-sm text-center text-red-600">
            Time expired. Please <Link to="/register" className="underline">register again</Link>.
          </p>
        )}
      </div>
    </div>
  )
}