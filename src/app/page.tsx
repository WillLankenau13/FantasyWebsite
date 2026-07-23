"use client";

import React, { useState, useEffect } from "react";
import { columns } from "@/app/columns";
import { DataTable } from "@/components/ui/data-table";
//import sample_data from "@/data/sample_data2.json";
import { Checkbox } from "@/components/ui/checkbox"; 
import { VisibilityState } from "@tanstack/react-table";
import { columnGroups } from "@/app/columns";

//List of positions for filter
const positions = [
  { id: "QB", label: "QB" },
  { id: "RB", label: "RB" },
  { id: "WR", label: "WR" },
  { id: "TE", label: "TE" },
] as const;

const columnLabels = Object.fromEntries(
  columns.map((col) => [
    col.id ?? (col as any).accessorKey,
    typeof col.header === "string" ? col.header : (col as any).accessorKey,
  ])
);

export default function Home() {
  const [year, setYear] = useState("2025"); //const for the year displayed; default is 2025
  const [week, setWeek] = useState("18"); //const for the week displayed; default is 18
  const [data, setData] = useState([]); //const for the data we are setting
  const [isLoading, setIsLoading] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); //const for the column visibility

  //all possible years and weeks
  const years = ["2023", "2024", "2025"]; 
  const weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    positions.map((item) => item.id)
  );

  //code to change selected positions when checkbox is checked or unchecked
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPositions((prev) => [...prev, id]);
    } else {
      setSelectedPositions((prev) => prev.filter((item) => item !== id));
    }
  };

  //code to grab the correct data based on selected week and year
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetch(`/data/backfill/Model_1.0/${year}/Week_${week}_Player_Predictions.json`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => console.error("Failed to load data:", err))
      .finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [year, week]);

  //stuff on the actual webpage
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

        <div className="mt-2 text-xs text-gray-500">
          Active Filters: {selectedPositions.length ? selectedPositions.join(", ") : "None"} {/*list of active selected positions*/}
        </div>
      </div>

      {/* Column toggles — standalone, not part of the table */}
      <div className="flex flex-wrap gap-6 rounded-md border p-4 bg-slate-50 mb-6">
        {columnGroups.map((group) => (
               <div key={group.label} className="flex flex-col gap-2 min-w-[160px]">
            <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">
              {group.label}
            </h4>
            {group.columns.map(({ id, label }) => (
              <div key={id} className="flex items-center justify-between gap-3">
                <label htmlFor={`col-${id}`} className="text-sm font-medium cursor-pointer">
                  {label}
                </label>
                <Checkbox
                  id={`col-${id}`}
                  checked={columnVisibility[id] ?? true}
                  onCheckedChange={(checked) =>
                  setColumnVisibility((prev) => ({ ...prev, [id]: !!checked }))
                }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/*Table*/}
      <div>
        {/*year and week dropdown*/}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select value={week} onChange={(e) => setWeek(e.target.value)}>
            {weeks.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {isLoading ? <p>Loading...</p> : 
        <DataTable 
          columns={columns} 
          data={data} 
          selectedPositions={selectedPositions} 
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          />}
      </div>

    </main>
  );
}
