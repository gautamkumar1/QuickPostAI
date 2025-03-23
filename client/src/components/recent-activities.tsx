import { Edit, Trash2, Twitter } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

interface RecentActivitiesProps {
  recentConversions: {
    id: number
    title: string
    date: string
  }[]
  savedDrafts: {
    id: number
    title: string
    date: string
  }[]
}

export function RecentActivities({ recentConversions, savedDrafts }: RecentActivitiesProps) {
  return (
    <Card className="border-border/40 bg-card/50 shadow-md">
      <CardHeader>
        <CardTitle>Your Recent Activities</CardTitle>
        <CardDescription>View and manage your recent conversions and drafts</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversions">Recent Conversions</TabsTrigger>
            <TabsTrigger value="drafts">Saved Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="conversions" className="mt-4 space-y-4">
            {recentConversions.length > 0 ? (
              <div className="space-y-3">
                {recentConversions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-primary">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">View X Post</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No recent conversions found</p>
            )}
          </TabsContent>
          <TabsContent value="drafts" className="mt-4 space-y-4">
            {savedDrafts.length > 0 ? (
              <div className="space-y-3">
                {savedDrafts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="text-blue-500">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Draft</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Draft</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No saved drafts found</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

