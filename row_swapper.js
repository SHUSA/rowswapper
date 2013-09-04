/*!
 * RowSwapper.js
 * Original author: github.com/jnwheeler44
 * Licensed under the MIT license
 *
 * Easy swapping of table rows between 2 tables.
 */

var RowSwapper = {
  version: '0.1.0',

  setDefaults: function() {
    this.defaults = {
      listTable:    jQuery('.listTable'),
      selectTable:  jQuery('.selectTable'),
      addButton:    jQuery('.addSelectedRows'),
      removeButton: jQuery('.removeSelectedRows'),
      addClass:     'selectedRow',
      updateAttr:   'id'
    }
  },

  initialize: function(userOptions) {
    this.setDefaults();
    if (!this.isDefined(userOptions)) { userOptions = {}; }
    var options =  jQuery.extend({}, this.defaults, userOptions);

    this.listTable = options.listTable;
    this.selectTable = options.selectTable;
    this.tables = jQuery.merge(jQuery.merge([],this.listTable), this.selectTable);
    this.addButton = options.addButton;
    this.removeButton = options.removeButton;
    this.addClass = options.addClass;
    this.updateAttr = options.updateAttr;

    if (this.isDefined(options.updateField)) {
      this.updateField = options.updateField;
    }
    if (typeof options.afterAdd == 'function') {
      this.afterAdd = options.afterAdd;
    }
    if (typeof options.afterRemove == 'function') {
      this.afterRemove = options.afterRemove;
    }
    if (typeof options.afterBoth == 'function') {
      this.afterBoth = options.afterBoth;
    }
    this.addTriggers();
  },

  addTriggers: function() {
    var swapper = this;
    jQuery(swapper.tables).find(':not(thead) > tr').click(function() {
      jQuery(this).toggleClass(swapper.addClass);
    });
    swapper.addButton.click(function() {
        RowSwapper.addSelectedRows();
        return false;
    });
    swapper.removeButton.click(function() {
        RowSwapper.removeSelectedRows();
        return false;
    });
  },

  addSelectedRows: function() {
    this.swapRows(this.listTable, this.selectTable);
    if (typeof this.afterAdd == 'function') {
      this.afterAdd();
    }
  },

  removeSelectedRows: function() {
    this.swapRows(this.selectTable, this.listTable);
    if (typeof this.afterRemove == 'function') {
      this.afterRemove();
    }
  },

  swapRows: function(fromTable, toTable) {
    var swapper = this,
        selectedRows = fromTable.find('.' + swapper.addClass);

    selectedRows.removeClass(swapper.addClass).detach();
    toTable.children('tbody:last').append(selectedRows);

    if (swapper.isDefined(swapper.updateField)) {
      swapper.doFieldUpdate();
    }
    if (typeof this.afterBoth == 'function') {
      this.afterBoth();
    }
  },

  // Requires 'id' data attribute on rows
  doFieldUpdate: function() {
    var swapper = this,
        rows = this.selectTable.find('tr'),
        ids = jQuery.map(rows, function(selected,idx) { return jQuery(selected).data(swapper.updateAttr); });
    swapper.updateField.val(ids.join());
  },

  isDefined: function(obj) {
    return typeof obj !== "undefined" && obj !== null;
  }
}
