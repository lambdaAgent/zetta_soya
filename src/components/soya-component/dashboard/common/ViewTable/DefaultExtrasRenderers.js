import React from 'react';
import HighlightLabel from '../HighlightLabel/HighlightLabel.js';

import style from './style.mod.css';

/**
 * Pre-defined extras renderer for booking center. You may create your own
 * extras renderer
 *
 * @CLIENT_SERVER
 */
export default {
  NOTES: (props, index) => {
    return <div key={index+'-notes'}className={style.notes}>{props.text}</div>;
  },
  TAG: (props, index) => {
    return <div key={index+'-tag'}>
      {props.values.map((text, index) => <HighlightLabel key={index+'-'+text}
                                                         labelStyle={HighlightLabel.STYLE.BLUE} text={text} />)}
    </div>;
  }
};