import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  TrendingUp, 
  Monitor, 
  Shirt, 
  Home as HomeIcon, 
  Dumbbell,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Star,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES, POPULAR_SEARCHES } from './constants';
import { Product, ViewState } from './types';
import PriceChart from './components/PriceChart';
import AIAssistant from './components/AIAssistant';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // --- Logic ---
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setView('SEARCH');
      setSelectedProductId(null);
    }
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setView('PRODUCT_DETAIL');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView('HOME');
    setSearchQuery('');
    setSelectedProductId(null);
    setActiveCategory('All');
  };

  const filteredProducts = useMemo(() => {
    let prods = MOCK_PRODUCTS;
    if (view === 'SEARCH' && searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      prods = prods.filter(p => 
        p.title.toLowerCase().includes(lowerQ) || 
        p.category.toLowerCase().includes(lowerQ) ||
        p.brand.toLowerCase().includes(lowerQ)
      );
    } else if (activeCategory !== 'All') {
      prods = prods.filter(p => p.category === activeCategory);
    }
    return prods;
  }, [view, searchQuery, activeCategory]);

  const selectedProduct = useMemo(() => 
    MOCK_PRODUCTS.find(p => p.id === selectedProductId), 
  [selectedProductId]);

  // --- Components ---

  const Header = () => (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div 
              onClick={goHome} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <TrendingUp size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                PricePulse
              </span>
            </div>
            
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              {['Deals', 'Categories', 'Brands', 'About'].map(item => (
                <a key={item} href="#" className="hover:text-indigo-600 transition-colors">{item}</a>
              ))}
            </nav>
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-full focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm"
              />
              <Search className="absolute left-3.5 top-2.5 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500" />
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full md:hidden">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full md:hidden">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-3">
               <button className="text-sm font-medium text-slate-600 hover:text-indigo-600">Log In</button>
               <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const ProductGrid = ({ title, products }: { title: string, products: Product[] }) => (
    <section className="py-8">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <span className="text-sm text-slate-500">{products.length} results</span>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
          <button onClick={goHome} className="mt-4 text-indigo-600 font-medium hover:underline">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => {
             const bestPrice = Math.min(...product.offers.map(o => o.price));
             const storeCount = product.offers.length;
             return (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm">
                    {storeCount} Stores
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-indigo-600 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-slate-900 line-clamp-2 h-10 mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                    <div>
                      <div className="text-xs text-slate-500">Best Price</div>
                      <div className="text-xl font-bold text-slate-900">${bestPrice}</div>
                    </div>
                    <button className="bg-slate-100 text-slate-700 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );

  const HomeView = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-indigo-200 mb-6 border border-white/10">
            <Zap className="w-3 h-3" />
            <span>AI-Powered Price Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Stop Overpaying.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              We Find the Best Price.
            </span>
          </h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-lg">
            Compare prices from Amazon, eBay, Walmart, and 50+ other stores instantly. Track price history and get AI-driven buying advice.
          </p>
          <div className="flex flex-wrap gap-3">
             {POPULAR_SEARCHES.map(term => (
               <button 
                key={term}
                onClick={() => { setSearchQuery(term); setView('SEARCH'); }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm transition-colors border border-white/5"
               >
                 {term}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Explore Categories</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${activeCategory === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <ShoppingBag size={18} />
            All
          </button>
          {CATEGORIES.map(cat => {
            let Icon = ShoppingBag;
            if (cat === 'Electronics') Icon = Monitor;
            if (cat === 'Home') Icon = HomeIcon;
            if (cat === 'Sports') Icon = Dumbbell;
            if (cat === 'Fashion') Icon = Shirt;

            return (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
              >
                <Icon size={18} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <ProductGrid title={activeCategory === 'All' ? "Trending Now" : `${activeCategory} Deals`} products={filteredProducts} />
    </main>
  );

  const SearchView = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      {/* Filters Sidebar - Hidden on mobile for simplicity in this demo */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Price Range</h4>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>
              <div className="pb-4 border-b border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Stores</h4>
                {['Amazon', 'Best Buy', 'Walmart', 'eBay', 'Target'].map(store => (
                  <label key={store} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-600">{store}</span>
                  </label>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Condition</h4>
                {['New', 'Refurbished', 'Used'].map(cond => (
                  <label key={cond} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-600">{cond}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <ProductGrid title={`Results for "${searchQuery}"`} products={filteredProducts} />
      </div>
    </main>
  );

  const ProductDetailView = () => {
    if (!selectedProduct) return null;

    const bestOffer = selectedProduct.offers.reduce((prev, curr) => prev.price < curr.price ? prev : curr);

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="cursor-pointer hover:text-indigo-600" onClick={goHome}>Home</span>
          <ChevronRight size={14} />
          <span className="cursor-pointer hover:text-indigo-600" onClick={() => { setView('HOME'); setActiveCategory(selectedProduct.category); }}>
            {selectedProduct.category}
          </span>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-medium truncate">{selectedProduct.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image */}
          <div className="space-y-4">
             <div className="bg-white rounded-2xl border border-slate-100 p-8 flex items-center justify-center aspect-square shadow-sm">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="max-w-full max-h-full object-contain" />
             </div>
             <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="bg-white rounded-lg border border-slate-100 aspect-square p-2 cursor-pointer hover:border-indigo-500 transition-colors">
                    <img src={selectedProduct.imageUrl} className="w-full h-full object-contain opacity-50 hover:opacity-100" />
                 </div>
               ))}
             </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
               <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedProduct.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-amber-400 fill-current" />
                      <span className="font-bold text-slate-900">{selectedProduct.rating}</span>
                      <span className="text-slate-500">({selectedProduct.reviewCount} reviews)</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="text-indigo-600 font-medium">{selectedProduct.brand}</span>
                  </div>
               </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              {selectedProduct.description}
            </p>

            {/* Top Deal Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
               <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="text-indigo-300 font-medium mb-1">Best Price at {bestOffer.storeName}</div>
                    <div className="text-4xl font-bold">${bestOffer.price}</div>
                    <div className="text-sm text-slate-400 mt-1">{bestOffer.shipping} Shipping • {bestOffer.condition}</div>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/25 flex items-center gap-2">
                    Buy Now <ExternalLink size={18} />
                  </button>
               </div>
            </div>

            {/* Price Chart */}
            <div className="mb-8">
              <PriceChart data={selectedProduct.priceHistory} />
            </div>

            {/* Specs Mini Table */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                 {Object.entries(selectedProduct.specs).map(([key, val]) => (
                   <div key={key} className="bg-slate-50 p-3 rounded-lg">
                     <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{key}</div>
                     <div className="font-medium text-slate-900">{val}</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Offers Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
           <div className="p-6 border-b border-slate-100">
             <h3 className="text-lg font-bold text-slate-900">Compare Prices from {selectedProduct.offers.length} Stores</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-slate-50 text-slate-500 text-sm font-medium">
                 <tr>
                   <th className="p-4 pl-6">Store</th>
                   <th className="p-4">Condition</th>
                   <th className="p-4">Shipping</th>
                   <th className="p-4">Total Price</th>
                   <th className="p-4 text-right pr-6">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {selectedProduct.offers.sort((a,b) => a.price - b.price).map((offer, idx) => (
                   <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                     <td className="p-4 pl-6">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                           {offer.storeLogo}
                         </div>
                         <span className="font-medium text-slate-900">{offer.storeName}</span>
                         {idx === 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Best Deal</span>}
                       </div>
                     </td>
                     <td className="p-4 text-slate-600">{offer.condition}</td>
                     <td className="p-4 text-slate-600">{offer.shipping}</td>
                     <td className="p-4 font-bold text-slate-900">${offer.price}</td>
                     <td className="p-4 text-right pr-6">
                       <button className="text-indigo-600 font-medium text-sm hover:underline flex items-center gap-1 justify-end ml-auto">
                         Go to Store <ExternalLink size={14} />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <div className="bg-slate-50 p-4 flex items-center gap-2 justify-center text-sm text-slate-500 border-t border-slate-100">
              <ShieldCheck size={16} />
              <span>We verify prices daily. Last updated: 2 hours ago.</span>
           </div>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Header />
      
      {view === 'HOME' && <HomeView />}
      {view === 'SEARCH' && <SearchView />}
      {view === 'PRODUCT_DETAIL' && <ProductDetailView />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="text-indigo-600" />
              <span className="text-xl font-bold text-slate-900">PricePulse</span>
           </div>
           <p className="text-slate-500 text-sm max-w-md mx-auto">
             PricePulse is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
           </p>
        </div>
      </footer>

      {/* Global AI Assistant */}
      <AIAssistant product={selectedProduct} />
    </div>
  );
}

export default App;