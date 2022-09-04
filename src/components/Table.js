import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

const TABLE_HEADS = ['Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class Table extends Component {
  renderTableHeads = () => (
    <thead>
      <tr>
        { TABLE_HEADS.map((head) => <th key={ head }>{ head }</th>)}
      </tr>
    </thead>
  );

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div>
        <table>
          { this.renderTableHeads() }
          <tbody>
            { expenses.map((expense) => {
              const { description, tag, method, value, id } = expense;
              const cambio = expense.exchangeRates[expense.currency].ask;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>{Number(cambio).toFixed(2)}</td>
                  <td>
                    {
                      (Number(cambio) * value).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => dispatch(editExpense(expense.id)) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpense(expense.id)) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
