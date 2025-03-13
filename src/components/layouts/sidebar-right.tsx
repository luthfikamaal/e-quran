export default function SidebarRight({
  className,
  ...props
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`min-h-screen border-l border-r pt-20 px-4 border-dashed border-gray-400 ${
        className || ""
      }`}
      {...props}
    >
      <div className="border border-dashed border-gray-400 px-4 py-2 rounded-sm">
        <h1 className="font-semibold">Hello World</h1>
      </div>
    </div>
  );
}
