import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  color?: string;
  id?: string;
  placeholder?: string;
  register: any;
  errors: any;
  name: string;
  validationSchema: any;
}

export function Input(props: InputProps) {
  const {
    value,
    onChange,
    color = 'blue',
    id,
    placeholder = 'Standard',
    register,
    errors,
    name,
    validationSchema,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputColor, setInputColor] = useState<string>(color);

  useEffect(() => {
    setInputColor(color === 'green' ? 'green' : 'blue');
  }, [color]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const InputField = register(name, validationSchema);

  return (
    <>
      <div className="  h-8 w-64">
        <label className="relative justify-center items-center">
          <div className="">
            <input
              data-testid="input-element"
              type="text"
              value={value}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name={name}
              {...InputField}
              onChange={(e) => {
                InputField.onChange(e);
                handleInputChange(e);
              }}
              className={clsx(
                'peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 hover:border-b-slate-800 hover:border-b-2 focus:border-b-2',
                {
                  'border-b-green-500': isFocused && inputColor === 'green',
                  'border-b-blue-500': isFocused && inputColor === 'blue',
                  'border-b-slate-500': !isFocused,
                }
              )}
              id={id}
              color={color}
              placeholder={placeholder}
            />

            <div
              className={clsx(
                'absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-blue-500'
              )}
            >
              {placeholder}
            </div>
          </div>
        </label>
      </div>

      {errors[name] && (
        <span className="text-red-500 text-sm mt-1 ml-1">
          Input must be between 4 and 8 characters and contain only letters
        </span>
      )}
    </>
  );
}
