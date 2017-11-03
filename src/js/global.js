/**
 * 全局变量和方法
 */

var $router, // 路由实例对象
  $ = layui.$, // JQuery
  $menus, //  所有的菜单
  $routerMap, //  所有的路由
  $state, //  补充的路由方法对象
  $v = '1.0.0'; //  资源文件发布的版本

$state = {
  //  获取当前路由地址
  path: function() {
    var str = $router.getRoute().join('/');
    return str.split('?')[0];
  },
  // 获取路由的参数
  query: function() {
    var str = $router.getRoute().join('/');
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
    $router.setRoute(res)
  }
}

$menus = {
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

$routerMap = [{
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
