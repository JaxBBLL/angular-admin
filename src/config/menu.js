;
!(function(window, document, undefined) {
  var menus = {
    'default': [{
      path: '/user/list',
      title: '列表'
    }, {
      path: '/user/update',
      title: '修改'
    }, {
      path: '/user/add',
      title: '添加'
    }],
    'user': [{
      path: '/one',
      title: '第一个页面'
    }, {
      path: '/two',
      title: '第二个页面'
    }]
  }
  window.$config.menus = menus;
})(window, document)
