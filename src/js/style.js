window.$config = {
  v: '1.0.0',  //  html文件发布的版本
  menus: {},  //  所有的菜单
  routers: [],  //  所有的路由信息
  router: {}	//	路由的实例
}
window.$ = layui.$; // JQuery


;
(function(window) {
  var menus = {
    'default': [{
      title: '任务管理',
      children: [{
        path: '/user/add',
        title: '任务发布'
      }, {
        path: '/user/list',
        title: '任务管理'
      }]
    }]
  }
  window.$config.menus = menus;
})(window)

;
(function(window, document, undefined) {
  var state = {
    //  获取当前路由地址
    path: function() {
      var str = window.$config.router.getRoute().join('/');
      return str.split('?')[0];
    },
    // 获取路由的参数
    query: function() {
      var str = window.$config.router.getRoute().join('/');
      str = str.split('?')[1] || ''; // 如果没有参数返回空字符
      var arr = str.split('&'); //  得到key，value值对应的数组
      var query = {};
      for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split('=')[0];
        var value = arr[i].split('=')[1];
        query[key] = value;
      }
      return query;
    },
    // 跳转方法 go('/one', {id: 10})
    go: function(path, query) {
      var tmp = '';
      if (query) {
        for (var k in query) {
          tmp += '&' + k + '=' + query[k]
        }
        tmp = '?' + tmp.substr(1)
      }
      var res = path + tmp;
      window.$config.router.setRoute(res)
    }
  }
  window.$state = state; // 补充的路由方法对象

})(window, document)


;
(function(window) {
  var routers = [{
    path: '/home',
    page: '/views/home.html',
    title: '主页'
  }, {
    path: '/404',
    page: '/views/404.html',
    title: '404',
    parent: '设置'
  }, {
    path: '/user/add',
    page: '/views/user/add.html',
    title: '添加',
    parent: '设置'
  }, {
    path: '/user/list',
    page: '/views/user/list.html',
    title: '列表',
    parent: '设置'
  }]
  window.$config.routers = routers;
})(window)

;
(function(window, document, undefined) {
  var menus = window.$config.menus;
  var routerMap = window.$config.routers;

  var routeData = routeSet(routerMap);

  var router = Router(routeData).configure({
    before: function() {},
    after: function() {
      // console.log('after...')
    },
    notfound: function() {
      $state.go('/404')
    }
  });
  router.init(); //初始化

  //  处理路由初始化的数据
  function routeSet(routerMap) {
    var result = {};
    for (var i = 0; i < routerMap.length; i++) {
      var _cb = [];
      var _menu = routerMap[i].menu || 'default';
      var _path = routerMap[i].path;
      var _page = routerMap[i].page;
      var _title = routerMap[i].title;
      _cb.push(renderPage(_page, _title, _path));
      _cb.push(renderMenu(_menu, _path))
      result[routerMap[i].path] = _cb;
    }
    return result;
  }

  //  路由更改渲染对应的页面
  function renderPage(page, title, path) {
    return function() {
      document.title = title;
      $('#router-view').load(page + '?v=' + window.$config.v)
      $('#app-menu a').removeClass('router-active')
      $('#app-menu a[href="#' + path + '"]').addClass('router-active')
    }
  }

  function renderMenu(name, path) {
    return function() {
      var menuName = $('#app-menu').data('menu')
      if (menuName === name) {
        return;
      }
      var menu = menus[name];
      var html = '';
      $.each(menu, function(i, item) {
        var li = '',
          dd = '';
        $.each(item.children, function(k, cur) {
          if (cur.path === path) {
            dd += '<dd><a href="#' + cur.path + '" class="router-active">' + cur.title + '</a></dd>'
          } else {
            dd += '<dd><a href="#' + cur.path + '">' + cur.title + '</a></dd>';
          }
        })
        li = '<li class="layui-nav-item layui-nav-itemed">' +
          '<a href="javascript:;">' + item.title + '</a>' +
          '<dl class="layui-nav-child">' + dd + '</dl></li>';
        html += li;
      })
      console.log('html', html)
      $('#app-menu').html(html)
      $('#app-menu').data('menu', name)
    }
  }
  window.$config.router = router;
})(window, document)
