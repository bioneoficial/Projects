import React from 'react';
import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Label Description',
  inputValue = 'Input Value',
  onInputChange = null,
  id = getNewId(),
  autoFocus,
  maxLength = 100,
  minLength = 2,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }
  const currentCharacterCount = inputValue.length;
  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        autoFocus={autoFocus}
        id={id}
        className="border p-1 placeholder-gray-450 "
        placeholder="Insert Text Here"
        type="text"
        value={inputValue}
        maxLength={maxLength}
        minLength={minLength}
        onChange={handleInputChange}
      />
      <div className="text-right">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
