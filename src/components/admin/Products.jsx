'use client'

import { useState } from 'react'
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'
import Pagination from '../Pagination'
import { createProduct } from '../../services/product-service'
import * as Alert from '../Alert'
import { useMutation } from '@tanstack/react-query'

const mockProducts = [
  { 
    id: 1, 
    name: 'Product A', 
    image: 'link_to_image_1', 
    releaseDate: '2023-01-01', 
    price: 19.99, 
    video: 'link_to_video_1',
    story: 'Cốt truyện của sản phẩm A...' 
  },
  { 
    id: 2, 
    name: 'Product B', 
    image: 'link_to_image_2', 
    releaseDate: '2023-02-01', 
    price: 29.99, 
    video: 'link_to_video_2',
    story: 'Cốt truyện của sản phẩm B...' 
  },
  { 
    id: 3, 
    name: 'Product C', 
    image: 'link_to_image_3', 
    releaseDate: '2023-03-01', 
    price: 39.99, 
    video: 'link_to_video_3',
    story: 'Cốt truyện của sản phẩm C...' 
  },
  { 
    id: 4, 
    name: 'Product D', 
    image: 'link_to_image_4', 
    releaseDate: '2023-04-01', 
    price: 49.99, 
    video: 'link_to_video_4',
    story: 'Cốt truyện của sản phẩm D...' 
  },
  { 
    id: 5, 
    name: 'Product E', 
    image: 'link_to_image_5', 
    releaseDate: '2023-05-01', 
    price: 59.99, 
    video: 'link_to_video_5',
    story: 'Cốt truyện của sản phẩm E...' 
  },
  { 
    id: 6, 
    name: 'Product F', 
    image: 'link_to_image_6', 
    releaseDate: '2023-06-01', 
    price: 69.99, 
    video: 'link_to_video_6',
    story: 'Cốt truyện của sản phẩm F...' 
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Thay đổi từ 2 thành 6
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [date, setDate] = useState();
  const [price, setPrice] = useState();
  const [video, setVideo] = useState();
  const [story, setStory] = useState();

  const token = localStorage.getItem('access_token')

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    releaseDate: '',
    price: '',
    video: '',
    story: '',
  });

  const handleEdit = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  }

  const handleAddProduct = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    } else {
      console.log('Hình ảnh:',name, image, date, price, story, video);
      mutationCreateProduct.mutate({
        name: name,
        image: image,
        date: date,
        price: price,
        video: video,
        story: story
      })
    }
    //setIsEditing(false);
    //setIsModalOpen(false);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const mutationCreateProduct = useMutation({
    mutationFn: async (data) => {
      return await createProduct(data, token)
    },
    onSuccess: (data) => {
      Alert.success('Tạo sản phẩm thành công')
    },
    onError: (error) => {
      Alert.error(error.message)
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button 
          onClick={handleAddProduct} 
          className="flex items-center text-green-600 hover:text-green-900"
        >
          <FaPlus className="mr-1" /> Thêm sản phẩm mới
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên sản phẩm</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hình ảnh</label>
                <input 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ngày phát hành</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Giá</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(parseFloat(e.target.value))} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Video</label>
                <input 
                  type="file" 
                  onChange={(e) => setVideo(e.target.files[0])} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                  accept="video/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cốt truyện</label>
                <textarea 
                  value={story} 
                  onChange={(e) => setStory(e.target.value)} 
                  required 
                  className="border rounded w-full py-2 px-3" 
                  rows="4"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">
                  {isEditing ? 'Cập nhật' : 'Thêm'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal hiển thị thông tin sản phẩm */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full mb-4" />
            <p><strong>Ngày phát hành:</strong> {selectedProduct.releaseDate}</p>
            <p><strong>Giá:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <p><strong>Cốt truyện:</strong> {selectedProduct.story}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setSelectedProduct(null)} className="bg-gray-300 px-4 py-2 rounded">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.releaseDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleViewDetails(product)} className="text-green-600 hover:text-green-900 mr-2">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
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
          totalProducts={products.length} 
          productsPerPage={productsPerPage} 
        />
      </div>
    </div>
  )
}