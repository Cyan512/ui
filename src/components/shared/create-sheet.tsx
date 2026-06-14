import type { ReactNode } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface CreateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export function CreateSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: CreateSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && (
            <SheetDescription>{description}</SheetDescription>
          )}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
