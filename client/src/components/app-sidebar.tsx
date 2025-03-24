
import { Link, useLocation } from "react-router-dom";
import { AudioWaveform, BookOpen, Calendar, Command, GalleryVerticalEnd, Home, PenSquare } from "lucide-react"
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
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { NavUser } from "./nav-user";
import useAuthStore from "@/zustand/authStore";


type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
};
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   };
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const pathname = location.pathname
  const {user} = useAuthStore();

  

  const navItems: NavItem[] = [
    // { title: "Home", url: "/dashboard", icon: Home, isActive: pathname === "/dashboard" },
    { title: "Convert Blog", url: "/dashboard/convert-blog", icon: BookOpen, isActive: pathname === "/dashboard/convert-blog" },
    { title: "Auto Schedule Post", url: "/dashboard/auto-schedule", icon: Calendar, isActive: pathname === "/dashboard/auto-schedule" },
    { title: "Create Post", url: "/dashboard/create-post", icon: PenSquare, isActive: pathname === "/dashboard/create-post" },
  ];


  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
            <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CustomLogo />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold text-foreground">QuickPost AI</span>
            </div>
            
        </div>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as any} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

const CustomLogo = ({ className = "" }) => (
  <svg 
    className={cn('w-8 h-8', className)} 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="4"
  >
    <line x1="40" y1="60" x2="160" y2="60" strokeLinecap="round" />
    <line x1="40" y1="90" x2="140" y2="90" strokeLinecap="round" />
    <line x1="40" y1="120" x2="120" y2="120" strokeLinecap="round" />
    <path d="M130 150 C150 150, 170 130, 170 110 C170 90, 150 70, 130 70 C110 70, 90 90, 90 110 C90 130, 110 150, 130 150 Z" fill="none" stroke="currentColor" />
    <polygon points="125,80 135,100 115,120" fill="currentColor" />
  </svg>
);