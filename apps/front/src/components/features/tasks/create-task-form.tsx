'use client';

import { createTask } from '@/actions/tasks';
import { CustomCheckbox, TaskMap } from '@/components/ui';
import { useMyTasks } from '@/hooks/tasks';
import { TaskDay } from '@/types';
import {
  addToast,
  Button,
  CheckboxGroup,
  Form,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const daysOptions: Array<{ value: TaskDay; label: string }> = [
  { value: 'sun', label: 'Sunday' },
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
];

export function CreateTaskForm({
  googleMapsApiKey,
  googleMapsMapId,
}: {
  googleMapsApiKey: string;
  googleMapsMapId: string;
}) {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'request' | 'offer' | null>(null);
  const [repeatedDays, setRepeatedDays] = useState<string[]>([]);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { refetch } = useMyTasks();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (position) {
      const { error } = await createTask({
        title,
        description: description,
        type: type!,
        repeatedDays: repeatedDays as TaskDay[],
        location: { lat: position.lat, lng: position.lng },
      });

      if (error) {
        if (error.details.hasFields) {
          setFormErrors(error.details.fields);
        } else {
          addToast({
            title: 'Failed operation',
            description: error.message,
            color: 'warning',
          });
        }
      } else {
        await refetch();

        addToast({
          title: 'Task created',
          description: 'Your task has been successfully created',
          color: 'success',
          timeout: 3000,
        });

        router.back();
      }
    } else {
      const mapEl = document.getElementById('task-map');
      if (mapEl) {
        mapEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  function click() {
    setCounter(counter + 1);
  }

  return (
    <Form
      className="flex flex-col gap-7"
      validationErrors={formErrors}
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col gap-4">
        <Input
          value={title}
          name="title"
          isRequired
          label="Title"
          labelPlacement="outside"
          placeholder="Enter task title"
          minLength={5}
          maxLength={200}
          type="text"
          onValueChange={setTitle}
        />

        <Textarea
          value={description}
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter task description"
          type="text"
          minLength={10}
          maxLength={1000}
          onValueChange={setDescription}
        />
      </div>

      <RadioGroup
        value={type}
        name="type"
        isRequired
        label="Select task type"
        description="Set Request if you need help, or Offer if you can help others"
        orientation="horizontal"
        onValueChange={(value) => setType(value as 'request' | 'offer')}
      >
        <Radio value="request">Request</Radio>
        <Radio value="offer">Offer</Radio>
      </RadioGroup>

      <CheckboxGroup
        value={repeatedDays}
        name="repeatedDays"
        label="Select days the task will repeat"
        description="Don't select anything for daily repetition"
        orientation="horizontal"
        onChange={setRepeatedDays}
      >
        {daysOptions.map((day) => (
          <CustomCheckbox
            key={day.value}
            value={day.value}
          >
            {day.label}
          </CustomCheckbox>
        ))}
      </CheckboxGroup>

      <div
        id="task-map"
        className="w-full"
      >
        <div className="flex gap-0.5">
          <div
            className={`text-base text-foreground-500
            ${!position && submitted ? 'text-rose-500' : ''}`}
          >
            Select task location
          </div>
          <div className="text-rose-600">*</div>
        </div>
        <div
          className={`text-sm text-foreground-400 mb-2
            ${!position && submitted ? 'text-rose-500' : ''}`}
        >
          Click on the map to a location. The task location will be used on
          search nearby tasks
        </div>
        <div className="h-100 rounded-2xl overflow-hidden">
          <TaskMap
            apiKey={googleMapsApiKey}
            googleMapsMapId={googleMapsMapId}
            onSetPosition={setPosition}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full sm:max-w-sm sm:self-center mt-1"
      >
        Save
      </Button>
    </Form>
  );
}
