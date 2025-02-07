/* global window, document */
import { h } from './component/element';
import DataProxy from './core/data_proxy';
import Sheet from './component/sheet';
import Bottombar from './component/bottombar';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import './index.less';
import { expr2xy, xy2expr } from './core/alphabet';


class Spreadsheet {
  constructor(selectors, options = {}) {
    let targetEl = selectors;
    this.options = { showBottomBar: true, ...options };
    this.sheetIndex = 1;
    this.datas = [];
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }
    this.bottombar = this.options.showBottomBar ? new Bottombar(() => {
      if (this.options.mode === 'read') return;
      const d = this.addSheet();
      const index = this.datas.length - 1;
      this.sheet.trigger('change-sheet-index', index);
      this.sheet.resetData(d);
    }, (index) => {
      const d = this.datas[index];
      this.sheet.resetData(d);
      this.sheet.trigger('change-sheet-index', index);
    }, () => {
      this.deleteSheet();
      this.sheet.trigger('change-sheet-index', this.activeElIdx);
    }, (index, value) => {
      this.datas[index].name = value;
      this.sheet.trigger('change');
    }) : null;
    this.data = this.addSheet();
    const rootEl = h('div', `${cssPrefix}`)
      .on('contextmenu', evt => evt.preventDefault());
    // create canvas element
    targetEl.appendChild(rootEl.el);
    this.sheet = new Sheet(rootEl, this.data);
    if (this.bottombar !== null) {
      rootEl.child(this.bottombar.el);
    }
  }

  showSheet(index) {
    this.bottombar.showSheet(index);
  }

  addSheet(name, active = true) {
    const n = name || `sheet${this.sheetIndex}`;
    const d = new DataProxy(n, this.options);
    d.change = (...args) => {
      this.sheet.trigger('change', ...args);
    };
    this.datas.push(d);
    if (this.bottombar !== null) {
      this.bottombar.addItem(n, active, this.options);
    }
    this.sheetIndex += 1;
    return d;
  }

  deleteSheet() {
    if (this.bottombar === null) return;
    const [oldIndex, nindex] = this.bottombar.deleteItem();
    if (oldIndex >= 0) {
      this.datas.splice(oldIndex, 1);
      if (nindex >= 0) this.sheet.resetData(this.datas[nindex]);
      this.sheet.trigger('delete-sheet-index', oldIndex);
    }
  }

  get activeElIdx() {
    return this.bottombar.activeElIdx;
  }

  loadData(data, sheetIndex) {
    const ds = Array.isArray(data) ? data : [data];
    if (this.bottombar !== null) {
      this.bottombar.clear();
    }

    this.datas = [];
    this.sheetIndex = 1;

    if (ds.length > 0) {
      for (let i = 0; i < ds.length; i += 1) {
        const it = ds[i];
        const nd = this.addSheet(it.name, i === 0);
        nd.setData(it);
        if (i === 0) {
          this.sheet.resetData(nd);
        }
      }
    }

    if (sheetIndex > 0) {
      this.showSheet(sheetIndex);
    }

    return this;
  }

  get rowsLength() {
    return this.sheet.rowsLength;
  }

  get colsLength() {
    return this.sheet.colsLength;
  }

  get stringAt() {
    return this.sheet.stringAt;
  }

  expr2xy(src) {
    return expr2xy(src);
  }

  xy2expr(x, y) {
    return xy2expr(x, y);
  }

  insert(type, n) {
    this.sheet.insert(type, n);
  }

  insertRow(n) {
    this.sheet.insertRow(n);
  }

  insertColumn(n) {
    this.sheet.insertColumn(n);
  }

  disableMerge() {
    this.sheet.disableMerge()
  }

  allowMerge() {
    this.sheet.allowMerge()
  }

  selectCell(sri, sci) {
    this.sheet.selectCell(sri, sci);
  }

  getData() {
    return this.datas.map(it => it.getData());
  }

  cellText(ri, ci, text, sheetIndex = 0) {
    this.datas[sheetIndex].setCellText(ri, ci, text, 'finished');
    return this;
  }

  cell(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCell(ri, ci);
  }

  deleteRow() {
    this.sheet.insertDeleteRowColumn('delete-row');
  }

  deleteCol() {
    this.sheet.insertDeleteRowColumn('delete-column');
  }

  cellStyle(ri, ci, sheetIndex = 0) {
    return this.datas[sheetIndex].getCellStyle(ri, ci);
  }

  reRender() {
    this.sheet.table.render();
    return this;
  }

  on(eventName, func) {
    this.sheet.on(eventName, func);
    return this;
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    this.sheet.on('change', cb);
    return this;
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

if (window) {
  window.x_spreadsheet = spreadsheet;
  window.x_spreadsheet.locale = (lang, message) => locale(lang, message);
}

export default Spreadsheet;
export {
  spreadsheet,
};
