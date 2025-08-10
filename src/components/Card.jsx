const Card = ({ card, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(card.id)}>
      <img
        src={card.image}
        alt={card.name}
        className="card-image"
        // Fallback image in case the API image fails to load
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/f87171/ffffff?text=${card.name.charAt(0).toUpperCase()}`; }}
      />
      <p className="card-name">{card.name}</p>
    </div>
  );
};

export default Card;