import { useEffect, useState } from 'react';
import { getNewId } from './components/services/idService';
import DateInput from './components/DateInput';
import Header from './components/Header';
import Main from './components/Main';
import TextInput from './components/TextInput';
import { getAgeFrom } from './helpers/dateHelpers';
import Timer from './components/Timer';
import CheckboxInput from './components/Checkboxinput';
import OnlineOffline from './components/OnlineOffline';

export default function App() {
  const [name, setName] = useState('Joao Bione');
  const [birthDate, setBirthDate] = useState('1994-02-11');
  const [showTimer, setShowTimer] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    function toggleOnline() {
      setIsOnline(true);
    }
    function toggleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', toggleOnline);
    window.addEventListener('offline', toggleOffline);
    return () => {
      window.removeEventListener('online', toggleOnline);
      window.removeEventListener('offline', toggleOffline);
    };
  }, []);
  function handleNameChange(newName) {
    setName(newName);
  }
  function toggleShowTimer() {
    setShowTimer(currentShowTimer => !currentShowTimer);
  }
  function handleBirthDateChange(newBirthDate) {
    setBirthDate(newBirthDate);
  }

  return (
    <>
      <Header size="large">react-hello</Header>
      <Main>
        <OnlineOffline isOnline={isOnline} />
        {showTimer && (
          <div className="text-right mt-1">
            <Timer />
          </div>
        )}

        <CheckboxInput
          labelDescription="Show Timer"
          onCheckboxChange={toggleShowTimer}
        />

        <TextInput
          id={getNewId()}
          labelDescription="Type your name:"
          inputValue={name}
          onInputChange={handleNameChange}
          autoFocus
        />
        <DateInput
          id={getNewId()}
          labelDescription="Type your BirthDate:"
          inputValue={birthDate}
          onInputChange={handleBirthDateChange}
        />
        <p>
          Your name is {name},with {name.length} caracters and youre{' '}
          {getAgeFrom(birthDate)} years old
        </p>
      </Main>
    </>
  );
}
