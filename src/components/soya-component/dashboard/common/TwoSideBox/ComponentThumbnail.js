import React from 'react';
import TwoSideBox, {LeftSide, RightSide} from './TwoSideBox';
import CircleButton from '../CircleButton/CircleButton';
import Button from '../Button/Button';

class ComponentThumbnail extends React.Component {
  render() {
    return (
    	<TwoSideBox>
    		<LeftSide>
    			Booking Center
    			<CircleButton value='?' buttonStyle={CircleButton.STYLE.PRIMARY} />	
    		</LeftSide>
    		<RightSide>
    			<Button buttonStyle={Button.STYLE.PRIMARY}>Button 1</Button> &nbsp;
    			<Button buttonStyle={Button.STYLE.ORANGE}>Button 2</Button> &nbsp;
    			<Button buttonStyle={Button.STYLE.GREEN}>Button 3</Button>
    		</RightSide>
    	</TwoSideBox>
    )
  }
}

export default ComponentThumbnail;
