import React from 'react';
import ColorLegend from './ColorLegend';
import ModalDisplaySegment from '../ModalDisplay/ModalDisplaySegment';
import Button from '../Button/Button';
const data = [
  {color: '#ad3939', description: 'expired and given-up auto-rebook, must rebook manually'},
  {color: '#F66B6B', description: 'expired, still handled by auto-rebook'},
  {color: '#FBB5B5', description: 'given-up auto-issue, must be issued manually'},
]

class ComponentThumbnail extends React.Component {
  componentWillMount(){
    this.actions = this.props.context.store.register(ModalDisplaySegment);
  }


  render() {
    return <div>
      <Button value='CL' handleClick={this.showColorLegend.bind(this)} buttonStyle={Button.STYLE.GREEN}>Show</Button>
      <ColorLegend colors={data} namespace="colorLegend" zIndex={1001} context={this.props.context}/>
    </div>
  }

  showColorLegend(){
    let addModal = this.actions.add('colorLegend', 1, 'colorLegend');
    this.props.context.store.dispatch(addModal);
  }
}

export default ComponentThumbnail;
