import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

const DEFAULT_HEIGHT = 34;

/**
 * npm install react-textarea-autosize --save
 *
 * Usage
 * ---------------------------------
 * <TextArea name='titleText' value='a' onChange={this.titleTextChangeHandler.bind(this)} />
 */
class TextAreaComp extends React.Component {
  render() {
    const minHeight = this.props.minHeight == null ? DEFAULT_HEIGHT : this.props.minHeight;
    return <Textarea style={{ minHeight: minHeight }} {...this.props} />;
  }
}

export default TextAreaComp;