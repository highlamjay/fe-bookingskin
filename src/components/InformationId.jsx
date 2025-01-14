'use client'

import { useEffect, useState } from 'react';
import Header from './Header';

const articles = [
  {
    id: 1,
    title: 'Revolutionary Smartwatch X1',
    content: `
      <p>The Smartwatch X1 is set to redefine wearable technology. With its cutting-edge features and sleek design, it's not just a timepiece, but a personal assistant on your wrist.</p>
      <p>Key features include:</p>
      <ul>
        <li>Advanced health monitoring with ECG and blood oxygen level tracking</li>
        <li>5G connectivity for seamless communication</li>
        <li>7-day battery life with fast charging capabilities</li>
        <li>Customizable AI assistant for personalized user experience</li>
      </ul>
      <p>The Smartwatch X1 is scheduled for release in Q4 2023, promising to be a game-changer in the smartwatch market.</p>
    `,
    image: '/placeholder.svg',
    date: '2023-07-01',
  },
  // Các sản phẩm khác...
];

export default function ArticlePage() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.id === 1); // Luôn lấy sản phẩm đầu tiên
    setArticle(foundArticle);
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8 mt-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-sm text-gray-500 mb-4">Published on: {article.date}</p>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}