import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const verifyLogin = async () => {
    const NUM = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > NUM;
    const btnState = verifyEmail && verifyPassword;
    setDisabled(!btnState);
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    verifyLogin();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    verifyLogin();
  };

  useEffect(() => {
    verifyLogin();
  });

  const handleSubmit = () => {
    const user = { email };
    verifyLogin();
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div>
      <form
        onSubmit={ handleSubmit }
      >
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ handleEmail }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Password"
            name="password"
            value={ password }
            onChange={ handlePassword }
          />
        </div>
        <div>
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ disabled }
          >
            Enter

          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
