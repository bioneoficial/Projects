import React from 'react';
import { getNewId } from '../services/idService';
//ELE N TROCOU O TEXTINPUT POR ARE NA FUNCTION
export default function TextArea({
  labelDescription = 'Label Description',
  textAreaValue = 'Textarea Value',
  onTextAreaChange = null,
  id = getNewId(),
  rows = 4,
  maxLength = 220,
  minLength = 2,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }
  const currentCharacterCount = textAreaValue.length;
  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        id={id}
        className="border p-1 placeholder-gray-450 "
        placeholder="Insert Text Here"
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
      <div className="text-right">
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
