export default function ProgressBar({ value, total, className = '' }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{value} / {total} cards</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-brand-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
