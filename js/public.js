!(function(window, document, $, undefined) {
  var map = [{
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

  var routes = {};
  for (var i = 0; i < map.length; i++) {
    routes[map[i].path] = renderComponent(map[i].page, map[i].title);
  }
  var router = Router(routes).configure({
    before: function() {
      console.log('router', router)
      console.log('before', arguments)
    },
    notfound: function() {
      console.log('notfound')
    }
  });
  // var router = Router(routes);
  router.init(); //初始化

  
  //	路由更改渲染对应的页面
  function renderComponent(page, title) {
    return function() {
    	var hash = window.location
    	console.log('hash', router);
    	document.title = title;
    	$('#router-view').load(page + '?v=' + new Date().getTime()) 
    }
  }

})(window, document, layui.jquery)
