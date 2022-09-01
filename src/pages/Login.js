import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        buttonDisabled: !this.renderButton(),
      });
    });
  };

  handleEmail = (email) => {
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    // regex para validação de e-mail: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    return emailRegex.test(email);
  };

  handlePassword = (password) => {
    const MIN_PASSWORD_LENGTH = 6;
    return password.length >= MIN_PASSWORD_LENGTH;
  };

  renderButton = () => {
    const { email, password } = this.state;
    return this.handleEmail(email) && this.handlePassword(password);
  };

  logIn = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(setLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div>
        <div>
          <p>
            Login
          </p>
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            placeholder="Digite o seu e-mail"
            value={ email }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <button
            type="button"
            onClick={ this.logIn }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
