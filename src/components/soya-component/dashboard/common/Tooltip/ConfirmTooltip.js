import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import ActionEventListener from '../EventListener/ActionEventListener';
import { calculateTooltipPosition } from './Tooltip';
import style from './Tooltip.mod.css';

class ConfirmTooltip extends React.Component {
  static get propTypes() {
    return {
      onOk: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { show: false };
    this.tooltip = null;
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    this.clickOutsideListener = ActionEventListener.createPredefinedEvent(ActionEventListener.event.CLICK_OUTSIDE, { el: domNode, callback: this.hide.bind(this) });
    this.clickOutsideListener.listen();
  }

  componentWillUnmount() {
    this.clickOutsideListener.destroy();
  }

  componentDidUpdate() {
    this.setTooltipPosition();
  }

  setTooltipPosition() {
    if (!this.state.show) return;
    const tooltip = ReactDOM.findDOMNode(this.tooltip);
    calculateTooltipPosition(tooltip, style);
  }

  show(ev) {
    const position = { top: ev.clientY, left: ev.clientX };
    this.setState({ show: true, position });
  }

  hide() {
    if (this.state.show)
      this.setState({ show: false });
  }

  confirm() {
    this.props.onOk();
    this.hide();
  }

  render() {
    const { top, left } = this.state.position || { top: 0, left: '50%' };
    return (
      <div style={this.props.style} className={style.container}>
        <span onClick={this.show.bind(this)}>{this.props.children}</span>
        <div ref={c => this.tooltip = c} style={{ top, left, position: 'fixed' }} className={style.wrapper + ' ' + ((this.state.show) ? style.show : '')}>
          <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.PRIMARY} onClick={this.confirm.bind(this)}>Confirm</Button>
          <Button buttonSize={Button.SIZE.SMALL} buttonStyle={Button.STYLE.RED} onClick={this.hide.bind(this)}>Cancel</Button>
        </div>
      </div>

    );
  }
}

export default ConfirmTooltip;
