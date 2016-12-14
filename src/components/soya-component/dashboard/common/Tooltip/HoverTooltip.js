import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { calculateTooltipPosition } from './Tooltip';
import style from './Tooltip.mod.css';

class HoverTooltip extends React.Component {
  static get propTypes() {
    return {
      text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object
      ]).isRequired,
      // If async, text is a function that return promise -> string, see componentDidMount to understand how it works
      async: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    this.state = { show: false, text: '' };
    this.tooltip = null;
  }

  componentWillMount() {
    if (this.props.async) {
      this.props.text().then(res => {
        this.setState({ text: res });
      });
    } else {
      this.setState({ text: this.props.text });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text });
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

  render() {
    const { top, left } = this.state.position || { top: 0, left: '50%' };

    return (
      <div style={this.props.style} className={style.container} onMouseLeave={this.hide.bind(this)}>
        <span onMouseOver={this.show.bind(this)}>{this.props.children}</span>
        <div ref={c => this.tooltip = c} style={{ top, left, position: 'fixed' }} className={style.wrapper + ' ' + ((this.state.show) ? style.show : '')}>
          {this.state.text}
        </div>
      </div>

    );
  }
}

export default HoverTooltip;
