// 模拟后台数据
var table_data = [
  {
    id: 01,
    name: '寒冬',
    phone: '188-8888-8888',
    address: '杭州'
  },
  {
    id: 02,
    name: '汤姆',
    phone: '188-8888-8888',
    address: '北京'
  },
  {
    id: 03,
    name: '阿鹏',
    phone: '188-8888-8888',
    address: '北京'
  },
  {
    id: 04,
    name: '旭旭',
    phone: '188-8888-8888',
    address: '上海'
  }
];

(function($, window, document, undefined) {
  // 定义RenderTable类
  var RenderTable = function(elem) {
    //var self = this;
    this.table = elem.get(0);
    this.tBody = this.table.tBodies[0];
    this.select_ele = null;  //保存当前点击元素
  }
  RenderTable.prototype = {
    // 渲染DOM
    renderDOM: function() {
      var i;
      for(i = 0; i < table_data.length; i++) {
        var newTR = document.createElement('tr');
        var trDate = table_data[i];
        for(var property in trDate) {
          var newTD = document.createElement('td');
          newTD.innerHTML = trDate[property];
          newTR.appendChild(newTD);
        }
        this.tBody.appendChild(newTR);
      }
    },
    // 渲染表格的隔行变色
    renderColorTR: function(index, cls) {
      if(index % 2 === 0) {
        this.tBody_rows[index].className = cls;
      }
    },
    select: function(index) {
      if(hasClass(this.tBody_rows[index], "selected")) {
        removeClass(this.tBody_rows[index], "selected");
      }else{
        addClass(this.tBody_rows[index], "selected");
      }
    },
    inital: function() {
      this.renderDOM();
      var self = this;
      var i, j;
      this.tBody_rows = this.tBody.rows;

      for(i = 0; i < this.tBody_rows.length; i++) {
        // 遍历表格的每一行，保证都能成功渲染表格行颜色
        this.renderColorTR(i, "odd");
        // 为每行元素绑定滑入滑出时间
        this.tBody_rows[i].onmouseover = function() {
          addClass(this, 'hover');
        }
        this.tBody_rows[i].onmouseout = function() {
          removeClass(this, 'hover');
        }
        // 点击选中元素
        this.tBody_rows[i].onclick = function() {
          var index = getIndex(this, self.tBody_rows);
          var tBody_rows = [].slice.call(self.tBody_rows);
  
          self.select_ele = this;
          tBody_rows.map(function(value) {
            if(value === self.select_ele) {
              return;
            }
            removeClass(value, 'selected');
          });
          self.select(index);
          self.select_ele = null;
        };
      }
    },
    //getSelectedEle:function() {
      //alert();
      //return this.select_ele;
    //},
    constructor: RenderTable
  };

  $.fn.renderTable = function() {
    var renderTable = new RenderTable(this);
    return renderTable.inital();
  }
})($, window, document, undefined);

$(function() {
  $('#table').renderTable();
});

function getIndex(obj, nodes) {
  var result = 0;

  for (var i = 0; i < nodes.length; i++) {
    if (obj === nodes[i]) {
      result = i;
    }
  }

  return result;
};
function removeClass(obj, cls) {
  if (obj.className) {
    var arr_clsName = obj.className.split(" ");
    var iIndex = arrIndexOf(arr_clsName, cls);

    // 如果里面有这个class
    if (iIndex !== -1) {
      arr_clsName.splice(iIndex, 1);

      obj.className = arr_clsName.join(" ");
    }
  }
};
function hasClass(obj, cls) {
  var className = obj.className;

  if (className) {
    var cls_split = className.split(' ');

    if (arrIndexOf(cls_split, cls) === -1) {
      return false;
    } else {
      return true;
    }
  }
};
function addClass(obj, cls) {
  var clsName = obj.className;

  if (clsName) {
    var arr_clsName = clsName.split(" ");
    var iIndex = arrIndexOf(arr_clsName, cls);

    if (iIndex == -1) {
      obj.className += " " + cls;
    }
  } else {
    obj.className = cls;
  }
};
function arrIndexOf(arr, str) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return i;
    }
  }

  return -1;
};