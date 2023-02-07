import React from "react";

type InitialSelectProps = Omit<React.HTMLProps<HTMLSelectElement>, "onChange">;

interface SelectProps extends InitialSelectProps {
  options: { title: string; value: string }[];
  topValue: string;
  onChange: (value: string) => void;
}

export const Select = ({ topValue, ...props }: SelectProps) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.currentTarget?.value);
  };

  return (
    <select {...props} onChange={onChange}>
      <option disabled value="">
        {topValue}
      </option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};
