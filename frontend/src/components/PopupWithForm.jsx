import React from 'react';
import Form from './Form';

const PopupWithForm = props => {
  const {title, name, buttonTitle, children, isOpen, onClose, onSubmit} = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`} >  
      <div className={`popup__container popup__container_type_${name}`}>
        <button 
          aria-label="Close" 
          type="button" 
          className="popup__close-button"
          onClick={onClose}
        >
        </button>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <Form
          buttonTitle={buttonTitle}
          children={children}
          onSubmit={onSubmit}
          name={name}
        />      
      </div>
    </div>
  )
}

export default PopupWithForm;