import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = props => {

  const { onUpdateUser, isOpen, onClose } = props;
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ 
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (

    <PopupWithForm 
      onClose={onClose}
      title = {'Редактировать профиль'} 
      name = {'profile'}
      buttonTitle = {'Сохранить'}
      onSubmit = {handleSubmit}
      isOpen = {isOpen} >        
        <div className="input-container">
          <input 
            id="profile-name-input" 
            name="editProfileName" 
            type="text" 
            className="popup__input popup__input_type_title" 
            required minLength="2" 
            maxLength="40" 
            // placeholder="Имя"
            value={name || ''}
            onChange = {handleNameChange}
          />
          <span className="profile-name-input-error error"></span>
        </div>
        <div className="input-container">
          <input 
            id="profile-job-input" 
            name="editProfileJob" 
            type="text" 
            className="popup__input popup__input_type_subtitle" 
            required minLength="2" 
            maxLength="200" 
            placeholder={description}
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="profile-job-input-error error"></span>
        </div>
      </PopupWithForm>
  )

}

export default EditProfilePopup;
