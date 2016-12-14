import React from 'react';

import sitewide from '../../shared/sitewide.css';
import style from './ActionSelect.mod.css';

export default class ActionSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      styleOpen: ''
    };
  };
  static get propTypes(){
    return {
      actions: React.PropTypes.array,
      title: React.PropTypes.string
    };
  }

  handleClick() {
    if(this.state.styleOpen === '') {
      this.setState({styleOpen: 'open'});
    }
    else {
      this.setState({styleOpen: ''});
    }
  }

  handleOptionClick(action) {
    action.func();
    this.handleClick();
  }
  render(){
    return <div className={style.dropdown}>
      <button className={style.btn} onClick={this.handleClick.bind(this)}>
        {this.props.title} <span className={style['caret']}></span>
      </button>
      <ul className={style['dropdown-menu'] + ' '+style[this.state.styleOpen]}>
        {this.props.actions.map((action, index) => <li key={action.text}><a href='javascript:void(0)' onClick={this.handleOptionClick.bind(this, action)}>{action.text}</a></li>)}
      </ul>
    </div>;         
  }
}

