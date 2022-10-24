import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <div>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Email"
            name="email"
            /* value={ email } */
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Password"
            name="password"
            /* value={ password } */
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Enter

          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
