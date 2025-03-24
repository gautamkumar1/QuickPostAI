
// import BlogToTweetsForm from "@/components/blog-to-tweets-form"


export default function ConvertBlog() {
  return (
    <div className="min-h-screen bg-background">
        <header className="container mx-auto py-6 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Blog to Tweets</h1>
          
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Convert Blog Posts to Tweets</h2>
              <p className="text-muted-foreground">
                Enter your blog URL and let AI generate engaging tweets for your content
              </p>
            </div>
            {/* <BlogToTweetsForm /> */}
          </div>
        </main>
        <footer className="container mx-auto py-6 px-4 border-t">
          <p className="text-center text-muted-foreground text-sm">
            Powered by AI - Convert your blog posts to tweets effortlessly
          </p>
        </footer>
      </div>
  )
}

