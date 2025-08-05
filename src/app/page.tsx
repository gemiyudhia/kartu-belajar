import { Navbar } from "@/components/ui/navbar";
import HomeDashboard from "@/components/dashboard/HomeDashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <HomeDashboard />
      </main>
    </div>
  );
}
