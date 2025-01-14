'use client'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const articles = [
  {
    id: 1,
    title: 'Revolutionary Smartwatch X1',
    excerpt: 'Discover the future of wearable technology with our upcoming Smartwatch X1.',
    image: '/placeholder.svg',
    date: '2023-07-01',
  },
  {
    id: 2,
    title: 'Ultra-Slim Laptop Pro',
    excerpt: 'Experience unparalleled performance in our thinnest laptop ever.',
    image: '/placeholder.svg',
    date: '2023-07-15',
  },
  {
    id: 3,
    title: 'AI-Powered Home Assistant',
    excerpt: 'Meet your new smart home companion, powered by advanced artificial intelligence.',
    image: '/placeholder.svg',
    date: '2023-08-01',
  },
  // Add more articles as needed
];

export default function InformationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8 mt-8">
        <h1 className="text-3xl font-bold mb-8">Latest Product Information</h1>
        <div className="grid gap-8 mb-8">
          {currentArticles.map((article) => (
            <Link to="/information-id" key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300">
              <div className="md:w-1/3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <p className="text-sm text-gray-500">Published on: {article.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}