import React, { PropTypes } from 'react';
import ClassNames from 'classnames';

import AccordionItem from '../AccordionItem';

const gStyle = AccordionItem.style;

class SimpleAccordion extends AccordionItem {
  static get propTypes() {
    return Object.assign(AccordionItem.propTypes, {
      // Data contract with this accordion item
      data: PropTypes.shape({
        text: React.PropTypes.string
      }).isRequired
    });
  }

  render() {
    return (
      <div className={ClassNames(gStyle.wrapper, { [gStyle.open] : this.props.state.expand })}>
        <div className={gStyle.header} onClick={this._toggleState.bind(this)}>
          Header
        </div>
        <div className={gStyle.body}>
          <div className={gStyle.paddContent}>
            WhiteAccordion {this.props.data.text}
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleAccordion;
