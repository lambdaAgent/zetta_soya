import React, { PropTypes } from 'react';
import { ContextComponent } from '../../base/Component';
import connect from 'soya/lib/data/redux/connect';

import AccordionItem from './AccordionItem';
import AccordionSegment from './AccordionSegment';

/**
 * Params
 * ---------------------------------
 * id: Unique
 * items: Array of object that will be passed to AccordionItem as props.data
 * itemProps: Object that will be passed to AccordionItem as props
 *
 * Usage
 * ---------------------------------
 * const items = {[
 *                 { text1: '0' },
 *                 { text1: '1' }
 *                ]};
 *
 * <Accordion id='accordionId' context={this.props.context} type={SimpleAccordion} itemProps={{ form: this.form, context: this.props.context }} items={items} />
 */
class Accordion extends ContextComponent {
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      context: PropTypes.object.isRequired,
      type: PropTypes.func, // React Component, child of AccordionItem
      itemProps: PropTypes.object,
      items: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ])
    };
  }

  static connectId() {
    return 'Accordion';
  }

  static getSegmentDependencies() {
    return [AccordionSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(AccordionSegment.id(), props.id, 'items');
  }

  render() {
    const itemsProps = this.props.result.items || [];
    const ItemElement = this.props.type || AccordionItem;
    const items = (this.props.items || []);
    const $items = [];
    let _ctr = 0; // This to make sure that even if items is an object, it'll always have integer key
    for (const _k in items) {
      if (items.hasOwnProperty(_k)) {
        const _state = (itemsProps[_k] || { state: { expand: false } }).state;
        $items.push(
          <ItemElement
            key={_ctr}
            itemIndex={_ctr} // because now we can't access key from component anymore
            accordionId={this.props.id}
            id={_k+''} // If item is an object we could access its key from here
            data={items[_k]}
            state={_state}
            {...this.props.itemProps}
          />);
        _ctr++;
      }
    }
    return (
      <div>{$items}</div>
    );
  }
}

export default connect(Accordion);
