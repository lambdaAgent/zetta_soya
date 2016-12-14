import React from 'react';
import style from './MonitorValue.mod.css';
import sitewide from '../../shared/sitewide.css';

export default class MonitorValue extends React.Component{
	static get propTypes(){
		return {
			data: React.PropTypes.object,
			minValue: React.PropTypes.number,
			maxValue: React.PropTypes.number
		}
	}

	componentWillMount(){
		this.getStyle = this.getStyle.bind(this);
		this.getPercentage = this.getPercentage.bind(this);
	}

	getStyle(hue){
    var hueval=(hue*130).toString(10);
    return {
    	backgroundColor: "hsl("+hueval+",100%,70%)",
    	borderColor: "hsl("+hueval+",100%,45%)",
    	color: "hsl("+hueval+",100%,20%)"
    }
  }

  getPercentage(value){
  	return (value - this.props.minValue)/(this.props.maxValue - this.props.minValue); 	
  }

	render(){
		const percentageValue = this.getPercentage(this.props.data.value); 
		const myStyle = this.getStyle(percentageValue);

		let label = (percentageValue*100).toPrecision(3)+' %';
		if(this.props.data.hasOwnProperty('text')) label = this.props.data.text; 
		return (
			<div className={style['health-monitor']} style={myStyle}> 
				{ label }
			</div>
		);
	}
}

