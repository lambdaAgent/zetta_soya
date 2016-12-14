import React from 'react';

import Table from './Table';
import style from './TableCard.css';

class TableCard extends React.Component {
  render() {
    return (
      <div className={style.card}>
        {this.props.title ? <h4 className={style.cardTitle}>{this.props.title}</h4> : null}
        {this.props.subtitle ? <h6 className={style.cardSubtitle}>{this.props.subtitle}</h6> : null}
        {this.props.title ? <div className={style.breakLine} /> : null }
        <Table header={this.props.header} content={this.props.content} tableHeight={500} striped hover/>
      </div>
    );
  }
}

export default TableCard;
