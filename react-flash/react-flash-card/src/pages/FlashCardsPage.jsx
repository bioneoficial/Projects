import FlashCard from '../components/FlashCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import RadioButton from '../components/RadioButton';
import {
  apiCreateFlashCard,
  apiDeleteFlashCard,
  apiEditFlashCard,
  apiGetAllFlashCards,
} from '../services/apiService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../services/idService';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createCard, setCreateCard] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);
  useEffect(() => {
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllCards();
  }, []);

  function handleShuffle() {
    const shuffleCards = helperShuffleArray(studyCards);
    setStudyCards(shuffleCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleRadioButtonDescriptionClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioButtonTitleClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }
  async function handleDeleteFlashCard(cardId) {
    try {
      await apiDeleteFlashCard(cardId);
      setAllCards(allCards.filter(card => card.id !== cardId));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setCreateCard(false);
    setSelectedTab(0);
    setSelectedFlashCard(card);
  }
  function handleNewFlashCard() {
    setCreateCard(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }
  async function handlePersist(title, description) {
    if (createCard) {
      try {
        const newFlashCard = await apiCreateFlashCard(title, description);
        setAllCards([...allCards, newFlashCard]);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await apiEditFlashCard(selectedFlashCard.id, title, description);
        setAllCards(
          allCards.map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );

        setSelectedFlashCard(null);
        setCreateCard(true);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-2">
      <Loading></Loading>
    </div>
  );
  if (error) {
    mainJsx = <Error>{error}</Error>;
  }
  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Register</Tab>
            <Tab>List</Tab>
            <Tab>Study</Tab>
          </TabList>
          <TabPanel>
            <div className="my-3">
              <Button onButtonClick={handleNewFlashCard}>New flash card</Button>
            </div>
            <FlashCardForm createCard={createCard} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <h2>
              <div className="text-center mb-3">
                <Button onButtonClick={handleShuffle}>Card Shuffler</Button>
              </div>
              <div className="flex flex-row items-center justify-center space-x-4 m-3">
                <RadioButton
                  id="ButtonShowTitle"
                  name="radioButtonName"
                  buttonChecked={radioButtonShowTitle}
                  onButtonClick={handleRadioButtonTitleClick}
                >
                  Show title
                </RadioButton>
                <RadioButton
                  id="ButtonShowDesc"
                  name="radioButtonName"
                  buttonChecked={!radioButtonShowTitle}
                  onButtonClick={handleRadioButtonDescriptionClick}
                >
                  Show Description
                </RadioButton>
              </div>
              <div className=" flex flex-row items-center justify-center space-x-4 m-3 text-lg font-mono font-semibold">
                JavaScript
              </div>
              <FlashCards>
                {studyCards.map(({ id, title, description, showTitle }) => {
                  return (
                    <FlashCard
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      showFlashCardTitle={showTitle}
                      onToggleFlashCard={handleToggleFlashCard}
                    />
                  );
                })}
              </FlashCards>
            </h2>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>react-flash-cards</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
