import { useRef } from "react";

export default function ImageUploader({ images, setImages, handleUpload }) {

  const fileRef = useRef();

  return (
    <div className="col-span-3">

      {/* LABEL */}
      <label className="block text-sm font-medium mb-2">
        Upload Car Images
      </label>

      {/* UPLOAD BOX */}
      <div className="border-2 border-dashed rounded p-4 text-center">

        <input
          type="file"
          multiple
          ref={fileRef}
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />

        <button
          onClick={() => fileRef.current.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Choose Images
        </button>

        <p className="text-xs text-gray-500 mt-2">
          JPG, PNG • Max 5MB each
        </p>

        {/* PREVIEW */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {images.map((img, i) => (
              <div key={i} className="relative">

                <img
                  src={img}
                  onError={(e) => (e.target.src = "/no-image.png")}
                  className="w-20 h-20 object-cover rounded border"
                />

                {/* REMOVE */}
                <button
                  onClick={() =>
                    setImages(images.filter((_, index) => index !== i))
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}