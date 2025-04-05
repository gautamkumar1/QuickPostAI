import { PostGenerator } from "@/components/post-generator"

function CreatePost() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Say Less, Post More.</h1>
      <p className="mb-8 text-muted-foreground">
      Just type what’s in your head — we’ll clean it up and make it X-worthy. Casual. Cool. No cringe.
      </p>
      <PostGenerator />
    </div>
  </main>
  )
}

export default CreatePost