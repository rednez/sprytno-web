import {
  CheckboxProps,
  Chip,
  VisuallyHidden,
  tv,
  useCheckbox,
} from '@heroui/react';

const CheckIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export const CustomCheckbox = (props: CheckboxProps) => {
  const checkbox = tv({
    slots: {
      base: 'border-1 hover:bg-default-200',
      content: 'text-default-500 text-sm',
    },
    variants: {
      isSelected: {
        true: {
          base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
          content: 'text-primary-foreground pl-1',
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-solid outline-transparent ring-2 ring-focus ring-offset-2 ring-offset-background',
        },
      },
    },
  });

  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  );
};
