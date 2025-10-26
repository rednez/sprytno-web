'use client';

import { CheckboxGroup } from '@heroui/checkbox';
import { Input } from '@heroui/input';
import { NumericFormat } from 'react-number-format';
import { CustomCheckbox } from './custom-checkbox';

export function TasksFilters({
  distance,
  onChangeTaskType,
  onChangeDistance,
}: {
  distance: number;
  onChangeTaskType: (type: 'all' | 'offers' | 'requests') => void;
  onChangeDistance: (distance: number) => void;
}) {
  function handleChangeDistance(e: React.BaseSyntheticEvent) {
    onChangeDistance(Number(e.target.value));
  }

  function handleChangeType(values: string[]) {
    if (values.length === 0 || values.length === 2) {
      onChangeTaskType('all');
    } else {
      onChangeTaskType(values[0] as 'offers' | 'requests');
    }
  }

  return (
    <div className="flex xs:flex-col sm:flex-row items-center justify-center pb-3 gap-2">
      <NumericFormat
        value={distance}
        customInput={Input}
        label="Distance, meters"
        size="sm"
        className="w-40"
        maxLength={8}
        onChange={handleChangeDistance}
      />

      <CheckboxGroup
        defaultValue={['offers', 'requests']}
        orientation="horizontal"
        onChange={handleChangeType}
      >
        <CustomCheckbox value="offers">Offers</CustomCheckbox>
        <CustomCheckbox value="requests">Requests</CustomCheckbox>
      </CheckboxGroup>
    </div>
  );
}
