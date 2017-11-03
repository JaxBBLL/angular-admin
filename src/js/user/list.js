    var datas = [{
      name: '爱丽丝',
      age: '23',
      address: '河北莫河市',
      books: [
        '《欺骗的艺术》',
        '《入侵的艺术》',
        '《毁灭世界》',
      ]
    }, {
      name: '杨哥',
      age: '27',
      address: '湖南衡阳',
      books: [
        '《生活的艺术》'
      ]
    }, {
      name: '淋浴',
      address: '广州梅州',
      books: [
        '《炒菜的艺术》'
      ]
    }];
    //    自定义方法 ----内联helper
    Handlebars.registerHelper("chinese", function(value) {
      var arr = ['一', '二', '三'];
      if (this.books && this.books.length >= 2) {
        this.blue = 1;
      }
      return arr[value]
    });
    Handlebars.registerHelper("addone", function(value) {
      return value + 1
    });
    //    块处理方法 ---块helper
    Handlebars.registerHelper("isfirst", function(value, options) {
      if (value === 0) {
        return options.fn(this)
      }
    });
    //    Handlebars.registerHelper("isblue", function (value, options) {
    //        if (value && value.length>=2){
    //            return options.fn(this)
    //        }
    //    });
    var s = $('#test-hbs').html();
    var t = Handlebars.compile(s);
    var h = t(datas);
    $('#hbs-exemple').html(h);
