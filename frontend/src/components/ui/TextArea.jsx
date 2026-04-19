export default function Textarea({ label, hint, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className="bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100
                   placeholder-gray-600 px-4 py-3 outline-none resize-none font-mono
                   focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
                   transition-all duration-150"
      />
      {hint && (
        <span className="text-xs text-gray-600">{hint}</span>
      )}
    </div>
  )
}