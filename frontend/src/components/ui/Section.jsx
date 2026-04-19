export default function Section({ title, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {title && (
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</h2>
      )}
      {children}
    </div>
  )
}