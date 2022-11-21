import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

const EditAvatarPopup = props => {

  const { onUpdateAvatar, isOpen, onClose } = props;
  const avatarRef = React.useRef();

  useEffect(()=>{
    avatarRef.current.value = ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm 
      onClose={onClose}
      title = {'Обновить аватар'} 
      name = {'edit-picture'}
      buttonTitle = {'Сохранить'}
      onSubmit = {handleSubmit}
      isOpen = {isOpen} >        
        <div className="input-container">
          <input 
            id="editProfilePicture-input" 
            ref = {avatarRef}
            name="link" 
            className="popup__input popup__input_type_subtitle" 
            placeholder="Ссылка на картинку" 
            required type="url" 
          />
          <span className="editProfilePicture-input-error error"></span>
        </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;