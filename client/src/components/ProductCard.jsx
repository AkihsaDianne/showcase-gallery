
function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(product.price);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-slate-800">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-500">
          {product.description}
        </p>

        <div className="border-t border-slate-100 pt-4">
          <span className="text-xl font-extrabold text-violet-600">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
