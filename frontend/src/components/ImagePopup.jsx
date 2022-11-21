import React from 'react';

const ImagePopup = props => {
  const {card, onClose, isOpen} = props;
      return (
        <div className={`popup popup_type_element-photo ${card.src && isOpen ? "popup_opened" : ''}`}>
          <div className="popup__photo-container">
            <img 
              className="popup__photo" 
              src={card.src}
              alt={card.title}
            />
            <button 
              aria-label="Close" 
              type="button" 
              className="popup__close-button"
              onClick={onClose}
              >
            </button>
            <h2 className="popup__text">{card.title}</h2>
          </div>
        </div>
      )
    }
  
export default ImagePopup;