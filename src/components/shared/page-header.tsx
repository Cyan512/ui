import type { ReactNode } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
  action?: {
    label: string
    onClick: () => void
    icon?: ReactNode
  }
}

export function PageHeader({ title, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <BreadcrumbItem key={i}>
              {i < breadcrumbs.length - 1 ? (
                <>
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {action && (
          <Button onClick={action.onClick}>
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
