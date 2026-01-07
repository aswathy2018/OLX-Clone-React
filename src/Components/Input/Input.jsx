import React from 'react'

export const Input = ({ value, setInput, placeholder, error }) => {
  return (
    <div className='pt-2 w-full relative'>
      <input
        value={value}
        onChange={(event) => setInput(event.target.value)}
        type="text"
        className={`w-full border-2 rounded-md p-3 pt-4 pb-2 focus:outline-none
          ${error ? 'border-red-500' : 'border-black'}`}
      />
      <label className='absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm'>
        {placeholder}
      </label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
