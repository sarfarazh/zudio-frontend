export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-2">Recent Projects</h2>
          <p className="text-muted-foreground">View your recent AI media projects</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-2">Quick Create</h2>
          <p className="text-muted-foreground">Start a new AI media project</p>
        </div>
        <div className="p-6 rounded-lg border bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-2">Media Library</h2>
          <p className="text-muted-foreground">Browse your generated media</p>
        </div>
      </div>
    </div>
  );
} 