import { ColumnDef } from "@tanstack/react-table"
import { FilterFn } from "@tanstack/react-table"
import { CellContext } from "@tanstack/react-table";
import projections from "@/data/sample_data2.json"

// TS infers the exact shape from the actual data — this IS your type now
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
    sortingFn: 'text',
  },
    {
    accessorKey: "pos",
    header: () => <HeaderAbbr short="Pos" full="Position" />,
    filterFn: positionFilter,
    sortingFn: 'text',
  },
    {
    accessorKey: "team",
    header: () => <HeaderAbbr short="Tm" full="Team" />,
    sortingFn: 'text',
  },
    {
    accessorKey: "opponent",
    header: () => <HeaderAbbr short="Opp" full="Opponent" />,
    sortingFn: 'text',
  },
    {
    accessorKey: "pas_att_pred",
    header: () => <HeaderAbbr short="PA" full="Predicted Pass Attempts" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "cmp_pred",
    header: () => <HeaderAbbr short="Cmp" full="Predicted Completions" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "pas_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Pass Yards" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "pas_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Pass Touchdowns" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "int_pred",
    header: () => <HeaderAbbr short="Int" full="Predicted Interceptions" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_att_pred",
    header: () => <HeaderAbbr short="SC" full="Predicted Scramble Attempts" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Scramble Yards" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "sc_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Scramble Touchdowns" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "tgt_pred",
    header: () => <HeaderAbbr short="Tgt" full="Predicted Targets" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_pred",
    header: () => <HeaderAbbr short="Rec" full="Predicted Receptions" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Receiving Yards" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rec_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Receiving Touchdowns" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_att_pred",
    header: () => <HeaderAbbr short="RA" full="Predicted Rushing Attempts" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_yds_pred",
    header: () => <HeaderAbbr short="Yds" full="Predicted Rushing Yards" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "rus_tds_pred",
    header: () => <HeaderAbbr short="TDs" full="Predicted Rushing Touchdowns" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "fl_pred",
    header: () => <HeaderAbbr short="FL" full="Predicted Fumbles Lost" />,
    sortingFn: 'basic',
    cell: roundedCell(),
  },
    {
    accessorKey: "fpts_pred",
    header: () => <HeaderAbbr short="Proj" full="Projection" />,
    sortingFn: 'basic',
    cell: roundedCell(2),
  }
]