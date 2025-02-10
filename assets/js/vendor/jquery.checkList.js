(function($) {
  $.widget("ui.checkList", {
    options: {
      listItems : [],
      selectedItems: [],
      effect: 'blink',
      onChange: {},
      objList: '',
      icount: 0,
    },

    _create: function() {
      var self = this, o = self.options, el = self.element;
      var placeholder = "Search List";

      // generate outer div
      var container = $('<div/>').addClass('search-list');

      // generate toolbar
      var toolbar = $('<div/>').addClass('toolbar');

      var txtfilter = $('<input/>').attr({type:'text', placeholder: placeholder}).addClass('txtFilter').keyup(function(){
        self._filter($(this).val());
      });

      toolbar.append($('<div/>').addClass('filterbox').append(txtfilter));

      // generate list table object
      o.objList = $('<ul role="group" aria-labelledby="checkboxGroup1"/>').addClass('ama__list filter');

      container.append(toolbar);
      container.append(o.objList);
      el.append(container);

      self.loadList();
    },

    _addItem: function(listItem){
      var self = this, o = self.options, el = self.element;

      var itemId = 'itm' + (o.icount++);	// generate item id
      var itm = $('<li role="menuitem" />');
      var chk = $('<input role="checkbox" />').attr('type','checkbox').attr('id',itemId)
        .addClass('chk')
        .attr('data-text',listItem.text)
        .attr('data-value',listItem.value);
      var label = $('<label />').attr('for',itemId).text(listItem.text);

      itm.append(chk, label);
      o.objList.append(itm);

      // bind selection-change
      el.delegate('.chk','click', function(){
        self._selChange();
      });
    },


    loadList: function(){
      var self = this, o = self.options, el = self.element;

      o.objList.empty().hide();

      $.each(o.listItems,function(){
        self._addItem(this);
      });
    },

    _selChange: function(){
      var self = this, o = self.options, el = self.element;

      // empty selection
      o.selectedItems = [];

      // scan elements, find checked ones
      o.objList.find('.chk').each(function(){

        if($(this).prop('checked')){
          o.selectedItems.push({
            text: $(this).attr('data-text'),
            value: $(this).attr('data-value')
          });

          $(this).parent().addClass('highlight').siblings().addClass('highlight');
        } else {
          $(this).parent().removeClass('highlight').siblings().removeClass('highlight');
        }
      });

      // fire onChange event
      o.onChange.call();
    },

    _filter: function(filter){
      var self = this, o = self.options;

      o.objList.find('.chk').each(function(){

        if($(this).attr('data-text').toLowerCase().indexOf(filter.toLowerCase()) > -1)
        {
          $(this).parent().show();
          $(this).parent().parent().hide();
        }
        else{
          $(this).parent().hide();
          $(this).parent().parent().show();
        }
      });
    },


    getSelection: function(){
      var self = this,
        o = self.options
      return o.selectedItems;
    },

    setData: function(dataModel){
      var self = this,
        o = self.options
      o.listItems = dataModel;
      self.loadList();
      self._selChange();
    }
  });
})($);
