import { h } from './element';
import { bindClickoutside, unbindClickoutside } from './event';
import { cssPrefix } from '../config';
import Icon from './icon';
import FormInput from './form_input';
import Dropdown from './dropdown';
// Record: temp not used
// import { xtoast } from './message';
import { tf } from '../locale/locale';

class DropdownMore extends Dropdown {
  constructor(click) {
    const icon = new Icon('ellipsis');
    super(icon, 'auto', false, 'top-left');
    this.contentClick = click;
  }

  reset(items) {
    const eles = items.map((it, i) => h('div', `${cssPrefix}-item`)
      .css('width', '150px')
      .css('font-weight', 'normal')
      .on('click', () => {
        this.contentClick(i);
        this.hide();
      })
      .child(it));
    this.setContentChildren(...eles);
  }

  setTitle() {}
}

const menuItems = [
  { key: 'delete', title: tf('contextmenu.deleteSheet') },
];

function buildMenuItem(item) {
  return h('div', `${cssPrefix}-item`)
    .child(item.title())
    .on('click', () => {
      this.itemClick(item.key);
      this.hide();
    });
}

function buildMenu() {
  return menuItems.map(it => buildMenuItem.call(this, it));
}

class ContextMenu {
  constructor() {
    this.el = h('div', `${cssPrefix}-contextmenu`)
      .css('width', '160px')
      .children(...buildMenu.call(this))
      .hide();
    this.itemClick = () => {};
  }

  hide() {
    const { el } = this;
    el.hide();
    unbindClickoutside(el);
  }

  setOffset(offset) {
    const { el } = this;
    el.offset(offset);
    el.show();
    bindClickoutside(el);
  }
}

export default class Bottombar {
  constructor(addFunc = () => {},
    swapFunc = () => {},
    deleteFunc = () => {},
    updateFunc = () => {}) {
    this.swapFunc = swapFunc;
    this.updateFunc = updateFunc;
    this.dataNames = [];
    this.activeEl = null;
    this.deleteEl = null;
    this.btnLeft = null;
    this.btnRight = null;
    this.sheetsWrap = null;
    this.items = [];
    this.moreEl = new DropdownMore((i) => {
      this.clickSwap2(this.items[i]);
    });
    this.contextMenu = new ContextMenu();
    this.contextMenu.itemClick = deleteFunc;
    this.el = h('div', `${cssPrefix}-bottombar`)
      .children(
        this.contextMenu.el,
        h('div', `${cssPrefix}-menu-div`)
          .children(
            new Icon('add').on('click', () => {
              addFunc();
            }),
            h('span', '')
              .child(this.moreEl),
          ),

        h('div', `btns-wrap`)
          .children(
            this.btnLeft = h('div', `${cssPrefix}-menu-div btn icon chevron-left`)
              .on('click', (event) => {
                if (this.btnLeft.el.classList.contains('disabled')) return;
                this.goNextBtn(event);
              }),
            this.btnRight = h('div', `${cssPrefix}-menu-div btn icon chevron-right`)
              .on('click', (event) => {
                if (this.btnRight.el.classList.contains('disabled')) return;
                this.goBackBtn(event);
              }),
          ),

        this.sheetsWrap = h('div', `${cssPrefix}-menu-div overflow-hidden width-unset no-paddings w-85`)
          .children(
            this.menuEl = h('ul', `${cssPrefix}-menu`),
          ),
      );
    this.init();
  }

  init() {
    this.btnRight.disabled(true);
    this.btnLeft.disabled(true);

    setInterval(() => {
      if (this.sheetsWrap.el.clientWidth >= this.sheetsWrap.el.scrollWidth) {
        this.btnRight.disabled(true);
        this.btnLeft.disabled(true);
      } else {
        this.btnRight.disabled(false);
        this.btnLeft.disabled(false);
      }
      if (this.sheetsWrap.el.scrollLeft === 0) {
        this.btnLeft.disabled(true);
      }
      if ((this.sheetsWrap.el.scrollWidth - this.sheetsWrap.el.scrollLeft) === this.sheetsWrap.el.clientWidth) {
        this.btnRight.disabled(true);
      }
    }, 400);
  }

  goNextBtn(event) {
    event.target.parentNode.nextElementSibling.scrollLeft -= 25;
  }

  goBackBtn(event) {
    event.target.parentNode.nextElementSibling.scrollLeft += 25;
  }

  addItem(name, active, options) {
    this.dataNames.push(name);
    const item = h('li', active ? 'active' : '')
      .child(name);
    item.on('click', () => {
      this.clickSwap2(item);
    })
      .on('contextmenu', (evt) => {
        if (options.mode === 'read') return;
        const {
          offsetLeft,
          offsetHeight,
        } = evt.target;
        this.contextMenu.setOffset({
          left: offsetLeft,
          bottom: offsetHeight + 1,
        });
        this.deleteEl = item;
      })
      .on('dblclick', () => {
        if (options.mode === 'read') return;
        const v = item.html();
        const input = new FormInput('auto', '');
        input.val(v);
        input.input.on('blur', ({ target }) => {
          const { value } = target;
          const nindex = this.dataNames.findIndex(it => it === v);
          this.renameItem(nindex, value);
          /*
          this.dataNames.splice(nindex, 1, value);
          this.moreEl.reset(this.dataNames);
          item.html('').child(value);
          this.updateFunc(nindex, value);
          */
        });
        item.html('')
          .child(input.el);
        input.focus();
      });
    if (active) {
      this.clickSwap(item);
    }
    this.items.push(item);
    this.menuEl.child(item);
    this.moreEl.reset(this.dataNames);
  }

  renameItem(index, value) {
    this.dataNames.splice(index, 1, value);
    this.moreEl.reset(this.dataNames);
    this.items[index].html('').child(value);
    this.updateFunc(index, value);
  }

  clear() {
    this.items.forEach((it) => {
      this.menuEl.removeChild(it.el);
    });
    this.items = [];
    this.dataNames = [];
    this.moreEl.reset(this.dataNames);
  }

  deleteItem() {
    console.log(this);
    const { activeEl, deleteEl } = this;
    if (this.items.length > 1) {
      const index = this.items.findIndex(it => it === deleteEl);
      // const currentIndex = this.items.findIndex(it => it === activeEl);
      this.items.splice(index, 1);
      this.dataNames.splice(index, 1);
      this.menuEl.removeChild(deleteEl.el);
      this.moreEl.reset(this.dataNames);
      // this.sheet.trigger('change-sheet-index', index);
      if (activeEl === deleteEl) {
        const [f] = this.items;
        this.activeEl = f;
        this.activeEl.toggle();
        return [index, 0];
      }
      return [index, -1];
    }
    return [-1];
  }

  get activeElIdx() {
    const { activeEl } = this;
    const index = this.items.findIndex(it => it === activeEl);
    return index;
  }

  showSheet(index) {
    this.clickSwap(this.items[index]);
    this.activeEl.toggle();
    this.swapFunc(index);
  }

  clickSwap2(item) {
    const index = this.items.findIndex(it => it === item);
    this.clickSwap(item);
    this.activeEl.toggle();
    this.swapFunc(index);
  }

  clickSwap(item) {
    if (this.activeEl !== null) {
      this.activeEl.toggle();
    }
    this.activeEl = item;
  }
}
