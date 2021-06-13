import {
  getFlashCard,
  deleteFlashCard,
  createFlashCard,
  editFlashCard,
} from './httpService';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await getFlashCard('/flashcards');
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await deleteFlashCard(`/flashcards/${cardId}`);
}
export async function apiCreateFlashCard(title, description) {
  const newFlashCard = createFlashCard('/flashcards', {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}
export async function apiEditFlashCard(cardId, title, description) {
  const updateFlashCard = editFlashCard(`/flashcards/${cardId}`, {
    id: getNewId(),
    title,
    description,
  });
  return updateFlashCard;
}
