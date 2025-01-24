import Header from './Header'
import ProductGrid from './ProductGrid'
import SearchBar from './SearchBar'
import Pagination from './Pagination'

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

