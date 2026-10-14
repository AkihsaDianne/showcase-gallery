
import { useState } from 'react';
import ImageUpload from './ImageUpload';

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price ?? '',
    description: product?.description || '',
    image: product?.image || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      setError('Please upload a product image.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave(
        {
          ...form,
          price: Number(form.price),
        },
        product?._id
      );

      if (!product) {
        setForm({
          name: '',
          price: '',
          description: '',
          image: '',
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-bold text-slate-800">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div className="space-y-4">
        <ImageUpload
          value={form.image}
          onChange={(image) =>
            setForm((prev) => ({ ...prev, image }))
          }
        />

        <div>
          <label className="mb-1 block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Price (PHP)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-slate-300 p-3"
            placeholder="Describe your product"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {saving
              ? 'Saving...'
              : product
              ? 'Update Product'
              : 'Add Product'}
          </button>

          {product && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-6 py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
