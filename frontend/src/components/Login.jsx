import React from 'react';
import Header from './Header';
import Form from './Form';

const Login = props => {
  const { onLogin } = props;
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  
  function handleSubmit (e) {
    e.preventDefault();
    const {email, password} = state;
    onLogin(email, password);
    
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
        title = {'Зарегистрироваться?'}
        link={'/sing-up'}
      />
      <div className="preLoggedScreen">
        <h2 className="popup__title popup__title_type_sing">Вход</h2>
        <Form
          name={'sing'}
          buttonTitle={'Войти'}
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
          />
          <span className="profile-job-input-error error"></span>
        </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;