window.$config = {
  v: '1.0.0',  //  html文件发布的版本
  menus: {},  //  所有的菜单
  routers: [],  //  所有的路由信息
  router: {}	//	路由的实例
}
window.$ = layui.$; // JQuery


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

;
!(function(window, document, undefined) {
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

;
!(function(window, document, undefined) {
  var menus = window.$config.menus;
  var routerMap = window.$config.routers;

  var routeData = routeSet(routerMap);

  var router = Router(routeData).configure({
    before: function() {
      console.log('before...', router.getRoute())
    },
    after: function() {
      // console.log('after...')
    },
    notfound: function() {
      console.log('notfound')
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
      console.log('on...')
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
        var h;
        if (item.path === path) {
          h = '<a href="#' + item.path + '" class="router-active">' + item.title + '</a>'
        } else {
          h = '<a href="#' + item.path + '">' + item.title + '</a>'
        }
        html += h;
      })
      $('#app-menu').html(html)
      $('#app-menu').data('menu', name)
    }
  }
  window.$config.router = router;
})(window, document)
