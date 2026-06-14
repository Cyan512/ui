import type { ReactNode } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "./empty-state"
import { ErrorState } from "./error-state"

export interface ColumnDef<T> {
  header: string
  accessorKey?: keyof T
  accessorFn?: (row: T) => string | number | boolean | null | undefined
  cell?: (value: unknown, row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
  onRetry?: () => void
  emptyMessage?: string
  emptyAction?: { label: string; onClick: () => void }
}

function getValue<T>(row: T, col: ColumnDef<T>): unknown {
  if (col.accessorFn) {
    return col.accessorFn(row)
  }
  if (col.accessorKey) {
    return row[col.accessorKey]
  }
  return undefined
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  isError,
  onRetry,
  emptyMessage = "No hay registros",
  emptyAction,
}: DataTableProps<T>) {
  if (isError) {
    return <ErrorState onRetry={onRetry} />
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyMessage}
        action={emptyAction}
      />
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => {
                const value = getValue(row, col)
                return (
                  <TableCell key={col.header}>
                    {col.cell ? col.cell(value, row) : String(value ?? "")}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
