import IssueForm from '../components/form/IssueForm'
 
export default function HomePage() {
  return (
    <div className="min-h-full flex flex-col justify-center py-8">
      {/* terminal welcome block */}
      <div className="max-w-2xl mx-auto w-full mb-8 font-mono text-xs text-ink-muted space-y-1">
        <div><span className="text-accent">$</span> autopr <span className="text-ink-secondary">--version 1.0.0</span></div>
        <div><span className="text-accent">$</span> agents loaded <span className="text-status-success">✓</span></div>
        <div><span className="text-accent">$</span> ollama <span className="text-ink-secondary">ready · llama3</span></div>
        <div><span className="text-accent">$</span> awaiting issue...</div>
      </div>
      <IssueForm />
    </div>
  )
}
 