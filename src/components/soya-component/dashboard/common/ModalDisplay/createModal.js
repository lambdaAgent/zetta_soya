import React from 'react';
import connect from 'soya/lib/data/redux/connect';

import style from './modal.mod.css';
import ModalDisplaySegment from './ModalDisplaySegment.js';

const DEFAULT_ZINDEX_STARTER = 100;

/**
 * Creates a modal dialog component.
 *
 * @CLIENT_SERVER
 */
export default function createModal(Component) {
  class ConvertedComponent extends React.Component {
    static connectId() {
      return Component.connectId ? Component.connectId() : 'Modal Dialog Component';
    }

    static getSegmentDependencies() {
      return [ModalDisplaySegment];
    }

    static subscribeQueries(props, subscribe) {
      if (typeof props.namespace == 'string') {
        subscribe(ModalDisplaySegment.id(), props.namespace, 'namespace');
      }
    }

    static shouldSubscriptionUpdate(props, nextProps) {
      return props.namespace !== nextProps.namespace;
    }

    componentWillMount() {
      this.actions = this.props.getActionCreator(ModalDisplaySegment.id());
    }

    removeSelf(namespace, modalId) {
      let remove = this.actions.remove(namespace, modalId);
      this.props.context.store.dispatch(remove);
    }

    render() {
      // TODO: Make modal windows to be controllable by setting props directly.
      // This is useful in the case of a component wanting to load a modal window
      // from a query result/subscription result.
      if (this.props.result.namespace == null) {
        if (this.props.data) {
          return this.renderData(this.props.data);
        }
        return null;
      } else {
        const modals = this.props.result.namespace;
        return this.renderData(modals);
      }
    }

    renderData(modals) {
      let modalId, modal, zindex, props, propKey, overlayClasses, components = [];
      for (modalId in modals) {
        if (!modals.hasOwnProperty(modalId)) continue;
        modal = modals[modalId];
        if (modal == null) continue;

        props = {};
        for (propKey in this.props) {
          if (!this.props.hasOwnProperty(propKey)) continue;
          if (propKey == 'result') continue;
          props[propKey] = this.props[propKey];
        }

        props.removeSelf = this.removeSelf.bind(this, this.props.namespace, modalId);
        props.modalId = modalId;
        props.index = modal.index;
        props.data = modal.data;

        let zindexStarter = this.props.zIndex == null ? DEFAULT_ZINDEX_STARTER : this.props.zIndex;
        zindex = zindexStarter + modal.index;
        overlayClasses = style.overlayAbsolute;
        if (modal.first) overlayClasses += ` ${style.black}`;
        components.push(
          <div style={{zIndex: zindex}} key={modalId} className={style.overlayFixed}>
            <div className={overlayClasses}></div>
            <div className={style.overlayAbsolute} style={{overflow: 'auto'}}>
              <Component {...props} />
            </div>
          </div>
        );
      }
      return <div>
        {components}
      </div>;
    }
  }

  return connect(ConvertedComponent);
};