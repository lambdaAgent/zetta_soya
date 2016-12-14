import React from 'react';
import style from './Button.mod.scss';

/**
 * Button
 *
 * @property {string} buttonStyle
 * @property {string} buttonSize
 * @property {method} handleClick
 * @property {string} href
 * @property {boolean} newTab
 *
 * Usage
 * ---------------------------------
 * <Button
 *   buttonStyle={Button.STYLE.DEFAULT}
 *   buttonSize={Button.SIZE.DEFAULT}
 *   handleClick={this.clickHandler}
 *   href="#"
 *   newTab={false}
 * >
 *   Hello
 * </Button>
 *
 * For clickHandler method:
 * clickHandler(event, instance) {
 *   console.log(event);
 *   console.log(instance);
 * }
 */

class Button extends React.Component {
  static get propTypes() {
    return {
      buttonStyle: React.PropTypes.string,
      buttonSize: React.PropTypes.string,
      handleClick: React.PropTypes.func,
      href: React.PropTypes.string,
      newTab: React.PropTypes.bool
    };
  }

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

  static get SIZE() {
    return {
      DEFAULT: 'btn.size.default',
      BLOCK: 'btn.size.block',
      SMALL: 'btn.size.small',
      LARGE: 'btn.size.large'
    };
  }

  static get defaultProps() {
    return {
      buttonStyle: Button.STYLE.DEFAULT,
      buttonSize: Button.SIZE.DEFAULT,
      handleClick: () => {}
    };
  }

  static appendStyleClass(className, buttonStyle) {
    switch (buttonStyle) {
      case Button.STYLE.DEFAULT: className += ' ' + style['btn-secondary']; break;
      case Button.STYLE.PRIMARY: className += ' ' + style['btn-primary']; break;
      case Button.STYLE.GREEN: className += ' ' + style['btn-success']; break;
      case Button.STYLE.ORANGE: className += ' ' + style['btn-warning']; break;
      case Button.STYLE.LINK: className += ' ' + style['btn-link']; break;
      case Button.STYLE.RED: className += ' ' + style['btn-danger']; break;
    }    

    return className;
  }

  static appendSizeClass(className, buttonSize) {
    switch (buttonSize) {
      case Button.SIZE.DEFAULT: break;
      case Button.SIZE.BLOCK: className += ' ' + style['btn-block']; break;
      case Button.SIZE.SMALL: className += ' ' + style['btn-sm']; break;
      case Button.SIZE.LARGE: className += ' ' + style['btn-large']; break;
    }

    return className;
  }

  buildClassName() {
    let className = style.btn;
    className = Button.appendStyleClass(className, this.props.buttonStyle);
    className = Button.appendSizeClass(className, this.props.buttonSize);

    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }

    return className;
  }

  render() {
    let className = this.buildClassName();
    let handleClick = this.props.onClick || this.props.handleClick;

    if (this.props.href) {
      return <a
        className={className + ' ' + style.anchor}
        href={this.props.href}
        target={this.props.newTab ? '_blank' : null}
        onClick={() => handleClick(event, this)}
      >
        {this.props.children}
      </a>;
    } else {
      return <button
        className={className}
        onClick={() => handleClick(event, this)}
      >
        {this.props.children}
      </button>
    }
  }
}

export default Button;
