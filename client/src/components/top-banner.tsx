import { motion } from "framer-motion"

export function TopBanner() {
  return (
    <motion.div
      className="relative w-full bg-gradient-to-r from-primary/20 via-primary/10 to-background p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.div
            className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Anime character"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.h1
            className="text-2xl font-bold md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to QuickPost AI!
          </motion.h1>
        </div>
      </div>
    </motion.div>
  )
}

