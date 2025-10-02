import { JobInsertForm } from "@/components/job-insert-form";

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Job inserieren
          </h1>
          <p className="text-muted-foreground">
            Finden Sie die perfekten Kandidaten für Ihre Stelle und unterstützen
            Sie gleichzeitig soziale Projekte
          </p>
        </div>

        <JobInsertForm />
      </div>
    </div>
  );
}
