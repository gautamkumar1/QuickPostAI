import * as React from "react"

type ChartProps = {
  data: any[]
  children: React.ReactNode
}

export const Chart = ({ data, children }: ChartProps) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { data })
        }
        return child
      })}
    </div>
  )
}

type ChartAreaProps = {
  name: string
  valueKey: string
  className?: string
  data?: any[]
}

export const ChartArea = ({ name, valueKey, className }: ChartAreaProps) => {
  return <div />
}

type ChartAxisXProps = {
  data?: any[]
}

export const ChartAxisX = ({}: ChartAxisXProps) => {
  return <div />
}

type ChartAxisYProps = {
  data?: any[]
}

export const ChartAxisY = ({}: ChartAxisYProps) => {
  return <div />
}

type ChartBarProps = {
  name: string
  valueKey: string
  className?: string
  data?: any[]
}

export const ChartBar = ({ name, valueKey, className }: ChartBarProps) => {
  return <div />
}

type ChartGridProps = {
  data?: any[]
}

export const ChartGrid = ({}: ChartGridProps) => {
  return <div />
}

type ChartTooltipProps = {
  children: React.ReactNode
  data?: any[]
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <div>{children}</div>
}

type ChartTooltipContentProps = {
  data?: any[]
}

export const ChartTooltipContent = ({}: ChartTooltipContentProps) => {
  return <div />
}

