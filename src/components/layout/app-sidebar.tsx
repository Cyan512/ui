import { useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  FileType,
  Building2,
  BookOpen,
  GraduationCap,
  Link2,
  LogOut,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useAuth } from "@/hooks/use-auth"
import { useTiposPrograma } from "@/hooks/queries/use-tipos-programa"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Tipos de Programa", icon: FileType, to: "/tipos-programa" },
  { label: "Facultades", icon: Building2, to: "/facultades" },
  { label: "Cursos", icon: BookOpen, to: "/cursos" },
  { label: "Programa-Curso", icon: Link2, to: "/programas-cursos" },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { data: tipos } = useTiposPrograma()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <GraduationCap className="size-6 text-sidebar-primary" />
          <span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
            Gestión Académica
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    isActive={location.pathname.startsWith(item.to)}
                    tooltip={item.label}
                    onClick={() => navigate(item.to)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Programas collapsible */}
              <SidebarMenuItem>
                <Collapsible
                  defaultOpen={location.pathname.startsWith("/programas") && !location.pathname.startsWith("/programas-cursos")}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={location.pathname.startsWith("/programas") && !location.pathname.startsWith("/programas/crear") && !location.pathname.startsWith("/programas-cursos")}
                      tooltip="Programas"
                    >
                      <GraduationCap />
                      <span>Programas</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          isActive={location.pathname === "/programas"}
                          onClick={() => navigate("/programas")}
                        >
                          Todos
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {tipos?.map((t) => (
                        <SidebarMenuSubItem key={t.id}>
                          <SidebarMenuSubButton
                            isActive={location.pathname === `/programas/${t.slug}` || location.pathname.startsWith(`/programas/${t.slug}/`)}
                            onClick={() => navigate(`/programas/${t.slug}`)}
                          >
                            {t.nombre}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-1 px-2 py-1 group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">{user?.nombre}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Cerrar sesión"
              onClick={() => {
                logout()
                navigate("/login")
              }}
            >
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
