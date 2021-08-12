import React, { useState } from 'react';

const Form = ({ addToDo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    addToDo({ title: inputValue, complete: false });
  };

  return (
    <form className="ui form" onSubmit={handleFormSubmit}>
      <div className="ui grid center aligned">
        <div className="row">
          <div className="column four wide">
            <input
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              placeholder="Type Your Activity"
            />
          </div>
          <div className="column one wide">
            <button type="submit" className="ui button circular icon green">
              <i className="plus icon"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
