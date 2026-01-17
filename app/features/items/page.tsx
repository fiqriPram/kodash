export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-24">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Summaries</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Generate intelligent summaries of your saved content
            </p>
          </div>

          <div className="rounded-lg border border-border p-8">
            <p className="text-muted-foreground mb-4">
              Our AI-powered summarization engine helps you quickly understand
              and retain key information from articles, documents, and web
              content.
            </p>
            <p className="text-muted-foreground">
              Sign up to start creating and exploring intelligent summaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
