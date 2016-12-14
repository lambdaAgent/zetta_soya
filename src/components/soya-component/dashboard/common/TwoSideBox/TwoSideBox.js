import React from 'react';
import style from './style.mod.css';

export class LeftSide extends React.Component{
  render() {
    let className = style.pullLeft+" "+style.pageTitle;
    if(this.props.textAlign) {
      className = TwoSideBox.generateClassName(className, this.props.textAlign);
    }
    return <div className={className}>{this.props.children}</div>
  }
}

export class RightSide extends React.Component{
  render() {
    let className = style.pullRight;
    if(this.props.textAlign) {
      className = TwoSideBox.generateClassName(className, this.props.textAlign);
    }
    return <div className={className}>{this.props.children}</div>
  }
}

export default class TwoSideBox extends React.Component {
	static get TEXTALIGN(){
    return {
      RIGHT: 'text.right',
      LEFT: 'text.left',
      JUSTIFY: 'text.justify'
    }
  }

  static generateClassName(className, align){
    switch(align){
      case TwoSideBox.TEXTALIGN.RIGHT: className += ' ' + style.textRight; break;
      case TwoSideBox.TEXTALIGN.LEFT: className += ' ' + style.textLeft; break;
      case TwoSideBox.TEXTALIGN.JUSTIFY: className += ' ' + style.textJustify; break;
    }
    return className;
  }

  render(){
    let child = {};
    React.Children.forEach(this.props.children, (component) => {
      if(component.type === LeftSide){
        child.left = component;
      }
      else if(component.type === RightSide){
        child.right = component;
      }
    });

		return (
      <div className={style.box}>
        {child.left}
        {child.right}
      </div>
    );
	}
}