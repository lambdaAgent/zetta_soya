import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';


class SearchMenuField extends React.Component{
	render(){
		return <AutoCompleteInput {...this.props} />;
	}
}

export default createField(SearchMenuField);
