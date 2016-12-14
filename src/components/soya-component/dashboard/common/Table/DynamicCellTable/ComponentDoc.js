import React from 'react';
import DynamicCellTable from './DynamicCellTable';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Property</h3>
        <ul>
          <li>data <p>you must fill in a structure like example</p></li>
        </ul>
        <h3>Property Description</h3>
        <ul>
          <li> Data
            <p>
              this prop contains data of table. data is a array list(row) and each array contains a array list(column). first data or array list(row) is used to header table and further data are data of table. 
              when you want to colspan column in your data, can use <b>Columnspace</b> and when you want the label is bold, you can use <b>isBold</b> as in example code. <b>value</b> for each column can be filled with string or react component.
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
