"use client";

import React, { useState } from "react";
import { columns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
import sample_data from "@/data/sample_data.json";
import { Checkbox } from "@/components/ui/checkbox"; 

const positions = [
  { id: "QB", label: "QB" },
  { id: "RB", label: "RB" },
  { id: "WR", label: "WR" },
  { id: "TE", label: "TE" },
  { id: "DST", label: "DST" },
] as const;

export default function Home() {
  const data = sample_data;

  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    positions.map((item) => item.id)
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPositions((prev) => [...prev, id]);
    } else {
      setSelectedPositions((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 p-24">
      {/* Multiple Checkboxes Layout */}
      <div className="flex flex-col gap-4 rounded-md border p-6 bg-slate-50 min-w-[200px]">
        <h3 className="font-semibold text-gray-900">Position</h3>
        
        {positions.map((position) => (
          <div key={position.id} className="flex items-center space-x-3">
            <Checkbox 
              id={position.id} 
              checked={selectedPositions.includes(position.id)}
              onCheckedChange={(checked) => handleCheckboxChange(position.id, !!checked)}
            />
            <label 
              htmlFor={position.id} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {position.label}
            </label>
          </div>
        ))}

        {/* Debug view to make sure state is updating */}
        <div className="mt-2 text-xs text-gray-500">
          Active Filters: {selectedPositions.length ? selectedPositions.join(", ") : "None"}
        </div>
      </div>
      
      {/*Data Table */}
      <DataTable columns={columns} data={data} selectedPositions={selectedPositions} />
    </main>
  );
}
