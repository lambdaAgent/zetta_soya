import React from 'react';
import style from './PopDown.css'

class Toggler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  handleToggle() {
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className={style.togglerWrapper}>
        <button className={style.toggler} onClick={this.handleToggle.bind(this)}>{this.props.text}</button>
        { this.state.show ? this.props.children : null }
      </div>
    );
  }
}

export default Toggler;