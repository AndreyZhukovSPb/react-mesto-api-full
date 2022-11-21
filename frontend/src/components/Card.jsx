import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = props => {

  const userData = React.useContext(CurrentUserContext);
  const userId = userData._id;
  const {title, src, alt, likes, onCardClick, cardOwnerId, onDelClick, onCardLike, likesCounter} = props;

  function handleLikeClick() {
    onCardLike(props);
  }  

  function handleDeleteClick() {
    onDelClick(props)
  }

  function handleClick() {
    onCardClick(props);
  }  

  return ( 
    <>
      <img 
        className="element__photo" 
        src={src}
        alt={alt}
        onClick={handleClick}
      />
      <div className="element__title">
        <h2 className="element__place">{title}</h2>
        <div className="element__like-container">
          <button 
            aria-label="Like" 
            type="button" 
            className={`
              element__like 
              ${likes.some(i => i === userId) ? "element__like_active" : ''}
              `}
            onClick={handleLikeClick}
            >  
          </button>
          <span className="element__like-counter">{likesCounter}</span>
        </div>  
      </div>
      <button 
        aria-label="Delete" 
        type="button" 
        className = {`element__del-button ${userId=== cardOwnerId ? "element__del-button_enable" : ''}`}
        onClick={handleDeleteClick}
        >  
      </button>
    </>    
  )}

export default Card;