import React from 'react';

import style from './DynamicCellTable.mod.css';

export default class DynamicCellTable extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.object
    };
  }

  render() {

    //copy data for tbody
    let bodyData = [];
    for (let i = 1; i < this.props.data.data.length; i++) {
      bodyData.push(this.props.data.data[i]);
    }
    return (
      <div>
        <table className={`${style.table} ${style.mini}`}>
          <thead>
            <SmallTableHead data={this.props.data.data[0]} />
          </thead>
          <tbody>
            {bodyData.map((row, index) => <SmallTableBody data={row} key={index} bodyDataLength={bodyData.length}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

class SmallTableHead extends React.Component {
  render() {
    return (
      <tr>
        {this.props.data.map( (column, index) => {
          let columns = [];
          if (column.columnSpace) {
            columns.push(<th>{column.value}</th>);
            for (let i = 0; i < column.columnSpace; i++) {
              columns.push(<th></th>);
            }
          } else {
            columns.push(<th key={index}>{column.value}</th>);
          }
          return columns;
        })}
      </tr>
    );
  }
}

class SmallTableBody extends React.Component {
  render() {
    const boldStyle = {
      fontWeight: 'bold'
    };
    return (
      <tr>
        {this.props.data.map( (column, index) => {
          let element;
          let columns = [];
          if (typeof column.value === 'string') {
            element = <span>{column.value}</span>;
          } 
          else {
            element = column.value;
          }
          
          if (column.columnSpace) {
            columns.push(<td key={index} colSpan={column.columnSpace + 1} style={(column.isBold) ? boldStyle : {}}>{element}</td>);
          } else {
            columns.push(<td key={index} style={(column.isBold) ? boldStyle : {}}>{element}</td>);
          }
          return columns;
        })}
      </tr>
    );
  }
}