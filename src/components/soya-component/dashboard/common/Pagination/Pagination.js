import React ,{ PropTypes } from 'react';
import Button from '../Button/Button';

import style from './Pagination.mod.css';

class Pagination extends React.Component {
  static get propTypes() {
    return {
      filter: PropTypes.shape({
        totalRow: PropTypes.number,
        rowCount: PropTypes.number,
        currentPage: PropTypes.number
      }).isRequired,
      actionHandler: PropTypes.func.isRequired
    };
  }

  getPagination(filter) {
    const pagination = [];
    const styleHidden = { display: 'none' };

    if (filter && filter.totalRow > 0) {
      const totalPage = Math.ceil(filter.totalRow / filter.rowCount);
      if (totalPage === 1) return null;

      pagination.push(<Button key='first' style={(filter.currentPage > 1 && totalPage > 3) ? null : styleHidden} onClick={this.handleGoToFirst.bind(this)} buttonSize={Button.SIZE.SMALL}>&lt;</Button>);
      const midPoint = filter.currentPage;
      let start = midPoint - 3;
      start = (start < 1) ? 1 : start;
      let end = midPoint + 3;
      end = (end > totalPage) ? totalPage : end;
      for (let i = start; i <= end; i++) {
        if (filter.currentPage === i) {
          pagination.push(<span key={i}>{i}</span>);
        } else {
          pagination.push(
            <Button key={i} onClick={this.handleGotTo.bind(this, i)} buttonSize={Button.SIZE.SMALL}>{i}</Button>);
        }
      }
      pagination.push(<Button key='last' style={(filter.currentPage < totalPage && totalPage > 3) ? null : styleHidden} onClick={this.handleGotToLast.bind(this)} buttonSize={Button.SIZE.SMALL}>&gt;</Button>);
    }
    return pagination;
  }

  handleGoToFirst() {
    this.props.actionHandler({ currentPage: 1 });
  }

  handleGotToLast() {
    const totalPage = Math.ceil(this.props.filter.totalRow / this.props.filter.rowCount);
    this.props.actionHandler({ currentPage : totalPage });
  }

  handleGotTo(i) {
    this.props.actionHandler({ currentPage: i });
  }
  
  render() {
    return (
      <div className={style.pagination}>{this.getPagination(this.props.filter)}</div>
    );
  }
}

export default Pagination;
