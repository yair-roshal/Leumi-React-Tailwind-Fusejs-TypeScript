import clsx from 'clsx';
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  ripple?: boolean;
  color?: string;
  onChange: (newValue: boolean) => void;
  name: string;
  register: any;
  errors: any;
  validationSchema: any;
  children?: React.ReactNode;
}

export function Checkbox(props: CheckboxProps) {
  const {
    checked,
    onChange,
    children,
    color = 'blue',
    ripple = true,
    name,
    register,
    errors,
    validationSchema,
  } = props;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const CheckboxField = register(name, validationSchema);

  return (
    <>
      <div className=" h-8 w-64">
        <label className="inline-flex items-center mx-auto w-64">
          <div
            className={clsx('inline-flex relative justify-center items-center cursor-pointer group', 'md:text-red-500')}
          >
            <input
              data-testid="checkbox-element"
              type="checkbox"
              checked={checked}
              className="peer sr-only"
              color={color}
              id={name}
              name={name}
              {...CheckboxField}
              onChange={(e) => {
                CheckboxField.onChange(e);
                handleCheckboxChange(e);
              }}
            />

            <div
              className={clsx('h-6 w-6 bg-gray-100 border-gray-500 border-3 rounded', {
                'peer-checked:bg-blue-500 peer-checked:border-blue-500': color === 'blue',
                'peer-checked:bg-green-500 peer-checked:border-green-500': color === 'green',
              })}
            ></div>
            <div
              className={clsx(
                'absolute scale-0 transition-transform origin-center shadow-stone-700  pb-1 left-0 w-6 h-6 flex justify-center items-center',
                'hover:ease-in peer-checked:scale-110'
              )}
            >
              <div className="w-2 h-4 rotate-45 border-b-2 border-r-2 border-white"></div>
            </div>
            <div className="ml-3"></div>
            <div className={clsx('absolute left-[-8px] scale-0', 'group-hover:scale-125 group-hover:-z-20')}>
              <div className="left-2 rounded-full h-10 w-10 bg-blue-50"></div>
            </div>
            <div
              className={clsx('absolute left-0 scale-0 ', {
                'group-active:scale-100 group-active:-z-20 ': ripple,
              })}
            >
              <div className="animate-ping-slow h-6 w-6 rounded-full bg-gray-300 opacity-100 "></div>
            </div>
          </div>
          {children}
        </label>
      </div>

      {errors[name] && <span className="text-red-500 text-sm mt-1 ml-1">Checkbox is required</span>}
    </>
  );
}
