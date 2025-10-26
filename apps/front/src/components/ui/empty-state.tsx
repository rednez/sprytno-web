export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div
        className="border rounded-lg bg-orange-100 border-orange-200 
                dark:bg-orange-900 dark:border-orange-700 dark:opacity-80 
                px-5 py-3"
      >
        {children}
      </div>
    </div>
  );
}
