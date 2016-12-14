import style from './ModalBase.mod.css';

/**
 * Please use this class to make new Modal Item, See SimpleModal for example.
 */
class ModalBase {
  static type() {
    throw new Error('You have to provide modal type to all modal window components you register!');
  }

  static get style() {
    return style;
  }
}

export default ModalBase;