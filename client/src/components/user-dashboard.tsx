import { motion } from "framer-motion"
import { AppSidebar } from "./app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { FeatureHighlight } from "./feature-highlight"
import { RecentActivities } from "./recent-activities"
import { AutoScheduleSection } from "./auto-schedule-section"
import { CreatePostSection } from "./create-post-section"
import { Outlet } from "react-router-dom"

const userData = {
  recentConversions: [
    { id: 1, title: "10 Ways to Improve Your Writing", date: "2 days ago" },
    { id: 2, title: "The Future of AI in Content Creation", date: "3 days ago" },
    { id: 3, title: "How to Build a Personal Brand", date: "1 week ago" },
  ],
  savedDrafts: [
    { id: 1, title: "Marketing Strategies for 2025", date: "Yesterday" },
    { id: 2, title: "Social Media Trends to Watch", date: "3 days ago" },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

export function UserDashboardDemo() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">

              </BreadcrumbItem>

              <BreadcrumbItem>

              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex min-h-screen w-full flex-col">
          {/* <TopBanner /> */}
          <motion.div
            className="container mx-auto grid flex-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6 lg:col-span-2" variants={itemVariants}>
              <FeatureHighlight />
              <RecentActivities recentConversions={userData.recentConversions} savedDrafts={userData.savedDrafts} />
            </motion.div>
            <motion.div className="space-y-6" variants={itemVariants}>
              <AutoScheduleSection />
              <CreatePostSection />
            </motion.div>
          </motion.div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
