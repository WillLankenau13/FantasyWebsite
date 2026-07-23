import { ColumnDef } from "@tanstack/react-table"
import { FilterFn } from "@tanstack/react-table"
import { CellContext } from "@tanstack/react-table";
import projections from "@/sample_data/sample_data2.json"
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    group?: string;
    label?: string;
  }
}

export type Player = typeof projections[number]

const positionFilter: FilterFn<any> = (row, columnId, filterValue: string[]) => {
  return filterValue.includes(row.getValue(columnId))
}

function HeaderAbbr({ short, full }: { short: string; full: string }) {
  return <abbr title={full} className="no-underline cursor-help">{short}</abbr>;
}

function roundedCell(decimals = 1) {
  return ({ getValue }: CellContext<Player, number>) => {
    const value = getValue();
    return value != null ? value.toFixed(decimals) : "-";
  };
}

export const columns: ColumnDef<Player>[] = [
    {
    accessorKey: "player",
    header: () => <HeaderAbbr short="Player" full="Player Name" />,
    meta: { group: "General", label: "Player" },
    sortingFn: 'text',
  },
    {
    accessorKey: "pos",
    header: () => <HeaderAbbr short="Pos" full="Position" />,
    meta: { group: "General", label: "Position" },
    filterFn: positionFilter,
    sortingFn: 'text',
  },
    {
    accessorKey: "team",
    header: () => <HeaderAbbr short="Tm" full="Team" />,
    meta: { group: "General", label: "Team" },
    sortingFn: 'text',
  },
    {
    accessorKey: "opponent",
    header: () => <HeaderAbbr short="Opp" full="Opponent" />,
    meta: { group: "General", label: "Opponent" },
    sortingFn: 'text',
  },
    {
    accessorKey: "pas_att_pred",
    header: () => <HeaderAbbr short="PA" full="Predicted Pass Attempts" />,
    meta: { group: "Passing", label: "Predicted Pass Attempts" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "cmp_pred",
    header: () => <HeaderAbbr short="Cmp" full="Predicted Completions" />,
    meta: { group: "Passing", label: "Predicted Completiong" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "pas_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Pass Yards" />,
    meta: { group: "Passing", label: "Predicted Pass Yards" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "pas_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Pass Touchdowns" />,
    meta: { group: "Passing", label: "Predicted Pass Touchdowns" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "int_pred",
    header: () => <HeaderAbbr short="Int" full="Predicted Interceptions" />,
    meta: { group: "Passing", label: "Predicted Interceptions" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_att_pred",
    header: () => <HeaderAbbr short="SC" full="Predicted Scramble Attempts" />,
    meta: { group: "Scrambling", label: "Predicted Scramble Attempts" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Scramble Yards" />,
    meta: { group: "Scrambling", label: "Predicted Scramble Yards" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Scramble Touchdowns" />,
    meta: { group: "Scrambling", label: "Predicted Scramble TDs" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_att_pred",
    header: () => <HeaderAbbr short="RA" full="Predicted Rushing Attempts" />,
    meta: { group: "Rushing", label: "Predicted Rushing Attempts"},
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Rushing Yards" />,
    meta: { group: "Rushing", label: "Predicted Rushing Yards" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Rushing Touchdowns" />,
    meta: { group: "Rushing", label: "Predicted Rushing TDs" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "tgt_pred",
    header: () => <HeaderAbbr short="Tgt" full="Predicted Targets" />,
    meta: { group: "Receiving", label: "Predicted Targets" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_pred",
    header: () => <HeaderAbbr short="Rec" full="Predicted Receptions" />,
    meta: { group: "Receiving", label: "Predicted Receptions" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Receiving Yards" />,
    meta: { group: "Receiving", label: "Predicted Receiving Yards" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Receiving Touchdowns" />,
    meta: { group: "Receiving", label: "Predicted Receiving TDs" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "fl_pred",
    header: () => <HeaderAbbr short="FL" full="Predicted Fumbles Lost" />,
    meta: { group: "Miscellaneous", label: "Predicted Fumbles Lost" },
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "std_pred",
    header: () => <HeaderAbbr short="STD" full="Standard Scoring Projection" />,
    meta: { group: "Miscellaneous", label: "Standard Projection" },
    sortingFn: 'basic',
    cell: roundedCell(2),
  },
  {
    accessorKey: "half_pred",
    header: () => <HeaderAbbr short="HLF" full="Half-PPR Projection" />,
    meta: { group: "Miscellaneous", label: "Half-PPR Projection" },
    sortingFn: 'basic',
    cell: roundedCell(2),
  },
  {
    accessorKey: "ppr_pred",
    header: () => <HeaderAbbr short="PPR" full="PPR Projection" />,
    meta: { group: "Miscellaneous", label: "PPR Projection" },
    sortingFn: 'basic',
    cell: roundedCell(2),
  },
]

export const columnGroups = Object.values(
  columns.reduce((acc, col) => {
    const group = col.meta?.group ?? "Other";
    const id = col.id ?? (col as any).accessorKey;
    const label = col.meta?.label ?? id; // was: typeof col.header === "string" ? col.header : id

    if (!acc[group]) acc[group] = { label: group, columns: [] };
    acc[group].columns.push({ id, label });

    return acc;
  }, {} as Record<string, { label: string; columns: { id: string; label: string }[] }>)
);