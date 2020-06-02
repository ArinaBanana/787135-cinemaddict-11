export default class Store {
  constructor(key, storage) {
    this._key = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(Object.assign({}, store, {
          [key]: value,
        }))
    );
  }
}
