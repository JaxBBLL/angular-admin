;
!(function(window, document, undefined) {
  var menus = {
    'default': [{
      path: '/one',
      title: '第一个页面'
    }, {
      path: '/two',
      title: '第二个页面'
    }, {
      path: '/three',
      title: '第三个页面'
    }],
    'user': [{
      path: '/one',
      title: '第一个页面'
    }]
  }
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
    parent: '设置',
    menu: 'user'
  }, {
    path: '/404',
    page: '/views/404.html',
    title: '404',
    parent: '设置'
  }]

  var routeData = routeSet(routerMap);

  
  $router = Router(routeData).configure({
    before: function() {
    },
    notfound: function() {
      console.log('notfound')
      $state.go('/404')
    }
  });
  $router.init(); //初始化

  //  处理路由初始化的数据
  function routeSet(routerMap) {
    var result = {};
    for (var i = 0; i < routerMap.length; i++) {
      var _cb = [];
      var _menu = routerMap[i].menu || 'default';
      _cb.push(renderPage(routerMap[i].page, routerMap[i].title));
      _cb.push(renderMenu(_menu))
      result[routerMap[i].path] = _cb;
    }
    return result;
  }

  //  路由更改渲染对应的页面
  function renderPage(page, title) {
    return function() {
      document.title = title;
      $('#router-view').load(page + '?v=' + new Date().getTime())
    }
  }

  function renderMenu(name) {
    return function() {
      var menuName = $('#app-menu').data('menu')
      if (menuName === name) {
        return;
      }
      var menu = menus[name];
      var html = '';
      $.each(menu, function(i, item) {
        html += '<a href="#' + item.path + '">' + item.title + '</a>'
      })
      $('#app-menu').html(html)
      $('#app-menu').data('menu', name)
    }
  }

})(window, document)
