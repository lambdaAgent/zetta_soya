import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import style from './Table.css';

class Table extends React.Component {
  render() {
    const className = ClassNames({
      [style['table']] : true,
      [style['table-responsive']] : true,
      [style['table-striped']] : this.props.striped,
      [style['table-hover']] : this.props.hover,
    });
    let customStyle = null;
    if (this.props.tableHeight) {
      customStyle = { height: this.props.tableHeight + 'px'}
    }
    return (
      <table className={className}>
        <thead>
          <tr>
            {
              this.props.header.map((header, id) => {
                return (<th key={id}>{header}</th>);
              })
            }
          </tr>
        </thead>
        <tbody style={customStyle}>
          {
            this.props.content.map((row, id) => {
              return (
                <tr key={id}>
                  {
                    row.map((col, idx) => {
                      return <td key={idx}>{col}</td>;
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
