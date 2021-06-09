import React from 'react';

export default function Test(props) {
  console.log(props);
  return <div>teste</div>;
}
// exemplo de utilizar props
/* {<Test
        number={10}
        string="Teste"
        visible
        data={{ a: 1, b: 2 }}
        onClick={() => {
          console.log('click');
        }}
      />} */
