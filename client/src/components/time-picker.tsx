import * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function TimePickerDemo() {
  const [hours, setHours] = React.useState("12")
  const [minutes, setMinutes] = React.useState("00")
  const [period, setPeriod] = React.useState<"AM" | "PM">("PM")

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^(0?[1-9]|1[0-2])$/.test(value)) {
      setHours(value)
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^([0-5]?[0-9])$/.test(value)) {
      setMinutes(value)
    }
  }

  const togglePeriod = () => {
    setPeriod(period === "AM" ? "PM" : "AM")
  }

  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center border rounded-md">
        <div className="px-3 py-2 border-r">
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input className="w-12 border-0 text-center" value={hours} onChange={handleHoursChange} placeholder="12" />
        <span className="text-center">:</span>
        <Input className="w-12 border-0 text-center" value={minutes} onChange={handleMinutesChange} placeholder="00" />
        <motion.button className="px-3 py-2 border-l" onClick={togglePeriod} whileTap={{ scale: 0.95 }}>
          {period}
        </motion.button>
      </div>
    </motion.div>
  )
}

