import { useState, useEffect, useCallback } from 'react'
import Card from './components/Card.jsx'
import Scoreboard from './components/Scoreboard.jsx'
import './styles/style.css'

function App() {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);


  // Function to shuffle an array (Fisher-Yates algorithm)
  // useCallback需要学一下
  const shuffleArray = useCallback((array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }, []);

  // Fetch Pokémon data from the API when the component mounts
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonCount = 12;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}&offset=${Math.floor(Math.random() * 150)}`);
      const data = await response.json();

      // Fetch details for each Pokémon to get their images
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return {
            id: detailData.id,
            name: detailData.name,
            image: detailData.sprites.front_default,
          };
        })
      );
      setCards(shuffleArray(pokemonDetails));
    };
    fetchPokemon();
  }, [shuffleArray])


  const handleCardClick = (id) =>{
    if(clickedCards.includes(id)) {
      if(currentScore > bestScore){
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCards([]);
    }
    else{
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedCards([...clickedCards,id]) 
    }

      // Shuffle cards after every click
    setCards(shuffleArray(cards));
  };
  // Render the main game UI
  return (
    <>
      <div className='app'>
        <div className='container'>
          <Scoreboard currentScore={currentScore} bestScore={bestScore} />
          <div className='cars-grid'>
            {cards.map((card) => (
              <Card key={card.id} card={card} onCardClick={handleCardClick} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App
