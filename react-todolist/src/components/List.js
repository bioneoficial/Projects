import React from 'react';
import Todo from './Todo';
// pro list ao inves de todo?
const List = ({list, removeToDoProp}) => {
  const renderedList = list.map((item) => <Todo completed={item.completed} title={item.title} key={item.title} removeToDo={(e) => removeToDoProp(item.id)} />);
return (
<div className='ui grid center aligned'>
  {renderedList}
</div>
);
};

export default List;