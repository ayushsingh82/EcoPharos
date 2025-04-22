import React from 'react';

export function Tabs({ defaultValue, ...props }) {
  const [value, setValue] = React.useState(defaultValue);
  
  return (
    <div {...props} data-value={value}>
      {React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child, {
            value,
            onValueChange: setValue,
          });
        }
        
        return child;
      })}
    </div>
  );
}

export function TabsList({ className, value, onValueChange, ...props }) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`} {...props}>
      {React.Children.map(props.children, child => {
        if (!React.isValidElement(child) || child.type !== TabsTrigger) return child;
        
        return React.cloneElement(child, {
          value,
          onValueChange,
        });
      })}
    </div>
  );
}

export function TabsTrigger({ className, value: tabValue, onValueChange, children, ...props }) {
  const handleClick = () => {
    if (onValueChange) {
      onValueChange(props.value);
    }
  };
  
  const isActive = tabValue === props.value;
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-muted hover:text-foreground'
      } ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value: tabValue, children, ...props }) {
  const isActive = tabValue === props.value;
  
  if (!isActive) return null;
  
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
} 