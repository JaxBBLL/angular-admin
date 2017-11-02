!(function(window, document, undefined) {
  var routerMap = [{
    path: '/one',
    page: '/views/one.html',
    title: '第一个页面',
    parent: '设置'
  }, {
    path: '/two',
    page: '/views/two.html',
    title: '第二个页面',
    parent: '设置'
  }, {
    path: '/three',
    page: '/views/three.html',
    title: '第三个页面',
    parent: '设置'
  }]

  var routeData = {};
  for (var i = 0; i < routerMap.length; i++) {
    routeData[routerMap[i].path] = renderPage(routerMap[i].page, routerMap[i].title);
  }
  $router = Router(routeData).configure({
    before: function() {
      console.log('$router', $router)
    },
    notfound: function() {
      console.log('notfound')
    }
  });
  $router.init(); //初始化


  //  路由更改渲染对应的页面
  function renderPage(page, title) {
    return function() {
      document.title = title;
      $('#router-view').load(page + '?v=' + new Date().getTime())
    }
  }

})(window, document)
