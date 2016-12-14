import React from 'react';
import Button from '../Button/Button.js';

import style from './style.mod.css';

export default class KeyValueGroup extends React.Component {
  render() {
    var content = (
      <div>
        <div className={style.keyValueContainer}>
          {this.props.data.map((row, i) => {
            return <div className={style.keyvalue} key={`${row.label} ${row.value}`}>
              <span className={style.key}>{row.label}</span>
              <span className={style.value}>
                {row.value} &nbsp;
                {row.buttons ? row.buttons.map((button, i) => {
                  return <Button key={button.label} buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.DEFAULT} handleClick={button.handler}>{button.label}</Button>;
                }) : null}
              </span>
            </div>;
          })}
        </div>
      </div>
    );

    const colorMapping = this.props.colorMapping;
    if (colorMapping) {
      let row = this.props.data[colorMapping.rowIndex];
      let colorStyle = colorMapping.map[row.value];
      content = <div className={`${style.box} ${style['box-body']} ${style.importance} ${style[colorStyle]}`}>
          {content}
        </div>;
    }

    return content;
  }
}