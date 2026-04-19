import IssueForm from '../components/form/IssueForm'

export default function HomePage() {
  return (
    <div className="min-h-full flex items-start justify-center pt-12 pb-16 px-4">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-100 tracking-tight">
            New pipeline run
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Describe a GitHub issue. AutoPR will read your codebase, plan a fix, write the code, and open a PR.
          </p>
        </div>
        <IssueForm />
      </div>
    </div>
  )
}