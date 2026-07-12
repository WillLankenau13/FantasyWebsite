import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "pos",
    header: "Position",
  },
  {
    accessorKey: "proj",
    header: "Projection",
  }
]