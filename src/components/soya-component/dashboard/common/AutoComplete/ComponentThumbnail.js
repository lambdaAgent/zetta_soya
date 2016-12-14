import React from 'react';
import AutoComplete from './AutoComplete';

const data = [ 'INDONESIA','THAILAND', 'MALAYSIA', 'VIETNAM', 'SINGAPURA'];

export default class ComponentThumbnail extends React.Component {
	componentWillMount(){
		this.state = {
			suggestions: [],
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	render(){
		return <AutoComplete
			handleChange={this.handleChange}
			handleSuggestionSelect={this.handleSuggestionSelect}
			block={true}
			label='Auto Complete'
			value={this.state.value}
			suggestions={this.state.suggestions}
			action='search'
			handleSearchSubmit={this.handleSearchSubmit}/>
	}	

	handleChange(value){
		const pattern = new RegExp(value,"i");
		let tempSuggestions = [];
		for(let i = 0; i < data.length; i++){
			if(pattern.test(data[i])){
				tempSuggestions.push({id: data[i], desc: data[i]});
			}
		}

		this.setState({
			suggestions: tempSuggestions,
			value: value
		});
	}

	handleSuggestionSelect(suggestion){
		this.setState({
			suggestions : [],
			value: suggestion.desc 
		});
	}

	handleSearchSubmit(){
		alert(this.state.value);
	}
}
