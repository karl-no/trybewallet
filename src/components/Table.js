import React, { Component } from 'react';

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
    <table>
      <tr>
        { TABLE_HEADS.map((head) => <th key={ head }>{ head }</th>)}
      </tr>
    </table>
  );

  render() {
    // const { expenses } = this.props;
    return (
      <div>
        <table>
          { this.renderTableHeads() }
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
