import {  useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getScheduledTweets } from "@/Api/api";

// ✅ Define the Tweet interface
interface Tweet {
  id: string;
  content: string;
  scheduleTime: string;
  status: string;
  createdAt: string;
}

function ScheduledTweetsPage() {
  const { data, isLoading, isError, refetch } = useQuery<Tweet[]>({
    queryKey: ["scheduledTweets"],
    queryFn: getScheduledTweets,
  });

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const sortedTweets = [...(data ?? [])].sort((a, b) => {
    const dateA = new Date(a.scheduleTime).getTime();
    const dateB = new Date(b.scheduleTime).getTime();
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredTweets = sortedTweets.filter((tweet) =>
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-pulse flex flex-col items-center space-y-2">
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          <div className="h-24 bg-slate-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Failed to load scheduled tweets</p>
        <Button variant="outline" onClick={() => refetch()} className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No scheduled tweets found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark text-foreground">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Scheduled Tweets</h1>

        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tweets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={toggleSortDirection}>
              {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Tweets</DropdownMenuItem>
                <DropdownMenuItem>Posted</DropdownMenuItem>
                <DropdownMenuItem>Scheduled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop view: Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Schedule Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTweets.map((tweet) => (
                <TableRow key={tweet.id}>
                  <TableCell className="font-medium">{tweet.content}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(new Date(tweet.scheduleTime), "MMM d, yyyy")}
                      <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                      {format(new Date(tweet.scheduleTime), "h:mm a")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                      {tweet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(tweet.createdAt), "MMM d, yyyy h:mm a")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view: Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredTweets.map((tweet) => (
            <Card key={tweet.id} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{tweet.content}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(new Date(tweet.scheduleTime), "MMM d, yyyy")}</span>
                  <Clock className="h-4 w-4 mx-2 text-muted-foreground" />
                  <span>{format(new Date(tweet.scheduleTime), "h:mm a")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                    {tweet.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created: {format(new Date(tweet.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduledTweetsPage;
