import React from 'react';
import style from './Grid.mod.scss';

/**
 * Container
 *
 * @property {boolean} fluid
 *
 * Usage
 * ---------------------------------
 * <Container>
 *   Content
 * </Container>
 */

class Container extends React.Component {

  static get propTypes() {
    return {
      fluid: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      fluid: false
    };
  }

  render() {
    const className = this.props.fluid ? style['container-fluid'] : style.container;

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;