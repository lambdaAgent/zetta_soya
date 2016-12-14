import React from 'react';
import style from './Card.css';

class Card extends React.Component {

  static get propTypes() {
    return {};
  }

  static get defaultProps() {
    return {};
  }

  render() {
    return (
      <div className={style.card}>
        {this.props.title ? <h4 className={style.cardTitle}>{this.props.title}</h4> : null}
        {this.props.subtitle ? <h6 className={style.cardSubtitle}>{this.props.subtitle}</h6> : null}
        <div className={style.cardBody}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;
