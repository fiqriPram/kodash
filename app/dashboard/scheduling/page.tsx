export default function SchedulingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scheduling</h1>
        <p className="text-muted-foreground mt-2">
          Explore new content and recommendations
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-lg border border-border p-6">
          <p className="text-muted-foreground">
            Discover recommendations coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
