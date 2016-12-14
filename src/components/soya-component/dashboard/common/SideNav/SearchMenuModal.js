import React from 'react';
import Form from 'soya/lib/data/redux/form/Form';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';
import createModal from '../ModalDisplay/createModal.js';
import modal from '../ModalDisplay/modal.mod.css';
import style from '../ColorLegend/style.mod.css';
import SearchMenuField from './SearchMenuField';
import Button from '../Button/Button';

class SearchMenuModal extends React.Component {
	componentWillMount(){
		this.form = new Form(this.props.context.store, this.props.namespace);
		this.generateOptions = this.generateOptions.bind(this);
		this.options = this.generateOptions();
	}

	render(){
		let topOffset = this.props.index * 50;
    let leftOffset = this.props.index * 50;
		return <div className={modal.simpleModal} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
			<div className={modal.modalHeader}>
				<a onClick={this.props.removeSelf} className={style.close+" "+style['pull-right']}>&times;</a>
				Search Menu Shortcut
			</div>
      <div className={modal.modalBody}>
      	<SearchMenuField form={this.form} context={this.props.context} options={this.options} name='menu' block={true} autofocus={true} handleSubmit={this.redirect.bind(this)}/>
      	<center>
      		<Button buttonStyle={Button.STYLE.RED} buttonSize={Button.SIZE.DEFAULT} onClick={this.redirect.bind(this)}>Go</Button>
      	</center>
      </div>
    </div>;
	}

	redirect(){
		this.form.submit((result) => {
			let href;
			const listHref = result.values['menu'].match(/\(.*\)/g);
			href = listHref[listHref.length-1].replace('(','').replace(')','');
			// TODO: Fix this, it's wrong!
			window.location = `${this.props.context.config.apiUrl}${href}`;
		});
	}

	generateOptions(){
		let i, j, menu, menuList, options = [];
		const menuData = this.props.menuData;
		for(i = 0; i < menuData.length; i++){
			menu = menuData[i];
			for(j = 0; j < menu.links.length; j++){
				menuList = menu.links[j];
				if(React.isValidElement(menuList)){
					options.push({value:`${menuList.props.children} (${menuList.props.href})`, searchString: `${menuList.props.children}`});
				}
				else{
					options.push({value:`${menuList.title} (${menuList.href})`, searchString:`${menuList.title}`});	
				}
			}
		}
		return options; 
	}
}

export default createModal(SearchMenuModal);