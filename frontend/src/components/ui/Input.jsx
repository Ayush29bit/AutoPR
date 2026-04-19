export default function Input({ label, prefix, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden
                      focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30
                      transition-all duration-150">
        {prefix && (
          <span className="px-3 text-sm text-gray-500 border-r border-gray-700 font-mono select-none shrink-0">
            {prefix}
          </span>
        )}
        <input
          {...props}
          className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-600
                     px-3 py-2.5 outline-none font-mono"
        />
      </div>
    </div>
  )
}