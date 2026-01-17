export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Items</h1>
        <p className="text-muted-foreground mt-2">
          Manage your saved items and bookmarks
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-lg border border-border p-6">
          <p className="text-muted-foreground">
            No items yet. Start adding items to your collection.
          </p>
        </div>
      </div>
    </div>
  );
}
