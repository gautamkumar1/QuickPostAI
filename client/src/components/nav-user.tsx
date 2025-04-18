

import {ChevronsUpDown, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "@/Api/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { QueryClient } from "@tanstack/react-query";
export function NavUser({
  user,
}: {
  user: {
    username: string
    email: string
    avatarUrl: string
  }
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const queryClient = new QueryClient();
  const mutation = useMutation(({
    mutationFn: logoutUser,
    onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.clear();
    },
    onError: (error: Error) => {
        let errorMessage = "Log out failed";

        const err = error as Error & { response?: { data?: { message?: string } } };
        if (err.response && err.response.data) {
            errorMessage = err.response.data.message || errorMessage;
        }

        console.log(`Error logging out user: ${errorMessage}`);
        toast.error(errorMessage);
    }
}))
const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
    navigate("/");
}
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.username}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

