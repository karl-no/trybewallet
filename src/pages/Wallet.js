import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        TrybeWallet
        { editor ? <EditExpense /> : <WalletForm /> }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
