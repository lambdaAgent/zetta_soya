import React from 'react';
import style from './style.mod.css';
import sitewide from '../../shared/sitewide.css';
import modal from '../ModalDisplay/modal.mod.css';

import createModal from '../ModalDisplay/createModal.js';
import Button from '../Button/Button';

class ColorLegend extends React.Component {
	render(){
		let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;

		const content = this.props.colors.map( (row, i) => 
			<div className={style.legend}>
        <span className={style.colorbox} style={{background: row.color}}></span> {row.description}
      </div>
    );
		return <div className={modal.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`, width: '700px'}}>
			<div className={modal.modalHeader}>
				<a onClick={this.props.removeSelf} className={style.close+" "+style['pull-right']}>&times;</a>
				Booking Color Legend
			</div>
			<div className={modal.modalBody}>
				{content}
			</div>
		</div>;
	}
}

export default createModal(ColorLegend);


