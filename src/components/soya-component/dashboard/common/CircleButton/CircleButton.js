import React from 'react';
import style from './style.mod.css';
import button from '../Button/Button.mod.css';
import sitewide from '../../shared/sitewide.css';

export default class CircleButton extends React.Component {
	static get STYLE() {
    return {
      DEFAULT: 'btn.style.default',
      PRIMARY: 'btn.style.primary',
      GREEN: 'btn.style.GREEN',
      ORANGE: 'btn.style.ORANGE',
      LINK: 'btn.style.LINK',
      RED: 'btn.style.RED',
    };
  }

  static getStyleClass(buttonStyle) {
    let className = undefined;
    switch (buttonStyle) {
      case CircleButton.STYLE.DEFAULT: className = button['btn-secondary']; break;
      case CircleButton.STYLE.PRIMARY: className = button['btn-primary']; break;
      case CircleButton.STYLE.GREEN: className = button['btn-success']; break;
      case CircleButton.STYLE.ORANGE: className = button['btn-warning']; break;
      case CircleButton.STYLE.LINK: className = button['btn-link']; break;
      case CircleButton.STYLE.RED: className = button['btn-danger']; break;
    }    

    return className;
  }

	render(){
		return <span className={style.circleButton+' '+CircleButton.getStyleClass(this.props.buttonStyle)} onClick={this.props.handleClick}>{this.props.value}</span>	
	}
}



