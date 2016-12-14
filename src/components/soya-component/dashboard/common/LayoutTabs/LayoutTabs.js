import React from 'react';
import ClassNames from 'classnames';
import style from './LayoutTabs.css';

class Tabs extends React.Component {
  static get propTypes() {
    return {
      activeId: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      activeId: 0,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeId: props.activeId,
    };
  }

  handleClickTabPane(id) {
    this.setState({activeId: id});
  }

  render() {
    let tabContent = null;
    const numTabs = this.props.children.length;
    if (this.state.activeId < numTabs) {
      tabContent = this.props.children[this.state.activeId].props.children;
    }
    const tabPane = this.props.children.map((child, id) => {
      return (<a className={ClassNames(style.tabPane, {[style.active]: id == this.state.activeId})}
                 key={id}
                 onClick={this.handleClickTabPane.bind(this, id)}
                 style={{width: (100 / numTabs) + '%'}}>{child.props.title}</a>);
    });
    return (
      <div>
        <div className={style.tabPaneWrapper}>{ tabPane }</div>
        <div className={style.tabContentWrapper}>{ tabContent }</div>
      </div>
    );
  }
}

export { default as Tab } from './LayoutTab';
export default Tabs;