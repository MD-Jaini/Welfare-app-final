import { useState } from "react";

export function Tabs({ defaultValue, children, className }) {
  const [value, setValue] = useState(defaultValue);
  const context = { value, setValue };
  return <div className={className}>{children.map(child => {
    return typeof child.type === 'function' ? child.type.name === 'TabsList' ? 
      React.cloneElement(child, { context }) : child : child;
  })}</div>;
}

export function TabsList({ children, context, className }) {
  return <div className={className}>{children.map(child =>
    React.cloneElement(child, { context }))}</div>;
}

export function TabsTrigger({ value, context, children }) {
  const active = context.value === value;
  return (
    <button
      onClick={() => context.setValue(value)}
      className={`px-4 py-2 border ${active ? "bg-gray-200" : ""}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}