/***
 * 应用 content 内容切换操作
 * index 为对应页面所有切换的代码
 *
 */
var v_index = {

    p3: function(){
        zy_con("content", "login.html", 0, $$("header").offsetHeight);
        slie(3, '栏目3');
    },
    
    p4: function(){
        zy_con("content", "login2.html", 0, $$("header").offsetHeight);
        slie(4, '栏目4');
    },
    
    
    p2: function(){
        //        zy_anim_push("header1", "a-op");
        //        zy_anim_pop("header2", "a-mr");
        zy_con("content", "list.html", 0, $$("header").offsetHeight);
		
		var p2 = '<div class="btn btn-r btn-n ub ub-ac">'
 				+'<div class="ulim" onclick="c.vp(\'content\',\'c_list.showEdit()\')" >编辑</div>'
				+'</div>';
		var p1 = '';
        slie(2, '栏目2' , p2 , p1);
        
    },
    p1: function(){
    
    
        //        zy_anim_listen("header1", listen);
        //        zy_anim_push("header2", "a-mr");
        //        zy_anim_pop("header1", "a-op");
        
        
        
        slie(1, '栏目1');
        zy_con("content", "index_content.html", 0, $$("header").offsetHeight);
    }
    
}

//后退效果事件
function listen2(){
    uexLog.sendLog("listen anim event " + event.propertyName);
    
    //左侧东西复制到中间
    var lhtml = $('#header2 div[alt="left"]').html();
    var rhtml = $('#header2 div[alt="right"]').html();
    var title = $('#ltitle').text();
    
    $('#header1 div[alt="left"]').html(lhtml);
    $('#header1 div[alt="right"]').html(rhtml);
    $('#ctitle').text(title);
    
    
    $('#header1').removeClass('utra');
    $('#header2').removeClass('utra');
    
    $('#header1').removeClass('a-op');
    $('#header2').addClass('a-ml');
    
    $('#header1').addClass('utra0');
    $('#header2').addClass('utra0');
}


//前进效果事件		
function listen3(){
    //右侧东西复制到中间	
    var lhtml = $('#header3 div[alt="left"]').html();
    var rhtml = $('#header3 div[alt="right"]').html();
    var title = $('#rtitle').text();
    
    $('#header1 div[alt="left"]').html(lhtml);
    $('#header1 div[alt="right"]').html(rhtml);
    $('#ctitle').text(title);
    
    $('#header1').removeClass('utra');
    $('#header3').removeClass('utra');
    
    $('#header1').removeClass('a-op');
    $('#header3').addClass('a-mr');
    
    $('#header1').addClass('utra0');
    $('#header3').addClass('utra0');
    
    
    
}

//当前操作ID 
function slie(id, title){
    //判断操作ID 如果比前一个 大   就前进，小就后退
    //设置按钮
     var p2 = arguments[2] ? arguments[2] : '';
	 var p1 = arguments[3] ? arguments[3] : '';
    
    
    if (id > localCache('NextId')) {
    
        //设置文章或者按钮到需要滑动近来的header ;
        $('#rtitle').text(title);
        //增加按钮
        $('#header3 div[alt="left"]').html(p1);
        $('#header3 div[alt="right"]').html(p2);
        
        //前进 左边滑动
        //中间消失
        
        $('#header1').addClass('utra');
        $('#header3').addClass('utra');
        
        zy_anim_push("header1", "a-op");
        zy_anim_pop("header3", "a-mr");
        
        
    }
    else 
        if (id < localCache('NextId')) {
            //后退  右边滑动
            //设置文章或者按钮到需要滑动近来的header ;
            $('#ltitle').text(title);
            //增加按钮
            $('#header2 div[alt="left"]').html(p1);
            $('#header2 div[alt="right"]').html(p2);
            
            $('#header1').addClass('utra');
            $('#header2').addClass('utra');
            //前进 左边滑动
            //中间消失
            zy_anim_push("header1", "a-op");
            zy_anim_pop("header2", "a-ml");
            
        }
    
    localCache('NextId', id);
    
}
