import React from 'react';
import Component from '../../base/Component';

import connect from 'soya/lib/data/redux/connect';
import { isEqualShallow, isReactChildrenEqual } from 'soya/lib/data/redux/helper';

import ModalSegment from './ModalSegment';
import style from './ModalContainer.mod.css';

/**
 * Container for modal, this component should be included on every page which want to use modal
 *
 * Usage
 * ---------------------------------
 * <ModalContainer context={this.props.context} emitter={this.props.eventEmitter} />
 */
class ModalContainer extends Component.ContextComponent {
  static connectId() {
    return 'ModalContainer';
  }

  static getSegmentDependencies() {
    return [ModalSegment];
  }

  static subscribeQueries(nextProps, subscribe) {
    subscribe(ModalSegment.id(), '', 'modals');
  }

  static shouldWrapperComponentUpdate(prevProps, nextProps, prevState, nextState) {
    const shouldUpdate = !isEqualShallow(nextState, prevState);
    // For the props, we need to check children differently.
    return shouldUpdate || !isEqualShallow(nextProps, prevProps, { children: isReactChildrenEqual });
  }

  static shouldSubscriptionsUpdate(prevProps, nextProps) {
    // For the props, we need to check children differently.
    return !isEqualShallow(nextProps, prevProps, { children: isReactChildrenEqual });
  }

  clearModal(modalId) {
    this.props.getReduxStore().dispatch(
      this.props.getActionCreator(ModalSegment.id()).remove(modalId)
    );
  }

  render() {
    const modalWindows = [];
    for (let i = 0; i < this.props.result.modals.length; i++) {
      const modal = this.props.result.modals[i];
      const id = modal.modalId;
      const props = modal.props;
      const ModalElement = this.props.modalRegister.getModalComponent(modal.modalType);
      if (ModalElement == null) continue;
      props.context = this.props.context;

      modalWindows.push(
        <div key={id + 'overlay'} className={style.modalOverlayTransparent}>
          <ModalElement id={id} key={id} level={i} {...props} removeSelf={this.clearModal.bind(this, id)} />
        </div>
      );
    }

    return (
      <div className={style.modalOverlay + ' ' + ((modalWindows.length > 0) ? style.opened : '')}>
        <div className='modals'>{modalWindows}</div>
      </div>
    );
  }
}

export default connect(ModalContainer);
