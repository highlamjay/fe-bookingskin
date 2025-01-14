'use client'

import { useEffect, useRef } from 'react'

const mockRevenueData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 6200 },
  { month: 'Mar', revenue: 7800 },
  { month: 'Apr', revenue: 8500 },
  { month: 'May', revenue: 9200 },
  { month: 'Jun', revenue: 10000 },
  { month: 'Jul', revenue: 11500 },
  { month: 'Aug', revenue: 12800 },
  { month: 'Sep', revenue: 14000 },
  { month: 'Oct', revenue: 15200 },
  { month: 'Nov', revenue: 16500 },
  { month: 'Dec', revenue: 18000 },
]

export default function RevenuePage() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      const maxRevenue = Math.max(...mockRevenueData.map(data => data.revenue))

      // Xóa nội dung trước khi thêm mới
      containerRef.current.innerHTML = ''

      mockRevenueData.forEach((data) => {
        const barHeight = (data.revenue / maxRevenue) * 200 // Chiều cao tối đa cho cột
        
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