
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionItemProps {
  value: string
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

interface AccordionProps {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
  collapsible?: boolean
}

const AccordionContext = React.createContext<{
  value: string | string[] | undefined
  onValueChange: (value: string | string[]) => void
  type: "single" | "multiple"
  collapsible?: boolean
}>({
  value: undefined,
  onValueChange: () => {},
  type: "single"
})

const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  collapsible,
}) => {
  const [state, setState] = React.useState<string | string[] | undefined>(
    value || defaultValue || (type === "single" ? undefined : [])
  )
  
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : state
  
  const handleValueChange = React.useCallback((val: string | string[]) => {
    if (!isControlled) {
      setState(val)
    }
    onValueChange?.(val)
  }, [isControlled, onValueChange])

  React.useEffect(() => {
    if (isControlled) {
      setState(value)
    }
  }, [isControlled, value])

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        type,
        collapsible
      }}
    >
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  trigger,
  children,
  className,
}) => {
  const { value: selectedValue, onValueChange, type, collapsible } = React.useContext(AccordionContext)
  
  const isOpen = type === "single"
    ? selectedValue === value
    : Array.isArray(selectedValue) && selectedValue.includes(value)
  
  const handleClick = () => {
    if (type === "single") {
      if (collapsible && selectedValue === value) {
        onValueChange(undefined);
      } else {
        onValueChange(value);
      }
    } else {
      onValueChange(
        isOpen
          ? (selectedValue as string[]).filter(v => v !== value)
          : [...(selectedValue as string[] || []), value]
      )
    }
  }

  return (
    <div className={cn("border-b", className)}>
      <AccordionTrigger 
        isOpen={isOpen} 
        onClick={handleClick}
      >
        {trigger}
      </AccordionTrigger>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </div>
  )
}

// Added these components for compatibility
const AccordionTrigger: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}> = ({ children, isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full"
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" 
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      />
    </button>
  );
};

const AccordionContent: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ children, isOpen }) => {
  return isOpen ? (
    <div className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  ) : null;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
