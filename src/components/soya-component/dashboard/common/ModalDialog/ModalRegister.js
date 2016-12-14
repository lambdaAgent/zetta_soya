/**
 * Use in conjunction with ModalLayer, register your modal window handlers to
 * this class.
 *
 * @CLIENT_SERVER
 */
export default class ModalRegister {
  _modals;

  constructor() {
    this._modals = {};
  }

  register(ModalComponent) {
    if (typeof ModalComponent.type != 'function') {
      throw new Error(`Modal component is not defined with type: ${ModalComponent}`);
    }
    let type = ModalComponent.type();
    if (typeof type != 'string') {
      throw new Error(`Modal component is not defined with type: ${ModalComponent}`);
    }
    if (this._modals.hasOwnProperty(type) && this._modals[type] !== ModalComponent) {
      throw new Error(`Clashing modal component names: ${type}, for class ${ModalComponent} and ${this._modals[type]}.`);
    }
    this._modals[type] = ModalComponent;
  }

  getModalComponent(type) {
    return this._modals[type];
  }
}