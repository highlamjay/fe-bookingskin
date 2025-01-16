'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import Pagination from '../Pagination' // Đảm bảo bạn đã tạo file Pagination.jsx

const mockPosts = [
  { id: 1, title: 'New Product Launch', date: '2023-06-15', content: 'We are excited to announce the launch of our new product, which will revolutionize the industry.', image: 'link_to_image_1' },
  { id: 2, title: 'Summer Sale Announcement', date: '2023-06-20', content: 'Don’t miss our upcoming summer sale! Everything will be discounted.', image: 'link_to_image_2' },
  { id: 3, title: 'Customer Success Story', date: '2023-06-25', content: 'Our customer achieved remarkable results using our product. Here’s how they did it.', image: 'link_to_image_3' },
  // Thêm nhiều bài post hơn nếu cần
]

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 2

  const handleEdit = (post) => {
    setSelectedPost(post)
    console.log('Edit post:', post)
  }

  const handleDelete = (postId) => {
    setPosts(posts.filter(p => p.id !== postId))
  }

  const handleView = (post) => {
    console.log('View post:', post)
  }

  // Tính toán index của bài post trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Post Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={post.image} alt={post.title} className="w-16 h-16 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleView(post)} className="text-gray-600 hover:text-gray-900 mr-2">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
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
          totalPosts={posts.length} 
          postsPerPage={postsPerPage} 
        />
      </div>
    </div>
  )
}