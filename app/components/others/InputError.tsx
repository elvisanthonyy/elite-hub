import React from "react";

interface ChildProps {
  message: string | undefined;
}

const InputError = ({ message }: ChildProps) => {
  return (
    <div className={`text-red-500 text-[14px] text-left w-full px-2 mb-2`}>
      {message}
    </div>
  );
};

export default InputError;
