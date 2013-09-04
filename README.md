RowSwapper-js
=============

Easy table row swapping between 2 tables.  Requires jQuery.

## What it does
Allows swapping of rows between 2 tables via highlighting and add/remove buttons.

## Easy Usage
* Make a table with your main list and add a class ```listTable```
* Make a second table to populate from the main list and add class ```selectTable```
* Add an element with the class ```addSelectedRows``` for Table 1 >
  Table 2 movement
* Add an element with the class ```removeSelectedRows``` for Table 2 >
  Table 1 movement
* To style the selected rows, use the class ```selectedRow```
* Initialize the row swapper:
```
RowSwapper.initialize();
```

## Options
The default settings/classes can be overriden by passing in options to
the initialize function
* listTable (jQuery element)
* selectTable (jQuery element)
* addButton (jQuery element)
* removeButton (jQuery element)
* addClass (string- name of css class to apply to clicked row)

### Callbacks an be passed in with the options
* afterAdd (function- takes place after adding rows)
* afterRemove (function- takes place after removing rows)
* afterBoth (function- takes place after both adding and removing rows)

Example:
```
RowSwapper.initialize({
  listTable:      $('#oldList'),
  selectedTable:  $('#newList'),
  addButton:      $('img#add'),
  removeButton:   $('a#removeRows'),
  afterAdd:      function() {
    $('#newList').reSort();
  }
});
```

### An input can be sent to update with row attributes
If you would like to update a field with a joined array of data
attributes, pass in ```updateField```.  It will use data-id as default,
but can take any option via ```updateAttr```.

Example:
```
<tr data-name='My Name'>My Name - 1/2/2013</tr>

RowSwapper.initialize({
  listTable:      $('#oldList'),
  selectedTable:  $('#newList'),
  updateField:    $('#temporary_names'),
  updateAttr:     $('name')
});
```
