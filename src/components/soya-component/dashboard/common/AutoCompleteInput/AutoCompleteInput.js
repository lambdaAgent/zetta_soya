import React from 'react';
import style from './AutoCompleteInput.mod.css';
import sitewide from '../../shared/sitewide.css';

export default class AutoCompleteInput extends React.Component {
	componentWillMount(){
		this.setState({
			suggest: [],
			selectedIndex: 0
		});
	}

	render(){
		let suggestView;
		if(this.state.suggest.length > 0) {
			suggestView = this.generateSuggestView();
		}

		return (
			<div className={style.searchInputGroup + ' ' + (this.props.block ? style.block : '')}>
				<input type='text' className={style.searchInput} 
					value={this.props.value} placeholder={this.props.placeholder} 
					disabled={this.props.disabled} onKeyDown={this.handleKeyDown.bind(this)} 
					onChange={this.handleChange.bind(this)} autoFocus={this.props.autofocus} />
				{suggestView}
				{this.props.errorMessages.length > 0 ?<span className={style.errorMessages}>{this.props.errorMessages[0]}</span> : null} 			
			</div>
		);
	}

	generateSuggestView(){
		let suggest, className, suggestView, suggestList = [];
		for (let i = 0; i < this.state.suggest.length; i++){
			suggest = this.state.suggest[i];
			className = style.suggestion;
			className += (i === this.state.selectedIndex) ? (' '+style.suggestionActive) : '';
			suggestList.push(<div key={suggest.searchString} 
				className={className} onMouseOver={this.handleMouseOver.bind(this, i)} 
				onClick={this.handleClick.bind(this, suggest)}>{suggest.value}</div>);
		}
		suggestView = <div className={style.suggestionWrapper}>{suggestList}</div>;
		return suggestView;
	}

	handleMouseOver(i){
		this.setState({
			selectedIndex: i
		})
	}

	handleClick(suggest){
		this.props.handleChange(suggest.value);
		this.setState({
			suggest: [],
			selectedIndex: 0
		});
	}

	handleChange(event){
		let i, option, suggest = [];

		const value = event.target.value;
		this.props.handleChange(value);

		const regex = new RegExp(value, 'i');
		for(let i = 0; i < this.props.options.length; i++){
			option = this.props.options[i]; 
			if(regex.test(option.searchString)) {
				suggest.push(option);
			}
		}

		this.setState({
			suggest: (value !== '') ? suggest:[]
		});
	}

	handleKeyDown(event){

		if(this.state.suggest.length > 0){
			let suggest;
			
			if(event.key === 'Enter' || event.key === 'Tab'){
				suggest = this.state.suggest[this.state.selectedIndex];
				this.handleClick(suggest);
			}
			else if(event.key === 'ArrowUp'){
				this.changeSelectedIndex(-1);
			}
			else if(event.key === 'ArrowDown'){
				this.changeSelectedIndex(1);
			}
		}
		else{
			if(event.key === 'Enter' && this.props.handleSubmit){
				this.props.handleSubmit();
			}
		}
	}

	changeSelectedIndex(i){
		let selectedIndex = this.state.selectedIndex+i;
		if(selectedIndex < 0) selectedIndex = 0;
		if(selectedIndex >= this.state.suggest.length) selectedIndex = this.state.suggest.length-1;

		this.setState({
			selectedIndex: selectedIndex
		}); 
	}
}