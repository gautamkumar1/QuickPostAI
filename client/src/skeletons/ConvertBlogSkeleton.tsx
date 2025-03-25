

const ConvertBlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white animate-pulse">
      {/* Header Skeleton */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="h-8 w-24 bg-zinc-700 rounded"></div>
        <div className="h-8 w-24 bg-zinc-700 rounded"></div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Top Section Skeleton */}
          <div className="mb-8 text-center">
            <div className="h-10 w-3/4 mx-auto bg-zinc-700 rounded mb-3"></div>
            <div className="h-6 w-full max-w-md mx-auto bg-zinc-700 rounded"></div>
          </div>

          {/* Input Section Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 h-12 bg-zinc-700 rounded-lg"></div>
            <div className="w-full sm:w-auto h-12 bg-zinc-700 rounded-lg"></div>
          </div>

          {/* Generated Tweets Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-1/2 bg-zinc-700 rounded"></div>
            
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item} 
                  className="rounded-lg shadow-md border border-zinc-800 bg-zinc-800 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-4 w-full bg-zinc-700 rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-zinc-700 rounded"></div>
                    </div>
                    <div className="h-8 w-8 bg-zinc-700 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConvertBlogSkeleton;