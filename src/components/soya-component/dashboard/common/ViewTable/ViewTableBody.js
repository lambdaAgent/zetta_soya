import React from 'react';

import Checkbox from '../FormControl/Checkbox/Checkbox.js';
import sitewide from '../../shared/sitewide.css';
import grid from '../../shared/grid.mod.css';
import layout from '../../shared/layout.mod.css';
import style from './style.mod.css';

export default class ViewTableBody extends  React.Component {
  render() {
    debugger;
    return (
      <tbody>
        {
          this.props.data.map((row, i) => {
            return <TableRow key={row[this.props.idColumn].value} {...this.props} row={row} />
          })
        }
      </tbody>
    );
  }
}

class TableRow extends React.Component {
  handleRowClick(id, row, event) {
    if (typeof this.props.onRowClick == 'function') {
      this.props.onRowClick(id, row);
    }
  }

  render() {
    const { schema, colorMapping, row, hasBulkSelect,
      checkboxForm, context, extras, idColumn
    } = this.props;

    let colorCode = '';
    if (colorMapping != null) {
      const columnId = colorMapping.columnId;
      if (row.hasOwnProperty(columnId)) {
        const columnValue = row[columnId].value;
        colorCode = colorMapping.map[columnValue];
      }
    }

    const tdStyle = {
      textAlign: 'center'
    };

    let elementCheck = [];
    if (hasBulkSelect) {
      let id = row[idColumn].value;
      elementCheck.push(
        <td key={row[idColumn].value+'-act'} style={tdStyle}>
          <Checkbox name={id} text={''} stopPropagateClick={true} form={checkboxForm} context={context} style={Checkbox.STYLE.DEFAULT} />
        </td>
      );
    } else {
      elementCheck.push(
        <td key={row[idColumn].value+'-act'}style={tdStyle}></td>
      );
    }

    return (
      <tr className={style[colorCode]} onClick={this.handleRowClick.bind(this, row[this.props.idColumn].value, row)} >
        {elementCheck}
        {schema.map((column) => {
          let key = row[this.props.idColumn].value+'-'+column.id;
          if (row[column.id] == null) {
            throw new Error('Column exists on schema, but not on the row itself: ' + column.id);
          }
          return <TableColumn key={key} cell={row[column.id]} extras={extras} id={row[idColumn]}/>;
        })}
      </tr>
    );
  }
}

class TableColumn extends React.Component {
  render() {
    const { cell, extras, id} = this.props;

    if (cell.extras) {
      return (
        <td>
          <span>{cell.value}</span>
          {cell.extras.map((extra) => extras[extra.renderer](extra, id)) }
        </td>
      );
    } else {
      return <td>{cell.value}</td>;
    }
  }
}
