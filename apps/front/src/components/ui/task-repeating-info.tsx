import { TaskDay } from '@/types';
import { FaRepeat } from 'react-icons/fa6';

const daysFullMap = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};

const daysShortMap = {
  sun: 'Sun',
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
};

const Day = ({ day, isFull = false }: { day?: TaskDay; isFull?: boolean }) => {
  const dayLabel = () =>
    isFull ? daysFullMap[day as TaskDay] : daysShortMap[day as TaskDay];

  return (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 py-0.5 px-1">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {day ? dayLabel() : 'Daily'}
      </div>
    </div>
  );
};

export function TaskRepeatingInfo({
  repeatedDays,
  isFull = false,
}: {
  repeatedDays: TaskDay[];
  isFull?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs text-gray-500">
        <FaRepeat />
      </div>

      {repeatedDays.length ? (
        <div className="flex flex-wrap gap-2">
          {repeatedDays.map((day) => (
            <Day
              key={day}
              day={day}
              isFull={isFull}
            />
          ))}
        </div>
      ) : (
        <Day />
      )}
    </div>
  );
}

export default TaskRepeatingInfo;
