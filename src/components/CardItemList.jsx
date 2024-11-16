import { CardItem } from './CardItem';
import GameData from '../app-mock';
import { useState } from 'react';

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]); // Card data
  const [selectedCards, setSelectedCards] = useState([]); // To store selected cards for matching

  const onClickHandler = (card) => {
    // If we already have 2 cards selected, don't allow more selections
    if (selectedCards.length === 2) return;

    // Toggle card visibility (show card image on click)
    const updatedCardList = cardList.map((item) => {
      if (item.id === card.id) {
        return { ...item, isOpen: true };
      }
      return item;
    });

    setCardList(updatedCardList); // Update card list state with the new card open status

    // Add clicked card to the selected cards
    const updatedSelectedCards = [...selectedCards, card];
    setSelectedCards(updatedSelectedCards);

    // Check if 2 cards are selected
    if (updatedSelectedCards.length === 2) {
      const [firstCard, secondCard] = updatedSelectedCards;

      if (firstCard.name === secondCard.name) {
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          const resetCardList = cardList.map((item) => {
            if (item.id === firstCard.id || item.id === secondCard.id) {
              return { ...item, isOpen: false };
            }
            return item;
          });
          setCardList(resetCardList);
          setSelectedCards([]);
        }, 500);
      }
    }
  };

  return (
    <div className='card-item-list'>
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={() => onClickHandler(item)}
            isOpen={item.isOpen}
          />
        );
      })}
    </div>
  );
};
