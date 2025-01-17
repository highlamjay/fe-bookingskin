'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'
import Pagination from '../Pagination'

const mockPosts = [
  { id: 1, title: 'New Product Launch', date: '2023-06-15', content: 'We are excited to announce the launch of our new product, which will revolutionize the industry.', image: 'link_to_image_1' },
  { id: 2, title: 'Summer Sale Announcement', date: '2023-06-20', content: 'Don’t miss our upcoming summer sale! Everything will be discounted.', image: 'link_to_image_2' },
  { id: 3, title: 'Customer Success Story', date: '2023-06-25', content: 'Our customer achieved remarkable results using our product. Here’s how they did it.', image: 'link_to_image_3' },
  { id: 4, title: 'Tech Innovations 2023', date: '2023-07-05', content: 'Discover the latest innovations in technology for 2023.', image: 'link_to_image_4' },
  { id: 5, title: 'Health and Wellness Trends', date: '2023-07-10', content: 'Explore the top health and wellness trends of the year.', image: 'link_to_image_5' },
  { id: 6, title: 'Travel Destinations for 2023', date: '2023-07-15', content: 'The best travel destinations to visit this year.', image: 'link_to_image_6' },
  { id: 7, title: 'Sustainable Living Tips', date: '2023-08-01', content: 'Learn how to live a more sustainable lifestyle.', image: 'link_to_image_7' },
]

export default function PostsPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    date: '',
    content: '',
    image: '',
  });
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6 // Giới hạn số lượng bài post hiển thị là 6
  
  const handleEdit = (post) => {
    setSelectedPost(post);
    setNewPost(post); // Đặt thông tin bài post vào trạng thái mới
    setIsEditModalOpen(true); // Mở modal sửa
  }

  const handleDelete = (postId) => {
    setPosts(posts.filter(p => p.id !== postId))
  }

  const handleView = (post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  }

  const handleAddPost = () => {
    setNewPost({
      title: '',
      date: '',
      content: '',
      image: '',
    });
    setIsModalOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostWithId = { ...newPost, id: posts.length + 1 };
    setPosts([...posts, newPostWithId]);
    setNewPost({ title: '', date: '', content: '', image: '' });
    setIsModalOpen(false);
  }

  const handleUpdatePost = (e) => {
    e.preventDefault();
    setPosts(posts.map(post => post.id === selectedPost.id ? newPost : post));
    setIsEditModalOpen(false);
    setNewPost({ title: '', date: '', content: '', image: '' }); // Reset thông tin bài post
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Post Management</h1>
        <button 
          onClick={handleAddPost} 
          className="flex items-center text-green-600 hover:text-green-900"
        >
          <FaPlus className="mr-1" /> Thêm bài post mới
        </button>
      </div>

      {/* Modal thêm bài post */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm bài post mới</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tiêu đề bài post</label>
                <input 
                  type="text" 
                  value={newPost.title} 
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ngày</label>
                <input 
                  type="date" 
                  value={newPost.date} 
                  onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nội dung</label>
                <textarea 
                  value={newPost.content} 
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hình ảnh URL</label>
                <input 
                  type="text" 
                  value={newPost.image} 
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                  Thêm
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal sửa bài post */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Sửa bài post</h2>
            <form onSubmit={handleUpdatePost}>
              <div className="mb-4">
                <label className="block text-gray-700">Tiêu đề bài post</label>
                <input 
                  type="text" 
                  value={newPost.title} 
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ngày</label>
                <input 
                  type="date" 
                  value={newPost.date} 
                  onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nội dung</label>
                <textarea 
                  value={newPost.content} 
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hình ảnh URL</label>
                <input 
                  type="text" 
                  value={newPost.image} 
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} 
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

      {/* Modal hiển thị thông tin chi tiết bài post */}
      {isDetailModalOpen && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full mb-4" />
            <p><strong>Ngày:</strong> {selectedPost.date}</p>
            <p><strong>Nội dung:</strong> {selectedPost.content}</p>
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
      <div className="mt-4">
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