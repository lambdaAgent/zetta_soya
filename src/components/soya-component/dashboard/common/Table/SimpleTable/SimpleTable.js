import React, { PropTypes } from 'react';

// CSS
import style from './SimpleTable.mod.css';
import '../../../shared/sitewide.css';

class SimpleTable extends React.Component {
  static get propTypes() {
    return {
      tableBody: PropTypes.array,
      tableActions: PropTypes.array, // [{ action/href: function(data), label: string, component: React.Component, props: ?object }]
      fields: PropTypes.array.isRequired
    };
  }

  /**
   * Generate list of label for table head
   * @param tableData
   * @param fields
   * @returns {Array}
   * @private
   */
  _generateTableHead(tableData, fields) {
    const head = [];
    // With props fields defined ------------------------------------------------------
    if (fields && fields instanceof Array) {
      for (let _i = 0; _i < fields.length; _i++) {
        const field = fields[_i];
        if (typeof field === 'object' && field.hasOwnProperty('label')) {
          head.push(field.label);
        } else {
          head.push(field);
        }
      }
      return head;
    }
    // No props fields defined ---------------------------------------------------------
    if (!(tableData instanceof Array) || (tableData instanceof Array && tableData.length === 0)) {
      return head;
    }
    const firstContent = tableData[0];

    for (const key in firstContent) {
      if (firstContent.hasOwnProperty(key)) {
        head.push(key);
      }
    }
    return head;
  }

  _generateItemAction(item, actions) {
    const actionTds = [];
    for (let _i = 0; _i < actions.length; _i++) {
      const ac = actions[_i];
      const actionProps = {};

      let $button = null;
      if (ac.href) {
        actionProps.href = ac.href(item);
        $button = <a {...actionProps} {...ac.props}>{ac.label}</a>;
      } else if (ac.action) {
        actionProps.onClick = this._runAction.bind(this, ac.action, item);
        $button = <ac.component {...actionProps} {...ac.props}>{ac.label}</ac.component>;
      }
      actionTds.push(<td key={`action${_i}`} style={ac.style} className={ac.className}>{$button}</td>);
    }
    return actionTds;
  }

  _runAction(action, item) {
    action(item);
  }

  _formatContent(key, item) {
    if (React.isValidElement(item) || typeof item === 'object') {
      return <td key={key}>{item}</td>;
    }//else if (typeof item === 'object' || typeof item === 'boolean') {
      else if (typeof item === 'boolean') {
      return <td key={key}>{(item === null ? '' : item).toString()}</td>;
    }
    return <td key={key} title={item} >{item}</td>;
  }

  /**
   * Read a.b.c into a[b[c]] and return the value, if there is a formatter defined, pass the return value into the formatter
   * Sample case when to use formatter is when you want to format timestamp into readable date string
   * @param {String} key
   * @param {any} object
   * @param {?Function} formatter
   * @returns {*}
   */
  _deepReadObject(key, object, formatter) {
    const part = key.split('.');
    let obj = object;
    for (let _i = 0; _i < part.length; _i++) {
      if (obj.hasOwnProperty(part[_i])) {
        obj = obj[part[_i]];
      } else {
        return '';
      }
    }
    if (typeof formatter === 'function') return formatter(obj);

    return obj;
  }

  render() {
    const tbody = [];
    const { tableBody, tableActions, fields, tableActionsObject } = this.props;
    const tableHead = this._generateTableHead(tableBody, fields);
    if (tableBody) {
      for (let _i = 0; _i < tableBody.length; _i++) {
        let tds = [];
        if (fields && fields instanceof Array) {
          // With fields defined ------------------------------------------------------
          for (const field of fields) {
            let _field = field, _formatter;
            // Handle string & object
            if (typeof field === 'object' && field.hasOwnProperty('field')) {
              _field = field.field;
              _formatter = field.formatter;
            }
            tds.push(this._formatContent(
              _field,
              this._deepReadObject(_field, tableBody[_i], _formatter)),
            );
          }
        }
        else {
          // No fields defined ------------------------------------------------------
          for (const key in tableBody[_i]) {
            if (tableBody[_i].hasOwnProperty(key)) {
              tds.push(this._formatContent(key, tableBody[_i][key]));
            }
          }
        }
        // Actions ----------------------------------------------------------
        if (tableActions) {
          tds = tds.concat(this._generateItemAction(tableBody[_i], tableActions));
        }
        // tableActionObject ----------- this will match the column table and attach function to it, perhaps it's more common to match the row instead.
        if (tableActionsObject){
          tds = tds.map(column => {
            let actionTypeThatMatchTableFieldIndex = 0;
            return Object.keys(tableActionsObject).map((fieldNameOftableActionsObject, idx )=> {

              if( column.key === fieldNameOftableActionsObject ){
                actionTypeThatMatchTableFieldIndex = idx;
                 const newColumn = Object.keys(tableActionsObject[fieldNameOftableActionsObject])
                   .map(eventAction => {
                      // eventAction i.e: onClick, onMouseOver, etc..
                     const funcForEventListener = tableActionsObject[fieldNameOftableActionsObject][eventAction];
                     const [functionArguments, functionBody] = getFunctionAgrsAndBodyAsString(funcForEventListener);
                     // react use '_this' not normal 'this', so cannot use bind:  funcForEventListener.bind(column)
                     const functionWithNormalizeThis = new Function(functionArguments, functionBody).bind(column);
                     const clonedColumn = React.cloneElement(column, {
                         [eventAction]: functionWithNormalizeThis
                      });
                      return clonedColumn;
                   })[0]; // Object.keys(tableActionsObject[actionType]).map
                 return newColumn;
              } else {
                return column;
              }
            })[actionTypeThatMatchTableFieldIndex];

          });
        }
        tbody.push(<tr key={_i}>{tds}</tr>);
      }
    } else {
      tbody.push(<tr key='loadTr'><td key='loadTd' colSpan={tableHead.length + tableActions.length}>Load data...</td></tr>);
    }

    const styleActions = tableActions!== undefined?style.tableActionable:'';
    return (
      <table className={style.table + ' ' + style.tableHover + ' ' + styleActions}>
        <thead>
          <tr>
            {
              tableHead.map((head, idx) => {
                return <th key={idx}>{head}</th>;
              })
            }
            {
              (tableHead.length === 0) ? <th key='null' /> : (tableActions || []).map((head, idx) => {
                return <th key={idx}>{head.label}</th>;
              })
            }
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }
}

//
function getFunctionAgrsAndBodyAsString(func){
  let funcAsString = func.toString();
  funcAsString = funcAsString.replace("_this", "this");
  const functionBody = funcAsString.slice(funcAsString.indexOf("{") + 1, reverseLastIndexOfChar(funcAsString, "}"));
  const functionArguments = funcAsString.slice(funcAsString.indexOf("(")+1, funcAsString.indexOf(")"))
                                        .trim()
                                        .split(",");
  return [[functionArguments], functionBody];
}

function reverseLastIndexOfChar(str, char){
  let result = -1;
  for(var i=str.length;i>0;i--){
    if(str[i] === char) {
      result = i;
      break;
    }
  }
  return result;
}
export default SimpleTable;


