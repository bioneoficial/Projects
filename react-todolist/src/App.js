import React, { useState } from 'react';
import Form from './components/Form';
import Section from './components/Section';
import List from './components/List';

const appTitle = 'React To-do';

function App() {

  const list = [
    {id:1, title: 'test #1', completed:false },
    { id:2, title: 'test #2',completed:false },
    { id:3, title: 'test #3',completed:false },
  ];
  
  const [toDoList, setToDoList] = useState(list);

  const addToDo = (item) => {
    setToDoList((prevList) => [...prevList, item]);
   };


const removeToDo = (id) => {
 setToDoList((prevList) => { prevList.filter((item) => item.id !== id)});
};

  return (
    <div className="ui container center aligned">
      <Section>
        <h1>{appTitle}</h1>
      </Section>
      <Section>
        <Form addToDo={addToDo} />
      </Section>
      <Section>
        <List list={toDoList} removeToDoPropList={removeToDo} />
      </Section>
    </div>
  );
}

export default App;
