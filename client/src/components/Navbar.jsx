
function Navbar({ view, onChangeView }) {
  const tabs = ['gallery', 'manage'];

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Show<span className="text-violet-600">Case</span>
        </h1>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onChangeView(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                view === tab
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'gallery' ? 'Gallery' : 'Manage'}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
