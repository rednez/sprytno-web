import { FaRepeat } from 'react-icons/fa6';

const Day = ({ children }: { children: React.ReactNode }) => (
  <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 py-0.5 px-1">
    <div className="text-xs text-gray-500 dark:text-gray-400">{children}</div>
  </div>
);

export function TaskRepeatingInfo({
  repeatedDays,
}: {
  repeatedDays: string[];
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-gray-500">
        <FaRepeat />
      </div>

      {repeatedDays.length ? (
        <div className="flex flex-wrap gap-2">
          {repeatedDays.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </div>
      ) : (
        <Day>daily</Day>
      )}
    </div>
  );
}

export default TaskRepeatingInfo;
