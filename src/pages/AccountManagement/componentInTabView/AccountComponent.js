import React from 'react';
import AutoCompleteInput from '../../../components/soya-component/dashboard/common/AutoCompleteInput/AutoCompleteInput.js'
import AutoCompleteInputThumbnail from '../../../components/soya-component/dashboard/common/AutoCompleteInput/ComponentThumbnail.js'
import createField from 'soya/lib/data/redux/form/createField';
import Button from '../../../components/soya-component/dashboard/common/Button/Button.js';

const options = [
  {value: 'INDONESIA', searchString: 'Indonesia Bhinneka Tunggal Ika'},
  {value: 'MALAYSIA', searchString: 'Datuk Maringgi Malaysia'},
  {value: 'THAILAND', searchString: 'Bangkok Thailand Pantai'},
  {value: 'AFGANISTAN', searchString: 'Bom Afganistan ISIS'}
];

const Component = props => {
  return <AutoCompleteInput {...props} />;
};

const AutoCompleteField = createField(Component);

export default class AccountComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        account component
        <br />
        <Button onClick={(e) => window.location = this.props.context.router.reverseRoute('ACCOUNT_ADD') }>Add New Account</Button>
        <br />
        <label>Filter</label>
        <AutoCompleteField form={this.props.form} context={this.props.context}
                                  name='countries' options={options} block={true} />
        {/*TODO: account will show after it matches the filter */}
      </div>
    );
  }
}