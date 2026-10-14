
import { useState } from 'react';
import ProductForm from '../components/ProductForm';

function ManagePage({ products, onSave, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const handleSave = async (data, id) => {
    await onSave(data, id);
    setEditing(null);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      setError('');
      await onDelete(id);

      if (editing?._id === id) {
        setEditing(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        Manage Products
      </h1>

      {error && (
        <p className="mb-4 text-red-600">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <ProductForm
            key={editing?._id || 'new'}
            product={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">
            Products ({products.length})
          </h2>

          {products.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-slate-500">
              No products yet. Add your first product.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-slate-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 font-semibold text-violet-600">
                      ₱{Number(product.price).toLocaleString('en-PH')}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setEditing(product)}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManagePage;
