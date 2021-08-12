import React, { useState } from 'react';
//removeToDoItemProp
const Todo = ({ title, completed, removeToDo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [tempValue, setTempValue] = useState(title);
  const [complete, setComplete] = useState(completed);

  const handleDivDoubleClick = () => {
    setIsEdit(true);
  };

  const handleInputOnChange = e => {
    setTempValue(e.target.value);
  };

  const handleInputKeyDown = e => {
    const key = e.keyCode;

    if (key === 13) {
      setInputValue(tempValue);
      setIsEdit(false);
    } else if (key === 27) {
      setTempValue(inputValue);
      setIsEdit(false);
    }
  };

const handleBtnClick = () => {
  setComplete((prevComplete) => !prevComplete);
};



  return (
    <div className="row" >
      {isEdit ? (
        <div className="column six wide">
          <div className="ui input fluid">
            <input
              value={tempValue}
              onChange={handleInputOnChange}
              onKeyDown={handleInputKeyDown}
              autoFocus={true}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="column five wide" onDoubleClick={handleDivDoubleClick}>
            <h2 className={'ui header' + (complete ? ' green' : '')}>{inputValue}</h2>
          </div>
          <div className="column one wide">
            <button onClick={handleBtnClick}
            className={"ui button circular icon" + (complete ? ' yellow' : ' green')}>
              <i className=" check icon"></i>
            </button>
          </div>
          <div className="column one wide"> 
            <button className="ui button circular icon red" onClick={removeToDo}>
              <i className=" remove icon"></i>
            </button>
          </div>
        </>
      )}
    </div>//removeToDoItemProp
  );
}; 

export default Todo;
