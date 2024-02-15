"use client";

export default function TabButton({
  onClick,
  isActive,
  children,
  className,
  ...props
}) {
  const activeClass = isActive ? "bg-active-action-tab" : "";
  return (
    <button
      onClick={onClick}
      {...props}
      className={`rounded-md px-3 py-1 font-bold transition-colors ${!isActive && "hover:text-primary"} ${className} ${activeClass}`}
    >
      {children}
    </button>
  );
}
