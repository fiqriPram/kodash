export default function ImportPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-24">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Import URLs</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Scrape web content with real-time progress
            </p>
          </div>

          <div className="rounded-lg border border-border p-8">
            <p className="text-muted-foreground mb-4">
              The import feature allows you to easily capture content from any
              URL and save it to your knowledge base.
            </p>
            <p className="text-muted-foreground">
              Sign up to get started with importing and organizing your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
