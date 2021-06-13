const uuid = require('uuid').v4;
const fs = require('fs').promises;

const allFlashCards = [
  {
     title: 'Are names case sensitive?',
    description: 'Yes',
  },
  {
    title: 'Whats defensive semicolon?',
    description:
      'Semicolon at the start of the line to prevent accidental joining with previous statement',
  },
  {
    title: 'when whitespace in source can impact semantics?',
    description:
      'Newline may trigger automatic semicolon insertion, for example return statement must occupy only one line',
  },
  {
    title: 'can /* */ comments be nested?',
    description: 'No',
  },
  {
    title: 'let/var difference?',
    description: 'Let for a block level variables, var for a function level',
  },
]
  .map(item => {
    return { id: uuid(), ...item };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

async function start() {
  fs.writeFile(
    './flashcards.json',
    JSON.stringify({ flashcards: allFlashCards }, null, 2)
  );
}

start();
