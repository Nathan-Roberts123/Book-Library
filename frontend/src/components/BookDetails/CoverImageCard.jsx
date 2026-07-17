import { FiExternalLink } from "react-icons/fi";

export default function CoverImageCard({
  imageUrl,
  fileName,
  uploadedOn,
  fileSize,
  storageProvider,
  onViewFullSize,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Cover Image</h2>

        <button
          onClick={onViewFullSize}
          className="flex items-center gap-2 rounded-xl border border-blue-300 px-4 py-2 text-blue-600 hover:bg-blue-50"
        >
          View Full Size
          <FiExternalLink />
        </button>
      </div>

      <div className="flex gap-8">
        {/* Thumbnail */}

        <img
          src={imageUrl}
          alt={fileName}
          className="h-36 w-24 rounded-lg border object-cover"
        />

        {/* Metadata */}

        <div className="grid flex-1 grid-cols-[140px_1fr] gap-y-5 text-gray-700">
          <span className="font-medium text-gray-500">Filename</span>

          <span>{fileName}</span>

          <span className="font-medium text-gray-500">Uploaded On</span>

          <span>{uploadedOn}</span>

          <span className="font-medium text-gray-500">Size</span>

          <span>{fileSize}</span>

          <span className="font-medium text-gray-500">Storage</span>

          <span>{storageProvider}</span>
        </div>
      </div>
    </div>
  );
}
