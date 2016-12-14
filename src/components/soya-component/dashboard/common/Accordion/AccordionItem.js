import React, { PropTypes } from 'react';
import Component from '../../base/Component';

import AccordionSegment from './AccordionSegment';

import style from './AccordionItem.mod.css';

class AccordionItem extends Component.ContextComponent {
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      itemIndex: PropTypes.number.isRequired,
      state: PropTypes.object.isRequired,
      accordionId: PropTypes.string.isRequired,
      context: PropTypes.object.isRequired
    };
  }

  static get style() {
    return style;
  }

  componentWillMount() {
    this._accordionActions = this.store.register(AccordionSegment);
  }

  inputName(name) {
    const _name = [this.props.id+''];
    if (name) _name.push(name);
    return _name;
  }

  _toggleState(ev) {
    if (ev.target.tagName === 'BUTTON' || ev.target.tagName === 'A') return;
    let action = null;
    if (this.props.state.expand) {
      action = this._accordionActions.collapse(this.props.accordionId, this.props.id);
    } else {
      action = this._accordionActions.expand(this.props.accordionId, this.props.id);
    }
    this.store.dispatch(action);
  }

  render() {
    return (
      <div>AccordionItem</div>
    );
  }
}

export default AccordionItem;
