import React from 'react';
import Header from './Header';
import Form from './Form';
import { Link } from 'react-router-dom';


const Register = props => {
  const { onRegister } = props;
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  
  function handleSubmit (e) {
    e.preventDefault();
    const {email, password} = state;
    onRegister(email, password);
  }

  function handleChange (e) {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value
      })
    );
  }
  
  return (
    <div>
      <Header
        title = {'Войти?'}
        link={'/sing-in'}
      />
      <div className="preLoggedScreen">
        <h2 className="popup__title popup__title_type_sing">Регистрация</h2>
        <Form
          name={'sing'}
          buttonTitle={'Зарегистрироваться'}
          onSubmit={handleSubmit}
        >
          <div className="input-container">
          <input 
            id="user-email" 
            name="email" 
            type="email" 
            className="popup__input popup__input_type_sing" 
            required minLength="2" 
            maxLength="40" 
            placeholder="Email"
            onChange={handleChange}
            // value={''}
            // onChange = {handleNameChange}
          />
          <span className="profile-name-input-error error"></span>
        </div>
        <div className="input-container">
          <input 
            id="user-password" 
            name="password" 
            type="password" 
            className="popup__input popup__input_type_sing" 
            required minLength="2" 
            maxLength="200" 
            placeholder="Пароль"
            onChange={handleChange}
            // onChange={handleDescriptionChange}
          />
          <span className="profile-job-input-error error"></span>
        </div>
        </Form>
        <div className='register__link-container'>
          <p className='register__subtitle'>Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link"> Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;