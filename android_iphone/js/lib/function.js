/**
 * 异步请求操作
 *
 */
/**
 *JS 数据操作类
 */
var m = {
    login: false, //登陆成功标记
    sid: 0, //保存SESSIONID
    /**
     * jquery  的方法
     */
    getJson: function(url, f, putdata){
        //http://dfimg.sinaapp.com/js.php
        var rdata = '';
        var burl = '';
        if (url.indexOf('?') > 0) {
            burl = url + "&jsoncallback=?";
        }
        else {
            burl = url + "?jsoncallback=?";
        }
        
        $.ajax({
        
            type: "POST",
            
            url: burl,
            
            data: putdata,
            
            dataType: 'jsonp',
            
            //XMLHttpRequest 对象是唯一的参数
            beforeSend: function(XMLHttpRequest){
            
                //ShowLoading();
            },
            //服务器返回数据，返回状态
            success: function(data, status){
            
                if (status == 'success') {
                    f(data);
                }
                else {
                    alert('json: ' + status);
                }
                
            },
            //请求完成后回调函数 (请求成功或失败时均调用)。参数： XMLHttpRequest 对象，成功信息字符串。
            complete: function(XMLHttpRequest, textStatus){
            
                //HideLoading();
            },
            //XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
            error: function(XMLHttpRequest, textStatus, errorThrown){
            
                //请求出错处理
            }
        });
        
    },
    
    /**
     * appcan   的方法
     */
    postJson: function(url, f, putdata){
        //http://dfimg.sinaapp.com/js.php
        var loding = arguments[3] ? true : false; //是否有加载状态
        var lodingE = arguments[4] ? arguments[4] : ''; //加载语句
        var vs = (arguments[5] > 1) ? arguments[5] : 1;
        /**
         * 获取POST 进度条
         *inOpCode：操作ID，由发起请求时传入的值（随机不重复）
         　　		 *inProgress：当有文件通过POST方式上传时，该值表示上传进度。在0到100之间
         */
        function xmlhttpmgrCallback(inOpCode, inProgress){
        
        
        }
        
        if (loding) {
            w.toast("" + lodingE + "", 1);
        }
        
        //返回数据的通用处理
        //inStatus: 返回的状态,0为接收状态，1为接收完成，-1为错误或超时
        function rcl(opid, status, result){
        
            if (status == -1) {
                alert('接收超时');
                
            }
            else {
                //加载中。。。
                if (status == 0) {
                    if (loding) {
                        uexWindow.toast(0, 5, '真的加载中啊~~', 0);
                    }
                }
                
                if (status == 1) {
                    if (loding) {
                        w.closetoastL();
                    }
                    
                    f(JSON.parse(result));
                }
                
            }
            
            
            
        }
        
        
        uexXmlHttpMgr.open(vs, "POST", url, "");
        //设置发送的值
        var i = false;
        $.each(putdata, function(k, v){
            uexXmlHttpMgr.setPostData(vs, "0", k, v);
            i = true;
        });
        
        if (i == false) {
            uexXmlHttpMgr.setPostData(vs, "0", 0, 0);
        }
        
        //发送
        uexXmlHttpMgr.onData = rcl;
        uexXmlHttpMgr.onPostProgress = xmlhttpmgrCallback;
        uexXmlHttpMgr.send(vs);
        
    }
    
    
    
};

/**
 * JS 输出类
 *
 * @param {Object} rdata
 */
var v = {
    //调试
    a: function(rdata){
        $.each(rdata, function(key, val){
            alert(key + '==>' + val);
        });
        
    }
    
    
};


/**
 *基本窗口操作
 *
 *
 */
var w = {

    /**
     * 打开个新窗口
     * wname 窗口ID
     * url 地址
     *
     */
    openW: function(wname, url){
        var inAniID = arguments[2] ? arguments[2] : 2;//inAniID: 动画ID，symbian,WP7不支持此效果，查看常量表的Window Animi ID
        var inFlag = arguments[3] ? arguments[3] : 0;//窗口类型
        var inWidth = arguments[4] ? arguments[4] : '';// 窗口宽度。接受不含小数的整数,百分数,可为空,默认为屏幕的宽度，symbian为全屏
        var inHeight = arguments[5] ? arguments[5] : '';//窗口高度。接受不含小数的整数,百分数,可为空,默认为屏幕的高度，symbian为全屏
        var animDuration = arguments[6] ? arguments[6] : 250; //动画持续时长，单位为毫秒，默认250毫秒
        uexWindow.open(wname, '0', url, inAniID, inWidth, inHeight, inFlag, animDuration);
    },
    
    /**
     *关闭屏幕当前窗口
     */
    closeW: function(){
        var dh = arguments[0] ? arguments[0] : -1;
        var animDuration = arguments[1] ? arguments[1] : 250;
        uexWindow.close(dh, animDuration);
        
    },
    
    /**
     *弹出一个非模态的消息提示框,可指定位置。
     *
     */
    toast: function(){
        var v3 = arguments[0] ? arguments[0] : '加载中...';//要提示的内容
        var v1 = arguments[1] ? arguments[1] : 0;//消息提示框显示的模式：0为没有进度条模式；1为有进度条模式。
        var v2 = arguments[2] > 0 ? arguments[2] : 5;//消息提示框在手机屏幕显示的位置。输入1-9之外的值，默认为5（symbian无效，WP7上3,6,9上不显示） 
        var v4 = arguments[3] ? arguments[3] : 0;//提示框存在时间，小于等于零或者为空时，提示框一直存在，不自动关闭。
        uexWindow.toast(v1, v2, v3, v4);
    },
    
    closetoastL: function(){
        uexWindow.closeToast();
        
    },
    
    alert: function(){
        var v1 = arguments[0] ? arguments[0] : '提示';//对话框标题。（symbian中无效）
        var v2 = arguments[1];//对话内容。
        var v3 = arguments[2] ? arguments[2] : '确定';//显示在确定按钮上的文字。（symbian中无效）
        uexWindow.alert(v1, v2, v3);
    },
    
    
    
    
    /**
     * 弹出一个包含一组选择按钮的对话框。对话框从设备屏幕底部自下而上弹出，并且最终停靠在屏幕底部。
     * 取消按钮也属于按钮组的一部分，因此，返回的按钮索引将大于等于0，小于等于inButtonLables的长度。
     *
     */
	
	actionSheet: function(){
		var button=new Array();
		button[0] = '确定';
		var v1 = arguments[0] ? arguments[0] : '警告框';  //inTitle：对话框标题。
        var v2 = arguments[1] ? arguments[1] : button  ;           //inButtonLables：选择按钮组的文本内容，数组形式。

        var f = arguments[2] ? arguments[2]  : null; //　inCancel：显示在取消按钮上的文本。
        var v3 = arguments[3] ? arguments[3] : '取消操作' ;        
		
		//判断OS
		var os = localCache('os');
		//os = JSON.parse(os);
		if(  os.indexOf('Android') >= 0 ){
			//IOS 4.3.1 不支持的说
			uexWindow.actionSheet( v1 , v3 , v2);
			if( typeof(f) == 'function' ){
			 uexWindow.cbActionSheet = f ;			
			}
		}else{
			//判断 ios
			v2.push('取消');
			w.confirm('提示',v1,v2,f);
			
		}
		
	},
	
	/**
	 *包含一个至多包含3个按钮的摸态对话框 
	 */
	confirm: function(){
		
		var button=new Array();
		button[0] = '确定';
		button[1] = '取消';
		var v1 = arguments[0] ? arguments[0] : '警告框';  //inTitle：对话框标题。
        var v2 = arguments[1] ? arguments[1] : '内容'  ;  //inMessage： 对话内容。
        var v3 = arguments[2] ? arguments[2] : button  ;  //inButtonLables：显示在按钮上的文字的集合（数组形式）
       
    
        var f = arguments[3] ? arguments[3]  : null ; //　　inMessage
 
			//IOS 4.3.1 不支持的说
			uexWindow.confirm( v1 , v2 , v3);
			if( typeof(f) == 'function' ){
			 uexWindow.cbConfirm = f ;			
			}
		
	}
	
	
	
};


/**
 *全局基本公共操作方法
 */
var c = {
	
	/**
	 * 获得事件对象 传入 event
	 */
	getthis: function( e ){
		if(e.currentTarget)
    	ch = e.currentTarget;
		else
		ch = e;
		return ch;
		
	},

    /**
     * 登陆成功保存信息
     */
    loginSet: function(rdata){
        localCache('sid', rdata.data.sid);
        localCache('userdata', rdata.data);
        localCache('date', rdata.date);
        localCache('isLogin', 1);
        return true;
        
    },
    
    //退出
    logout: function(rdata){
        delLocalCache('sid');
        delLocalCache('userdata');
        delLocalCache('date');
        delLocalCache('isLogin');
        w.openW('login', 'login.html', 11);
        return true;
        
    },
    
    /**
     *判断用户登陆超时(判断登陆) 现在时间 》 上次登陆时间+设置的超时时间
     * true 已经登陆登陆
     */
    chedkTimeOut: function(){
        var outTime = arguments[0] ? arguments[0] : Timeout;
        var status = false;
        if (localCache('isLogin')) {
            var d = new Date();
            if (parseInt(localCache('date') * 1000 + outTime * 1000) > parseInt(d.getTime())) {
                localCache('isLogin', 0);
                status = true;
            }
        }
        return status;
        
    },
    
    
    /**
     *设置定时间操作
     */
    timeOne: function(f, m){
        setTimeout(f, m);
        
    },
    
    timeN: function(f, m){
        var d = new Date();
        var id = "id_" + d.getTime();
        
        id = setInterval(f, m);
        return id;
    },
    
    ctimeN: function(id){
        clearInterval(id);
    },
    
    
    /**
     * 执行 Popover 内的JS
     */
    vp: function(){
        var p = arguments[0] ? arguments[0] : 'content';
        var f = arguments[1] ? arguments[1] : null;
        var w = arguments[2] ? arguments[2] : 'root';
        uexWindow.evaluatePopoverScript(w, p, f);
    }
    
    
    
};


var info = {
	getos: function(){		
		uexDevice.getInfo(1);
		uexDevice.cbGetInfo= function(opId,dataType,data){
			var device = JSON.parse(data);
			if( device ){
				localCache('os' , data );
			}
		}
		
	}
	
	
};


