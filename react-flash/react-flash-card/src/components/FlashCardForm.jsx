import { useEffect, useState } from 'react';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Button from './Button';
import Error from './Error';

export default function FlashCardForm({
  createCard = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');
  useEffect(() => {
    if (createCard) {
      clearFields();
    }
  }, [createCard]);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }
  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }
  function clearFields() {
    setTitle('');
    setDescription('');
  }
  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      setError('');
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Invalid Submit!');
    }
  }
  function handleFormReset() {
    clearFields();
  }
  const backgroundClassName = createCard ? 'bg-red-100' : 'bg-yellow-100';
  return (
    <form
      className={`p-3  font-mono ${backgroundClassName}`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <div className="text-center">
        <strong>
          <i> Flash Card Register </i>
        </strong>
      </div>
      <TextInput
        labelDescription="Title:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription="Description"
        onTextAreaChange={handleDescriptionChange}
        textAreaValue={description}
      />
      <div className="flex items-center justify-end space-x-4 mr-1">
        <div className=" mr-auto text-yellow-900">
          <Error>{error}</Error>
        </div>
        <Button
          type="reset"
          colorClass="bg-blue-500"
          hoverClass="hover:bg-blue-700"
        >
          Reset
        </Button>
        <Button
          type="submit"
          colorClass="bg-red-500"
          hoverClass="hover:bg-red-700"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
