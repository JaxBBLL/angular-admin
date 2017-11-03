;
!(function(window, document, undefined) {
  var routers = [{
    path: '/home',
    page: '/views/home.html',
    title: '主页'
  }, {
    path: '/user/list',
    page: '/views/user/list.html',
    title: '列表',
    parent: '设置'
  }, {
    path: '/user/update',
    page: '/views/user/update.html',
    title: '修改',
    parent: '设置'
  }, {
    path: '/user/add',
    page: '/views/user/add.html',
    title: '添加',
    parent: '设置'
  }, {
    path: '/404',
    page: '/views/404.html',
    title: '404',
    parent: '设置'
  }]
  window.$config.routers = routers;
})(window, document)
