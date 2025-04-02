
import * as React from "react"

import { cn } from "@/lib/utils"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const childRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const calculatePosition = React.useCallback(() => {
    if (!childRef.current || !tooltipRef.current) return
    
    const childRect = childRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    const gap = 8 // gap between tooltip and trigger
    
    let top = 0
    let left = 0
    
    switch (side) {
      case "top":
        top = childRect.top - tooltipRect.height - gap
        left = childRect.left + (childRect.width - tooltipRect.width) / 2
        break
      case "bottom":
        top = childRect.bottom + gap
        left = childRect.left + (childRect.width - tooltipRect.width) / 2
        break
      case "left":
        top = childRect.top + (childRect.height - tooltipRect.height) / 2
        left = childRect.left - tooltipRect.width - gap
        break
      case "right":
        top = childRect.top + (childRect.height - tooltipRect.height) / 2
        left = childRect.right + gap
        break
    }
    
    setPosition({ top, left })
  }, [side])

  React.useEffect(() => {
    if (isVisible) {
      calculatePosition()
      // Recalculate on window resize
      window.addEventListener("resize", calculatePosition)
      // Cleanup
      return () => window.removeEventListener("resize", calculatePosition)
    }
  }, [isVisible, calculatePosition])

  return (
    <>
      <div
        ref={childRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
          }}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {content}
        </div>
      )}
    </>
  )
}

export { Tooltip }
