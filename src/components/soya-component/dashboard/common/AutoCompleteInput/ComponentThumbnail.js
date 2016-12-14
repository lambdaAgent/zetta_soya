import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';
import FormSegment from 'soya/lib/data/redux/form/FormSegment'; 
import createField from 'soya/lib/data/redux/form/createField';
import AutoCompleteInput from './AutoCompleteInput';

const options = [
	{value: 'INDONESIA', searchString: 'Indonesia Bhinneka Tunggal Ika'},
	{value: 'MALAYSIA', searchString: 'Datuk Maringgi Malaysia'},
	{value: 'THAILAND', searchString: 'Bangkok Thailand Pantai'},
	{value: 'AFGANISTAN', searchString: 'Bom Afganistan ISIS'}
]

class Component extends React.Component{
	render(){
		return <AutoCompleteInput {...this.props} />;
	}	
}

const AutoCompleteField =  createField(Component);

export default class ComponentThumbnail extends React.Component{
	componentWillMount(){
		this.form = new Form(this.props.context.store, 'country');
	}

	render(){
		return <AutoCompleteField form={this.form} context={this.props.context}
															name='countries' options={options} block={true} />
	}
}
