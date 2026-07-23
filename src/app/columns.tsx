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
    sortingFn: 'text',
  },
  {
    accessorKey: "pos",
    header: "Position",
    filterFn: positionFilter,
    sortingFn: 'text',
  },
  {
    accessorKey: "proj",
    header: "Projection",
    sortingFn: 'basic',
  }
]