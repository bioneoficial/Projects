import React from 'react';

export default function DateInput({
  labelDescription = 'Descrição do label',
  inputValue = '1994-02-11',
  onInputChange = null,
  id = 'id_do_input_date',
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }
  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        id={id}
        className="border p-1"
        type="date"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
