import React, { PropTypes } from 'react';

import Button from '../Button/Button';
import style from './TabMenu.mod.css';

class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.tabMenuStyle = style;
    const activeTabIndex = typeof this.props.activeTabIndex === 'number'? this.props.activeTabIndex : 0;
    this._loadedTab = [];
    this.state = {
      activeTabIndex: activeTabIndex
    };
  }

  static get propTypes() {
    return {
      activeTabIndex: PropTypes.number,
      children: function (props, propName, componentName) {
        const childs = React.Children.toArray(props[propName]); // children elements
        const types = [TabMenuItem];
        let typeNames = [TabMenuItem.name];

        for (let i in childs) {
          if (!React.isValidElement(childs[i]) || types.indexOf(childs[i].type) === -1) {
            return new Error(
              '`' + componentName + '` ' +
              'should have child of the following types: ' +
              ' `' + typeNames.join('`, `') + '`.'
            );
          }
        }
      },
      enableControl: PropTypes.bool,
      addTabHandler: PropTypes.func,
      closeTabHandler: PropTypes.func,
      mode: PropTypes.string
    };
  }

  /**
   * @override
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length > 0 && this.state.activeTabIndex >= nextProps.children.length) {
      this.setState({ activeTabIndex: nextProps.children.length -1 });
    }
  }

  /**
   * @override
   */
  render() {
    const htmlForMenu = this._getHtmlForMenu();

    return (
      <div {...this._getPropAttributes()}>
        <ul className={this.tabMenuStyle.tabMenu}>
          {htmlForMenu.menuTab}
        </ul>
        <div className={this.tabMenuStyle.panelBody}>
          {htmlForMenu.menuBody}
        </div>
      </div>
    );
  }

  /**
   * @protected
   */
  _getPropAttributes() {
    const props = Object.assign({}, this.props);

    const mode = props.mode || 'default';
    props.className = this.tabMenuStyle.tabMenuWrapper + ' ' + this.tabMenuStyle[mode] + (props.className? ' '+ props.className : '');


    delete props.children;
    return props;
  }

  /**
   * @protected
   */
  _getHtmlForMenu() {
    const menuTab = [], menuBody = [];
    let index, childElement, childProp;
    const childElements = React.Children.toArray(this.props.children);

    for (index in childElements) {
      if (!childElements.hasOwnProperty(index)) continue;
      
      let btnRemove;
      childElement = childElements[index]; // TabMenuItem
      childProp = childElement.props;

      if (this.props.enableControl === true) {
        btnRemove = (<span className={this.tabMenuStyle.close} onClick={this._closeTabHandler.bind(this, index)}>×</span>);
      }

      // Lazy load tab body
      const iIndex = Number(index), activeTab = Number(this.state.activeTabIndex);
      let bodyContent = null;
      if (this._loadedTab.indexOf(iIndex) !== -1 || (iIndex === activeTab)) {
        bodyContent = childProp.children;
        this._loadedTab.push(iIndex);
      }

      menuTab.push(
        <li className={index == this.state.activeTabIndex? this.tabMenuStyle.tabMenuActive: ''} key={index}>
          <a href={'javascript:void(0)'} onClick={this._clickTabHandler.bind(this, index)}>
            {childProp.title}
            {btnRemove}
          </a>
        </li>
      );

      menuBody.push(
        <div className={this.tabMenuStyle.menuBody +' '+ (Number(index) === Number(this.state.activeTabIndex) ? this.tabMenuStyle.menuBodyActive: '')} key={index}>
          {bodyContent}
        </div>
      );
    }

    if (this.props.enableControl === true) {
      menuTab.push(
        <li key={++index}>
          <Button buttonStyle={Button.STYLE.LINK} buttonSize={Button.SIZE.SMALL} href='javascript:;' onClick={this.props.addTabHandler.bind(this, childElements.length)}>&nbsp;&#43;&nbsp;</Button>
        </li>
      );
    }

    return {
      menuTab,
      menuBody
    };
  }

  /**
   * @protected
   */
  _clickTabHandler(tabIndex) {
    this.setState({ activeTabIndex: tabIndex });
  }

  _closeTabHandler(tabIndex) {
    if (typeof this.props.closeTabHandler === 'function') {
      this.props.closeTabHandler(tabIndex);
    }
  }
}

class TabMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      title: PropTypes.node.isRequired
    };
  }

  render() { return false; }
}

export { TabMenu, TabMenuItem };
