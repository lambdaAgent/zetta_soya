import React from 'react';
import Pagination from './Pagination';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <Pagination filter={{ totalRow: 100, rowCount: 10, currentPage: 2 }} actionHandler={ ({ currentPage }) => { alert(currentPage) }} />
      </div>
    );
  }
}

export default ComponentThumbnail;
