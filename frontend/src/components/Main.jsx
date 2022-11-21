import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = props => {
  const {onCardLike, onCardDelete, cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick } = props;
  const userData = React.useContext(CurrentUserContext);

  return ( 
    <>
      <main className="content">
        <section className="profile page__profile">
          <img 
          className="profile__avatar" 
          alt="Кусто" 
          onClick={onEditAvatar}
          src={userData.avatar}
          />
          <div className="profile__title-box">
            <h1 className="profile__title">{userData.name}</h1>
            <button 
              aria-label="Edit" 
              type="button" 
              className="profile__edit-button"
              onClick={onEditProfile}
            >
            </button>
            <p className="profile__subtitle">{userData.about}</p>
          </div>
          <button 
            aria-label="Add" 
            type="button" 
            className="profile__add-button"
            onClick={onAddPlace}
            >
            </button>
        </section>
        <section className="elements page__elements">
          
          {cards.map((card) => (
            <div key={card._id} className="element">
              <Card 
                title={card.name}
                src={card.link}
                alt={card.name}
                likes={card.likes}
                onCardClick={onCardClick}
                _id={card._id}
                cardOwnerId={card.owner}
                onDelClick={onCardDelete}
                onCardLike={onCardLike}
                likesCounter={card.likes.length}
              />
            </div>  
          ))} 

        </section>


      </main>
    </>
  )}

export default Main;