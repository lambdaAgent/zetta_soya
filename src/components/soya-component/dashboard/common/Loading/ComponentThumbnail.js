import React from 'react';
import HorizontalBarLoading from './HorizontalBarLoading';
import BallClipRotate from './BallClipRotate';

class ComponentThumbnail extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><HorizontalBarLoading color='#FF9F04' /></td>
              <td><BallClipRotate color='green' /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ComponentThumbnail;
