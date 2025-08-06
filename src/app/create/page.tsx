import CreateSetClientPage from "@/components/create/CreateSetClientPage";
import { Navbar } from "@/components/ui/navbar";

export default function CreateSetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <CreateSetClientPage />
      </main>
    </div>
  );
}
