import React from 'react';
import ActionSelect from './ActionSelect';
const actions = [
	{
		text: 'All', 
		func: () => { alert('all') } 
	},
	{
		text: 'Issued', 
		func: () => {alert('issued')} 
	},
	{
		text: 'Issued1', 
		func: () => {alert('issued1')}
	},
	{
		text: 'Issued2', 
		func: () => {alert('issued2')}
	}
]

class ComponentThumbnail extends React.Component {
	render() {
    return <div>
    	<ActionSelect actions={actions} title='Bulk' />
    </div>;
  }
}

export default ComponentThumbnail;