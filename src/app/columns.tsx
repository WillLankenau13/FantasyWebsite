import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"
import { FilterFn } from "@tanstack/react-table"

const positionFilter: FilterFn<any> = (row, columnId, filterValue: string[]) => {
  return filterValue.includes(row.getValue(columnId))
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "pos",
    header: "Position",
    filterFn: positionFilter,
  },
  {
    accessorKey: "proj",
    header: "Projection",
  }
]