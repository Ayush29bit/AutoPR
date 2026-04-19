export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'h-12 w-full rounded-xl font-medium text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2'

  const variants = {
    primary:  'bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed',
    ghost:    'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-gray-200 border border-gray-700',
    danger:   'bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-800/50',
  }

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}