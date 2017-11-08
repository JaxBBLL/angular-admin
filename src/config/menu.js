;
(function(window) {
  var menus = {
    'default': [{
      title: '基本元素',
      children: [{
        path: '/base/button',
        title: '按钮'
      }, {
        path: '/base/form',
        title: '表单'
      }]
    }]
  }
  window.$config.menus = menus;
})(window)
