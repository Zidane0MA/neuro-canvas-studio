import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Container, Home, Server, ChevronDown, Settings, Users, HelpCircle, LogOut, Database, Activity, AreaChart } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title = "Dashboard" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const adminNavItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: window.location.pathname === "/dashboard",
    },
    {
      title: "Pods",
      icon: Server,
      href: "/admin/pods",
      active: window.location.pathname.includes("/admin/pods"),
    },
    {
      title: "Usuarios",
      icon: Users,
      href: "/admin/users",
      active: window.location.pathname === "/admin/users",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/admin/settings",
      active: window.location.pathname === "/admin/settings",
    },
    {
      title: "Ayuda",
      icon: HelpCircle,
      href: "/admin/help",
      active: window.location.pathname === "/admin/help",
    },
  ];

  const clientNavItems: NavItem[] = [
    {
      title: "Home",
      icon: Home,
      href: "/dashboard",
      active: window.location.pathname === "/dashboard",
    },
    {
      title: "Estadísticas",
      icon: AreaChart,
      href: "/client/stats",
      active: window.location.pathname === "/client/stats",
    },
    {
      title: "Pods",
      icon: Server,
      href: "/client/pods",
      active: window.location.pathname.includes("/client/pods"),
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/client/settings",
      active: window.location.pathname === "/client/settings",
    },
    {
      title: "Ayuda",
      icon: HelpCircle,
      href: "/client/help",
      active: window.location.pathname === "/client/help",
    },
  ];

  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-col w-64 border-r border-border bg-card fixed h-full">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Container className="h-5 w-5 text-purple-500" />
            <span className="font-bold text-xl">NeuroPod</span>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                asChild
              >
                <Link to={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.title}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{user?.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Saldo</span>
              <span className="font-semibold">
                {typeof user?.balance === 'number' && user.balance === Infinity 
                  ? '∞ €' 
                  : `${user?.balance?.toFixed(2) || 0} €`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="border-b border-border bg-card sticky top-0 z-10 flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{user?.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="hidden md:block border-l border-border pl-4">
              <div className="text-sm text-muted-foreground">Saldo</div>
              <div className="font-semibold">
                {typeof user?.balance === 'number' && user.balance === Infinity 
                  ? '∞ €' 
                  : `${user?.balance?.toFixed(2) || 0} €`
                }
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
};
