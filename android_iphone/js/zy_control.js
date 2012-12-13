function zy_fix(header,footer,run,cb)
    {
        window.uexOnload = function(type){	
        	
         	switch(type)
      		{
      			case 0:
      			{
    	  			if(header)
    	  			{
    	  				
    	  				var ho = document.getElementById(header);
    	  				ho.style.fontSize=window.getComputedStyle(ho,null).fontSize;
    	  				if(ho){
    	  					uexWindow.openSlibing("1", "2", "header.html", ho.outerHTML, "", ho.offsetHeight);
    	  				}
    	  					
    	  			}
    	  			if(footer) 			
    	  			{
    	  				var fo = document.getElementById(footer);
    	  				fo.style.fontSize=window.getComputedStyle(fo,null).fontSize;
    	  				if(fo){
    	  					uexWindow.openSlibing("2", "2", "footer.html", fo.outerHTML, "", fo.offsetHeight);
    	  				}
    	  					
    	  			}
      			}
      			break;
      			case 1:
      				var ao=document.getElementById(header);
      				if(ao)
      				{
      					uexWindow.showSlibing("1");
      				}
      				break;
      			case 2:
      				var bo=document.getElementById(footer);
      				if(bo)
      				{
       					uexWindow.showSlibing("2");
      				}
      				break;
          	}
      	};
      	window.uexOnshow=function(type)
      	{
      		switch(type)
      		{
				case 1:
					var ao=document.getElementById(header);
					if(ao)
					{
						ao.style.display="none";
					}
					if(!footer && cb)
						cb();
					break;
				case 2:
					var bo=document.getElementById(footer);
					if(bo)
					{
						bo.style.display="none";
					}
					if(cb)
						cb();
					break;
      		}
      	};
      	if(run)
		{
      		window.uexOnload(0);
		}
    }
	
function zy_selectmenu(id){
    var sl = document.getElementById(id);
    if (sl) {
        var sp = sl.parentElement; //<span>
        if (sp) {
            var ch = sp.getElementsByTagName("div")[0];
            var t = sl.options[sl.selectedIndex].text;
            if (ch) {
                ch.innerHTML = t;
            }
        }
    }
}

function zy_for(e, cb){
	var ch;
	if(e.currentTarget)
    	ch = e.currentTarget.previousElementSibling;
	else
		ch = e.previousElementSibling;
    if (ch.nodeName == "INPUT") {
        if (ch.type == "checkbox") 
            ch.checked = !ch.checked;
        if (ch.type == "radio" && !ch.checked) 
            ch.checked = "checked";
        
    }
    if (cb) 
        cb(e, ch.checked);
}


function zy_fold(e, col){
    var a = e.currentTarget.nextElementSibling;
    if (a.nodeName == "DIV") {
        if (col) 
            a.className = a.className.replace("col-c", "");
        else 
            a.className += ' col-c';
    }
}

function zy_touch(c, f){
	
    var t = event.currentTarget;
    if (!t.zTouch) {
        t.zTouch = new zyClick(t, f, c);
        t.zTouch._touchStart(event);
    }
}

function zy_parse(){
    var params = {};
    var loc = String(document.location);
    if (loc.indexOf("?") > 0) 
        loc = loc.substr(loc.indexOf('?') + 1);
    else 
        loc = uexWindow.getUrlQuery();
    var pieces = loc.split('&');
    params.keys = [];
    for (var i = 0; i < pieces.length; i += 1) {
        var keyVal = pieces[i].split('=');
        params[keyVal[0]] = decodeURIComponent(keyVal[1]);
        params.keys.push(keyVal[0]);
    }
    return params;
}

function $$(id)
{
	return document.getElementById(id);
}
function int(s)
{
	return parseInt(s);
}

function zy_con(id,url,x,y)
{
	var s=window.getComputedStyle($$(id),null);
	uexWindow.openPopover(id,"0",url,"",int(x),int(y),int(s.width),int(s.height),int(s.fontSize),"0");
}
function zy_resize(id,x,y)
{
	var s=window.getComputedStyle($$(id),null);
	uexWindow.setPopoverFrame(id,int(x),int(y),int(s.width),int(s.height));	
}

function zy_init()
{
	if(window.navigator.platform=="Win32")
		document.body.style.fontSize=window.localStorage["defaultfontsize"];
}
