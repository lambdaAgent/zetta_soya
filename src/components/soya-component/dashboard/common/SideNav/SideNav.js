import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Component from '../../base/Component';
import ActionEventListener from '../EventListener/ActionEventListener';
import SearchMenuModal from './SearchMenuModal';
import ModalDisplaySegment from '../ModalDisplay/ModalDisplaySegment';

// CSS
import style from './SideNav.mod.css';

const NAMESPACE = 'searchMenu';

class SideNav extends Component.ContextComponent {
  static get propTypes() {
    return {
      menuData: PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        links: PropTypes.arrayOf(
          React.PropTypes.oneOfType([
            React.PropTypes.shape({
              title: React.PropTypes.string.isRequired,
              href: React.PropTypes.string.isRequired
            }),
            React.PropTypes.element
          ])
        ).isRequired
      })).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      menuList: []
    };
  }

  componentWillMount(){
    this._actions = this.props.context.store.register(ModalDisplaySegment);
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    this.clickOutsideListener = ActionEventListener.createPredefinedEvent(ActionEventListener.event.CLICK_OUTSIDE, { el: domNode, callback: this._handleClickOutside.bind(this) });
    this.clickOutsideListener.listen();
    this.ctrlKListener = ActionEventListener.createPredefinedEvent(ActionEventListener.event.CTRL_K, this._showSearchMenuModal.bind(this) );
    this.ctrlKListener.listen();
  }

  componentWillUnmount() {
    this.clickOutsideListener.destroy();
  }

  _handleClickOutside() {
    this.setState({
      menuOpen: false,
      menuList: []
    });
  }

  _showSearchMenuModal(){
    const addModal = this._actions.add(NAMESPACE, 1, NAMESPACE);
    this.props.context.store.dispatch(addModal);
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen, menuList: [] });
  }

  toggleListMenu(listMenuId) {
    this.setState({
      menuList: {
        [listMenuId]: !this.state.menuList[listMenuId]
      }
    });
  }



  render() {
    var modalIndex = this.props.modalIndex == null ? 1001 : this.props.modalIndex;

    return (
      <div style={this.props.style} className={style.sideNav + ' ' + (this.state.menuOpen ? style.open : '')}>

        <div className={style.sideNavHeader}>
          <div className={style.sideNavHeaderTitle}>Menu</div>
          <button className={style.toggleSideNav} onClick={this.toggleMenu.bind(this)}>
            <span /><span /><span />
          </button>
        </div>

        {
          this.props.menuData.map((mn, id) => {
            let icon = <span>{mn.iconText}</span>;
            if (mn.icon) icon = <span className={mn.icon} />;
            return (
              <div className={style.menuGroup} key={id}>
                <a href='javascript:;' onClick={this.toggleListMenu.bind(this, id)} title={mn.title} className={style.sideNavIcon}>{icon}</a>
                <ul className={style.sideNavList + ' ' + (this.state.menuList[id] ? style.open : '')}>
                  <li className={style.listTitle}>{mn.title}</li>
                  {
                    mn.links.map((ml, idx) => {
                      if (React.isValidElement(ml)) {
                        return (<li key={idx}>{ml}</li>);
                      } else {
                        return (<li key={idx}><a href={ml.href} title={ml.title}>{ml.title}</a></li>);
                      }
                    })
                  }
                </ul>
              </div>
            );
          })
        }
        <SearchMenuModal namespace={NAMESPACE} context={this.props.context} zIndex={modalIndex} menuData={this.props.menuData}/>
      </div>
    );
  }
}

export default SideNav;
