import React from 'react';
import style from './ActionPanel.css';

class ActionPanel extends React.Component {
  render() {
    const child = {};
    React.Children.forEach(this.props.children, cmp => {
      if (cmp.type.name === 'Left') {
        child.left = cmp;
      } else {
        child.right = cmp;
      }
    });
    return (
      <div className={style.panel}>
        <div className={style['panelBody']}>
          <table className={style.actionTable}>
            <tr>
              <td width="50%">{child.left}</td>
              <td width="50%">{child.right}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export class Left extends React.Component {
  render() {
    return (
      <div className={style.itemLeft}>{this.props.children}</div>
    );
  }
}

export class Right extends React.Component {
  render() {
    return (
      <div className={style.itemRight}>{this.props.children}</div>
    );
  }
}


export default ActionPanel;