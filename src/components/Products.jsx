import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <ProductGrid />
        <Pagination />
      </main>
    </div>
  )
}

