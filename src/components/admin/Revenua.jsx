'use client'

import { useEffect, useRef } from 'react'

// Dữ liệu doanh thu
const mockRevenueData = [
  { month: 'January', revenue: 5000 },
  { month: 'February', revenue: 6200 },
  { month: 'March', revenue: 7800 },
  { month: 'April', revenue: 8500 },
  { month: 'May', revenue: 9200 },
  { month: 'June', revenue: 10000 },
  { month: 'July', revenue: 11500 },
  { month: 'August', revenue: 12800 },
  { month: 'September', revenue: 14000 },
  { month: 'October', revenue: 15200 },
  { month: 'November', revenue: 16500 },
  { month: 'December', revenue: 18000 },
]

export default function RevenuePage() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      // Xóa nội dung cũ
      containerRef.current.innerHTML = ''

      const maxRevenue = Math.max(...mockRevenueData.map(data => data.revenue))

      mockRevenueData.forEach((data) => {
        const barHeight = (data.revenue / maxRevenue) * 200 // Chiều cao cột
        
        // Tạo div cho cột
        const bar = document.createElement('div')
        bar.style.height = `${barHeight}px`
        bar.className = 'bg-teal-500 w-12 mx-1' // Sử dụng Tailwind CSS

        // Tạo div cho nhãn tháng
        const label = document.createElement('div')
        label.innerText = data.month
        label.className = 'text-center' // Sử dụng Tailwind CSS

        // Tạo container cho mỗi cột và nhãn
        const barContainer = document.createElement('div')
        barContainer.className = 'flex flex-col items-center' // Sử dụng Tailwind CSS
        barContainer.appendChild(bar)
        barContainer.appendChild(label)
        
        // Thêm vào container chính
        containerRef.current.appendChild(barContainer)
      })
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Monthly Revenue</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div ref={containerRef} className="flex justify-around items-end h-56"></div>
      </div>
    </div>
  )
}