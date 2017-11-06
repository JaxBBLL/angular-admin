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
            dd += '<dd><a href="#' + cur.path + '" class="router-active" style="padding-left:40px;">' + cur.title + '</a></dd>'
          } else {
            dd += '<dd><a href="#' + cur.path + '" style="padding-left:40px;">' + cur.title + '</a></dd>';
          }
        })
        li = '<li class="layui-nav-item layui-nav-itemed">' +
          '<a href="javascript:;" style="cursor:default"><i class="layui-icon">&#xe609;</i> ' + item.title + '</a>' +
          '<dl class="layui-nav-child">' + dd + '</dl></li>';
        html += li;
      })
      $('#app-menu').html(html)
      $('#app-menu').data('menu', name)
    }
  }
  window.$config.router = router;
})(window, document)
