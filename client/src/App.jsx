
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ManagePage from './pages/ManagePage';

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from './api';

function App() {
  const [view, setView] = useState('gallery');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (data, id) => {
    if (id) {
      const updated = await updateProduct(id, data);
      setProducts((prev) =>
        prev.map((item) => item._id === id ? updated : item)
      );
    } else {
      const created = await createProduct(data);
      setProducts((prev) => [created, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar view={view} onChangeView={setView} />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {view === 'gallery' ? (
          <>
            <section className="mb-8 rounded-3xl bg-gradient-to-r from-violet-700 via-purple-600 to-blue-500 p-10 text-white">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest">
                Product Gallery
              </p>

              <h1 className="mb-3 text-4xl font-bold">
                Discover Our Products
              </h1>

              <p className="text-violet-100">
                Explore our collection of amazing products.
              </p>
            </section>

            <h2 className="text-2xl font-bold text-slate-800">
              All Products
            </h2>

            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : products.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="font-semibold">No products yet</h3>
                <p className="text-slate-500">
                  Your products will appear here once added.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <ManagePage
            products={products}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </main>

      <footer className="py-8 text-center text-sm text-slate-400">
        ShowCase Product Gallery
      </footer>
    </div>
  );
}

export default App;
