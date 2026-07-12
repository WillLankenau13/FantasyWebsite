import { columns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import sample_data from "@/data/sample_data.json";

export default async function Home() {
    const data = sample_data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable columns={columns} data={data} />
    </main>
  );
}