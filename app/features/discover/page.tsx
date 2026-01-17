export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-24">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Content
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Search and bulk import articles, blogs, and resources
            </p>
          </div>

          <div className="rounded-lg border border-border p-8">
            <p className="text-muted-foreground mb-4">
              Explore curated content recommendations and discover new resources
              that match your interests.
            </p>
            <p className="text-muted-foreground">
              Sign up to unlock the full discovery experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
