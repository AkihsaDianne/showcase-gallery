
import { useState } from 'react';

const MAX_SIZE = 1024 * 1024;

function ImageUpload({ value, onChange }) {
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please choose a JPG, PNG, or WebP image.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('Image is too large. Maximum size is 1 MB.');
      e.target.value = '';
      return;
    }

    setError('');

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.onerror = () => {
      setError('Could not read the image file.');
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-violet-500 hover:bg-violet-50">

        {value ? (
          <img
            src={value}
            alt="Product preview"
            className="h-48 w-full object-contain"
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-3xl">📷</p>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Click to choose an image
            </p>
            <p className="mt-1 text-xs text-slate-400">
              JPG, PNG, WebP — Max 1 MB
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
