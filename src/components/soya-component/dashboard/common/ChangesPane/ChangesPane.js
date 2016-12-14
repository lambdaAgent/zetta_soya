import React from 'react';
import style from './ChangesPane.css';

class ChangesPane extends React.Component{
  static get propTypes() {
    return {
      diffs: React.PropTypes.array,
    };
  }

  render() {
    const { diffs } = this.props;
    return (
      <div>
        <table className={style.table}>
          <tbody>
            {
              diffs.map((diff) => {
                if (diff.nestedDiffs) {
                  console.log('content changes nestedDiffs', diff)
                  const nestedRows = [];
                  nestedRows.push(
                    <tr className={style.fieldName}>
                      <td>{diff.field}</td>
                    </tr>
                  );
                  diff.nestedDiffs.map((nestedDiff) => {
                    nestedRows.push(
                      <tr className={style.subtr}>
                        <td className={style.fieldName}>  <span>&#10148; </span>{nestedDiff.field}</td>
                        <td className={style.before}>{JSON.stringify(nestedDiff.before) || 'null'}</td>
                        <td> &rarr; </td>
                        <td className={style.after}>{JSON.stringify(nestedDiff.after) || 'null'}</td>
                      </tr>
                    )
                  });
                  return nestedRows;
                } else {
                  return (
                    <tr>
                      <td className={style.fieldName}>{diff.field}:</td>
                      <td className={style.before}>{JSON.stringify(diff.before) || 'null'}</td>
                      <td> &rarr; </td>
                      <td className={style.after}>{JSON.stringify(diff.after) || 'null'}</td>
                    </tr>
                  );
                }
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ChangesPane;