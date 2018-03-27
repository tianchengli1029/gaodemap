/**
 *常用工具类
 */

 var WN={  
  utils : {
          /**
         * 设置pageSize
         */
        setPageSize : function(pageSize) {
          var Days = 7;
          var exp = new Date();
          exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
          document.cookie = "pageSize=" + pageSize + ";expires="
              + exp.toGMTString();
          window.location.reload();
        },
        /**
         * 获取pageSize
         */
        getPageSize : function() {
          var arr, reg = new RegExp("(^| )pageSize=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
          else
            return 10;
        },
        /**
         * 跳转
         */
        toPage : function(url) {
          window.top.location = url;
        },
        /**
         * 回退一步
         */
        goBack : function() {
          // window.location=document.referrer;
          window.history.back();
        },
        /**
         * 重载
         */
        refresh : function() {
          window.location.reload();
        },
        /**
         * 获取url参数 前后端分离用
         */
        getUrlParam : function(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if (r != null)
            return unescape(r[2]);
          return null;
        },
        formatDateYYMMdd : function(value) {
          if (value) {
            var date = new Date(value);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + "/" + m + "/" + d + "";
          }
        },
        formatDateHHMMSS : function(value) {
          if (value) {
            var date = new Date(value);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return h + ":" + minute + ":" + second + "";
          }
        },
    },
  ajax : {
    /**
     * 异步请求
     */
    ajaxAsync : function(url, type, param, fn) {
      $.ajax({
        url : url,
        type : type,
        async : true,
        data : param,
        dataType: "json",
        // beforeSend : function(request) {
        //  request.setRequestHeader("If-Modified-Since","0");
        //  request.setRequestHeader("Cache-Control","no- cache");
        // },
        success : function(res) {
          fn(res);
        },
        error : function(err) {
          console.log(url + "\n" + JSON.stringify(err))
          // alert(url + "\n" + JSON.stringify(err));
        }
      });
    },
    /**
     * 同步请求
     */
    ajaxSync : function(url, type, param, fn) {

      // if (WN.utils.isEmpty(param)) {// 防止param参数为null 赋初始值
      //   param = {};
      // }
      
      $.ajax({
        url : url,
        type : type,
        async : false,
        data : param,
        dataType: "json",
        // beforeSend : function(request) {
        //  request.setRequestHeader("If-Modified-Since","0");
        //  request.setRequestHeader("Cache-Control","no- cache");
        // },
        success : function(res) {
          fn(res);
        },
        error : function(err) {
          alert(JSON.stringify(err));
        }
      });
    },
    /**
     * Get 方法
     */
    Get : function(url, param, fn) {
      WN.ajax.ajaxAsync(url, "Get", param, fn);
    },
    /**
     * Post 方法
     */
    Post : function(url, param, fn) {
      WN.ajax.ajaxAsync(url, "POST", param, fn)
    },
    /**
     * Put 方法
     */
    Put : function(url, param, fn) {
      WN.ajax.ajaxAsync(url, "Put", param, fn)
    },
    /**
     * Delete 方法
     */
    Delete : function(url, param, fn) {
      WN.ajax.ajaxAsync(url, "Delete", param, fn)
    },
    /**
     *同步请求get 方法
     */
    GetAjaxSync : function(url, param, fn) {
      WN.ajax.ajaxSync(url, "Get", param, fn)
    }
  },
 }
 
// $(function() {
//   var Accordion = function(el, multiple) {
//     this.el = el || {};
//     this.multiple = multiple || false;

//     // Variables privadas
//     var links = this.el.find('li');
//     // Evento
//     links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
//   };

//   Accordion.prototype.dropdown = function(e) {
//     var $el = e.data.el;
//       $this = $(this);
//       $next = $this.next();

//     $next.slideToggle();
//     $this.parent().toggleClass('open');

//     if (!e.data.multiple) {
//       $el.find('.nav-second-level').not($next).slideUp().parent().removeClass('open');
//     }
//   };

//   var accordion = new Accordion($('#side-menu'), false);
//   $('.nav-second-level li').click(function () {
//     $(this).addClass('current').siblings('li').removeClass('current');
//   });
// });