import React from 'react';

export default function CheckboxInput({
  labelDescription = 'Descrição do checkbox',
  inputValue = 'Valor padrão do input',
  onCheckboxChange = null,
  id = 'id_do_input_checkbox',
}) {
  function handleCheckboxChange() {
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  }
  return (
    <div className="flex flex-row  items-center space-x-2 my-4">
      <input
        id={id}
        className="border p-1"
        type="checkbox"
        value={inputValue}
        onChange={handleCheckboxChange}
      />
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
    </div>
  );
}
