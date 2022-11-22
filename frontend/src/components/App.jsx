import React from 'react';
import { useEffect } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../index.css'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelPopup from './DelPopup';
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfitmPopupOpen, setIsConfitmPopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([])
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  useEffect(()=>{
    if (!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    auth.checkToken(jwt)
      .then(data => {
        if(!data.data) {
          return Promise.reject ('No data');
        } 
        setEmail(data.data.email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch(err=>{
        console.log(err)
      });
  }, [])

  useEffect(()=>{
    if(isLoggedIn) {
      api.getHeroData()
        .then(data => {
          setCurrentUser(data);
        })
        .catch((err)=>{
          console.log(err);
        });
    }
  }, [isLoggedIn])

  useEffect(()=>{
    if(isLoggedIn) {
      api.getnItialCards()
        .then(data => {
          setCards(data);
      })
        .catch((err)=>{
          console.log(err);
        });
    }
  }, [isLoggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); 
      })
      .catch((res) =>{
        console.log(res);
      })
  }

  function handleCardDelete(card) {
    closeAllPopups();
    api.removeCard(card._id)
      .then(()=>{
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfoServer(name, about)
      .then((data) =>{
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function handleAddPlaceSubmit (place, placeLink) {
    api.sendCard(place, placeLink)
      .then((data) =>{
        closeAllPopups();
        setCards([data, ...cards]); 
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function handleCardClick(card){
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  function handleDelClick(card){
    setIsDelPopupOpen(true);
    setSelectedCard(card);
  };
  
  function handleUpdateAvatar(link) {
    api.setUserAvatarServer(link)
      .then((data) =>{
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  };

  function handleConfirmPoopup(){
    setIsConfitmPopupOpen(true);
  };

  function handleErrorPopup(){
    setIsErrorPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDelPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsConfitmPopupOpen(false);
    setIsErrorPopupOpen(false);
  };

  function handleConfirmPopupClose () {
    closeAllPopups();
    history.push('/sing-in');
  }

  function handleReg (password, email) {
    auth.singUp(password, email)
      .then((data) =>{
        // if(!data.data) {
        if(!data._id) {
          handleErrorPopup();
          return Promise.reject ('No data');
        } 
      })
      .then(()=>{
        handleConfirmPoopup();
      })
      .catch(err => { 
        console.log(err);
      })
  }

  function handleLogin (email, password) {
    auth.singIn(email, password)
      .then(res =>{
        if (res.data) {
          localStorage.setItem('jwt', res.data);
          setEmail(email);
          api.setToken(res.data);
          setIsLoggedIn(true);
          history.push('/');
        } else {
          handleErrorPopup();
          return;
        }
      })
      .catch(err =>{
        console.log(err);
      })
  }

  function onSingOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setIsLoggedIn(false);
  }

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
            <Header 
              title = {'Выйти'}
              link={'/sing-in'}
              userEmail={email}
              onClick={onSingOut}
            />
            <Main 
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete={handleDelClick}
            />
            <Footer />
          </ProtectedRoute>

          <Route path='/sing-up'>
            <Register 
              onRegister={handleReg}
            />
          </Route>
          <Route path='/sing-in'>
            <Login 
            onLogin={handleLogin}
            onLogBad={handleErrorPopup}
            />
          </Route> 
        </Switch>

        <InfoTooltip
          isOpen={isConfitmPopupOpen}
          type={'good'}
          message={'Вы успешно зарегистрировались'}
          onClose={handleConfirmPopupClose}
        />

        <InfoTooltip 
          isOpen={isErrorPopupOpen}
          type={'bad'}
          message={'Что-то пошло не так! Попробуйте ещё раз.'}
          onClose={closeAllPopups}
        />
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          onClose={closeAllPopups} 
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          onClose={closeAllPopups} 
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DelPopup
          isOpen={isDelPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card= {selectedCard}
        />
      
      </CurrentUserContext.Provider>

    </div>
  )
};

export default App;