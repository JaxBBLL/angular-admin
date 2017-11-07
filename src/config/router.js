;
(function(window) {
  var routers = [{
    path: '/home',
    page: '/views/home.html',
    title: '主页'
  }, {
    path: '/404',
    page: '/views/404.html',
    title: '404'
  }, {
    path: '/base/button',
    page: '/views/base/button.html',
    title: '按钮',
    parent: '基本元素'
  }, {
    path: '/base/form',
    page: '/views/base/form.html',
    title: '表单',
    parent: '基本元素'
  }]
  window.$config.routers = routers;
})(window)
