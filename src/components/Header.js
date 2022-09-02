import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  expensesSum = (expense) => (
    expense.reduce((acc, curr) => {
      const { currency } = curr;
      return acc + (curr.value * curr.exchangeRates[currency].ask);
    }, 0)
  );

  render() {
    const { email, expense } = this.props;
    // const NO_MONEY = 0;
    // const total = expense.length !== 0 ? this.expensesSum(expense) : NO_MONEY;
    const total = expense.length === 0 ? 0 : this.expensesSum(expense);

    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ total.toFixed(2) }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
