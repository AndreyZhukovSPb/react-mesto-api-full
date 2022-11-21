import React from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = props => {
  const { onClose, isOpen, onAddPlace} = props;

  const [place, setPlace] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  useEffect(()=>{
    setPlace('');
    setPlaceLink('');
  }, [isOpen])

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(place, placeLink);
  }

  return (
    <PopupWithForm 
      onClose={onClose}
      title = {'Новое место'} 
      name = {'element'}
      buttonTitle = {'Создать'}
      onSubmit = {handleSubmit}
      isOpen = {isOpen} >        
        <div className="input-container">
          <input 
            id="element-name-input" 
            name="name" 
            type="text" 
            className="popup__input popup__input_type_title" 
            placeholder="Название" 
            required minLength="2" 
            maxLength="30" 
            onChange = {handlePlaceChange}
            value={place}
          />
          <span className="element-name-input-error error"></span>
        </div>
        <div className="input-container">
          <input 
            id="element-link-input" 
            name="link" 
            className="popup__input popup__input_type_subtitle" 
            placeholder="Ссылка на картинку" 
            required type="url" 
            onChange = {handlePlaceLinkChange}
            value={placeLink}
          />
          <span className="element-link-input-error error"></span>
        </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;