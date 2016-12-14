import React from 'react';

import ActionTabSegment from './ActionTabSegment';
import connect from 'soya/lib/data/redux/connect';
import { SERVER } from 'soya/lib/data/RenderType';
import style from './ActionTab.mod.css';

class ActionTab extends React.Component { 
  static getConnectId() {
    return 'ActionTab';
  }

  static getSegmentDependencies(config) {
    return [ActionTabSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(ActionTabSegment.id(), props.tabId , 'data');
  }

  static get propTypes() {
    return {
      data: React.PropTypes.object,
      handleTabClick: React.PropTypes.func,
      context: React.PropTypes.object,
      tabId: React.PropTypes.string
    };
  }

  componentWillMount() {
    this.actions = this.props.context.store.register(ActionTabSegment);
    // Set initial tab index to be open.
    if (this.props.defaultTabId != null) {
      // No other way, loop through to find the index of the default tab ID.
      let i, tabIndex = false;
      for (i = 0; i < this.props.tabList.length; i++) {
        if (this.props.tabList[i].id == this.props.defaultTabId) {
          tabIndex = i;
          break;
        }
      }
      if (typeof tabIndex == 'number') {
        this.props.context.store.dispatch(this.actions.setDefault(
          this.props.tabId, tabIndex
        ));
      }
    }
  }

  changeActiveTab(index) {
    let updateAction = this.actions.set(this.props.tabId, index);
    this.props.context.reduxStore.dispatch(updateAction);
    this.props.handleTabClick(this.props.tabList[index].id);
  }

  render() {
    return <div className={style['expand-table-bind'] + ' ' + style.tabMargin}>
      <ul className={style['panel-tab']}>
        {this.props.tabList.map((menu, index) => <li key={menu.id} className={(index === this.props.result.data) ? style.active:''}>
          <a href={'javascript:void(0)'} onClick={this.changeActiveTab.bind(this, index)}>{menu.title}
          </a></li>)}
      </ul>
    </div>;
  }
} 

export default connect(ActionTab);