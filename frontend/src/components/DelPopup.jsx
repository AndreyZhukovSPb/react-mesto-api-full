import React from 'react';
import PopupWithForm from './PopupWithForm';

const DelPopup = props => {
  const { isOpen, onClose, onSubmit, card} = props;
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }  

  return(
    <PopupWithForm 
      onClose={onClose}
      title = {'Вы уверены?'} 
      name = {'del'}
      buttonTitle = {'Да'}
      isOpen = {isOpen}
      onSubmit = {handleSubmit}
    >
    </PopupWithForm>
  )
}

export default DelPopup;