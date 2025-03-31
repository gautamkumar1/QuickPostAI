const ScheduledTweetsSkeleton = () => {
    return (
      <div className="min-h-screen bg-background dark text-foreground">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Scheduled Tweets</h1>
  
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 bg-gray-200 dark:bg-gray-700 h-10 rounded" />
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
  
          {/* Desktop view: Table skeleton */}
          <div className="hidden md:block">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-10 mb-2 rounded" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full bg-gray-200 dark:bg-gray-700 h-10 mb-2 rounded" />
            ))}
          </div>
  
          {/* Mobile view: Cards skeleton */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ScheduledTweetsSkeleton;
  