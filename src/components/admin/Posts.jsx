'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const mockPosts = [
  { id: 1, title: 'New Product Launch', author: 'John Doe', date: '2023-06-15', status: 'Published' },
  { id: 2, title: 'Summer Sale Announcement', author: 'Jane Smith', date: '2023-06-20', status: 'Draft' },
  { id: 3, title: 'Customer Success Story', author: 'Bob Johnson', date: '2023-06-25', status: 'Published' },
]

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [setSelectedPost] = useState(null)

  const handleEdit = (post) => {
    setSelectedPost(post)
    // In a real app, you'd open a modal or navigate to an edit page
    console.log('Edit post:', post)
  }

  const handleDelete = (postId) => {
    // In a real app, you'd call an API to delete the post
    setPosts(posts.filter(p => p.id !== postId))
  }

  const handleView = (post) => {
    // In a real app, you'd navigate to the public post page
    console.log('View post:', post)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Post Management</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleView(post)}
                    className="text-gray-600 hover:text-gray-900 mr-2"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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

