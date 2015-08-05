//*code by Jaffe(2015-04-28)*//
$(function(){

	var HOST = "http://" + location.host;
	var ROOT = HOST + '/static/css/main/h5/2015/lottery/res/';
	var URL = {
	    'mobi' : '/h5/lotterys/input_mobi',
	    'lottery' : '/h5/lotterys/run?referer=UNKNOW',
	    'myAward' : '/h5/lotterys/award_list',
	    'getAward' : '/h5/lotterys/get_award',
	    'putAward' : '/h5/lotterys/put_award',
	    'list' : '/h5/lotterys/index_data',
	    'rule' : '/h5/lotterys/activity_rule'
	};
	var OPT = {
		good : {
			1 : [1,"特等奖"],
			2 : [3,"一等奖"],
			3 : [5,"二等奖"],
			4 : [7,"三等奖"]
		},
		bad : {
			1 : [2,"再接再厉！"],
			2 : [4,"不要灰心！"],
			3 : [6,"要加油哦！"],
			4 : [8,"祝你好运！"]
		}
	};

	var $container = $(".container"),
	    $nav = $container.find("nav"),
	    $section = $container.find("section"),
	    $secLottery = $("#lottery"),
	    $secRule = $("#rule"),
	    $secMy = $("#my"),
	    $btnStart = $("#btn-start"),
	    $mobi = $("#mobi"),
	    $mask = $("#mask"),
	    act_id = $("#activity_id").val();

	var TPL = function(type,data){
	    var _tpl = '',
	    data = data || {};
	    switch (type){
	    	case "rule" : {
	    		_tpl =  '<div class="box2">'+
		    				'<h1 class="center">活动详情</h1>'+
		    				'<article>'+
		    					'<p><em>活动主题</em> 疯狂大转盘</p>'+
		    					'<p><em>活动时间</em> 2015年6月8日~30日</p>'+
		    					'<p><em>活动规则</em> </p>'+
		    					'<p>1、请确保输入启动大转盘的号码与本次登录“广东移动10086”客户端的手机号码一致。所有奖品赠送前，将复核启动大转盘号码是否在本月成功登录“广东移动10086”客户端，未符合活动规则的获奖记录将视为无效，不予赠送。</p>'+
		    					'<p>2、客户每天均有1次转盘机会，如对转到的奖品不够满意，只要不领取，次日可继续转大奖，高颜值的P7手机等着您！本月奖品限领取1次。</p>'+
		    					'<p>3、成功领取的奖品可点击“获奖查询”。不领取或领取失败视为未中奖。</p>'+
		    					'<p>4、按活动规则获奖的客户，实物奖品将在活动结束后的90个工作日内外呼安排配送，流量奖品将在活动结束后的60个工作日内赠送到账，到账时会有短信告知。4G随心王客户暂无法享受流量赠送。50M流量为广东省内2\\3\\4G通用流量，有效使用期20天。</p>'+
		    					'<p>5、请保持手机状态正常，赠送流量或外呼配送时如遇号码状态异常将无法赠送或登记，则视为放弃。</p>'+
		    				'</article>' +
	    				'</div>' + 
	    				'<div class="box2 other_box">'+
		    				'<div class="ob_hd">注：</div>'+
		    				'<article>'+
		    					'<p>1、本活动由诺基亚通信与广东移动官网联合开展。奖品由诺基亚通信统一提供并拥有解释权。赠送手机奖品的保修流程与官网在售手机一致。</p>'+
		    					'<p>2、在TD-SCDMA发展15年里，诺基亚通信将研发、市场、生产、销售、采购所以TD产业链都放在了中国，中国移动TD-LTE集采国外厂商份额第一，国际TD-LTE市场国外厂商份额第一，这便是诺基亚通信--一家国际厂商深耕TD-LTE所作出的成绩。植根中国的TD-LTE国际“小伙伴”。</p>'+
		    				'</article>' +
		    			'</div>';
				return _tpl;
	    		break;
	    	}
	    	case "popup" : {
	    		_tpl =  '<b class="close"></b>'+
	    				'<div class="popup">'+data.content+'</div>';
				return _tpl;
	    		break;
	    	}
	    	case "mobile" : {
	    		_tpl =  '<div class="mobile-form">'+
	    					'<h3>请输入“广东移动10086”<br />客户端登录号码启动大转盘</h3>'+
	    					'<p><input type="tel" id="mobile" placeholder="号码须与登陆APP号码一致" /></p>'+
	    					'<p><a href="javascript:void(0)" class="btn btn-submit">提 交</a></p>'+
	    				'</div>';
				return _tpl;
	    		break;
	    	}
	    	case "result" : {
	    		if(data.name){
		    		_tpl =  '<div class="lottery-result">'+
		    					'<h3>你真的中了，'+data.name+'求带走！</h3>'+
		    					'<p><a href="javascript:void(0)" class="btn-accept">欣然接受，跟我走吧</a></p>'+
		    					'<p><a href="javascript:void(0)" class="btn-cancel">残忍拒绝，明天再试</a></p>'+
		    					'<p class="tips">未领取成功视为未中奖，可继续抽奖!</p>'+
		    				'</div>';
	    		}else{
		    		_tpl =  '<div class="lottery-result">'+
		    					'<h3><br /><br />明天再来试试手气！</h3>'+
		    				'</div>';
	    		}
				return _tpl;
	    		break;
	    	}
	    	case "my" : {
	    		if(data.mobi){
	    			var d = data.awards;
	    			var list = "";
	    			for(var i in d){
	    				list += '<tr><td>'+d[i].award_name+'</td><td>'+d[i].join_date+'</td><td></td></tr>';
	    			}
		    		_tpl =  '<h1><b>'+data.mobi+'</b>'+'<span>如非本月“广东移动10086” 登录号码将无法获得奖品</span></h1>'+
	    					'<table>'+
		    					'<tr><th>奖品</th><th>获奖日期</th><th>备注</th></tr>'+list+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    				'</table>';
	    		}else{
		    		_tpl =  '<h1 class="center">亲，还没中过奖呢，去参加获得抽奖吧！</h1>'+
	    					'<table>'+
		    					'<tr><th>奖品</th><th>获奖日期</th><th>备注</th></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    					'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
		    				'</table>';
	    		}
				return _tpl;
	    		break;
	    	}
	    }
	}

	var showList = {
		init: function(){
			var t = this,
				ul = $(".award-show-list ul"),
				li = ul.find("li");
		    if(li.length > 1){
		    	ul.append(ul.find("li:first").clone());
		    }
			t.ul = ul,
		    t.moveIndex = 0,
		    t.animTime = 1e3,
		    t.waitTime = 3e3,
		    t.perheight = 35,
		    t.itemLength = li.length,
		    t.curTimeHandler = null,
		    t.isFirstRender = !0;
		    t.setTrans(0);
		    t.start(t.waitTime);
		},
	    tran: function(e, t, n){
	        if(n){
	        	e.removeClass("normal");
	        }else{
	        	e.addClass("normal");
	        }
	        e.css('margin-top',"-" + t + "px");
	    },
	    setTrans: function(e, n) {
	        var t = this;
	        t.moveIndex = e;
	        var i = e * t.perheight;
	        t.tran(t.ul, i, n)
	    },
	    process: function() {
	        var t = this,
	        e = t.moveIndex + 1;
	        e <= t.itemLength && t.setTrans(e, t.animTime / 1e3),
	        e >= t.itemLength ? t.curTimeHandler = setTimeout(function() {
	            t.setTrans(0),
	            t.start(t.waitTime)
	        },
	        t.animTime) : t.start(t.waitTime + t.animTime)
	    },
	    stop: function() {
	        var t = this;
	        t.curTimeHandler && (clearTimeout(t.curTimeHandler), t.curTimeHandler = null)
	    },
	    start: function(e) {
	        var t = this;
	        t.curTimeHandler = setTimeout(function() {
	            t.process()
	        },
	        e || t.waitTime)
	    }

	}

	function isHTMLEmpty($obj){
	    if($obj.html().trim()){
	        return false;
	    }
	    return true;
	}

	function isEmpty($obj,$tip){
	    if($obj.val()){
	        return false;
	    }
	    alert($tip);
	    return true;
	}

	function checkMobile($obj){
	    if(isEmpty($obj,"请先填写您的手机号码！")){return false;}
	    if(!(/^\d{11}$/.test($obj.val()))){alert("您输入的号码有误，请重新输入！"); return false;}
	    return true;
	}

	function startLottery(result,callback){
		result = result || 0;
		if(result>0){
			result = OPT.good[result][0];
		}else{
			var ram = Math.floor(Math.random() * 4) + 1;
			result = OPT.bad[ram][0];
		}
		var loop = 6,    //转动圈数
			time = 8000, //转动时间
			deg = (result==0 ? 360*loop : 360*loop + 360/8*result - 360/16);
		$("#award-point").rotate({ 　
	　　　　  angle:0,  //起始角度
	　　　　　animateTo:deg,  //结束的角度
	　　　　　duration: time, 
	　　　　　callback:callback, //回调函数
	　　　　　easing:$.easing.easeOutSine // $.easing.easeInOutExpo 运动的效果，需要引用jquery.easing.min.js的文件
	　  });
	}

	function getAwardList(){
		var a = $secLottery.find(".award-box");
		var o = $(".award-show-list ul");
		var url = URL["list"];
        $.post(url,{'activity_id':act_id},function(r){
            if(r && r.code==0){
            	var d = r.data;
            	var tpl = '';
            	var tpl2 = '';
            	for(var i in d){
            		tpl += '<li><span>'+d[i].name+'</span>'+d[i].count+'名</li>';
            		tpl2 += '<span>'+d[i].name+'</span>';
            	}
            	o.html(tpl);
            	a.prepend(tpl2);
				showList.init();
            }else{
                console.log(r.msg);
            }
        },"json");
	}
	getAwardList();

	$nav.on("click",'a',function(e){
		e.preventDefault();
		var t = $(this);
	    var obj = t.attr("for");
	    var back = '<a href="javascript:void(0)" for="back">返回首页</a>';
	    $nav.find("a").attr("style","");
	    t.hide();
	    switch (obj){
	        case "back" : {
	            $section.hide(function(){
	            	t.remove();
	            	$secLottery.slideDown();
	            });
	            break;
	        }
	        case "my" : {
            	if(isHTMLEmpty($secMy)){
					if(!$mobi.val()){
						$mask.html(TPL("popup",{"content":TPL("mobile")})).show();
						$mask.find(".popup").addClass("nobg");
						$mask.find(".btn-submit").addClass("for-my");
						return;
					}
			    	var url = URL["myAward"];
			    	var mobi = $mobi.val();
			        $.post(url,{'mobi':mobi,'activity_id':act_id},function(r){
			            if(r && r.code==0){
			            	if(r.data.awards.length>0){
			            		var d = {};
			            		d["mobi"] = mobi;
			            		d["awards"] = r.data.awards;
			            		$secMy.html(TPL("my",d));
			            	}else{
			            		$secMy.html(TPL("my"));
			            	}
			            }else{
			                alert(r.msg);
			            }
			        },"json");
            	}
	        	if($nav.find("a[for='back']").length == 0) $nav.prepend(back);
	            $section.hide(function(){
	            	setTimeout(function(){$secMy.slideDown()},500);
	            });
	            break;
	        }
	        case "rule" : {
	        	if($nav.find("a[for='back']").length == 0) $nav.prepend(back);
	        	if(isHTMLEmpty($secRule)) $secRule.html(TPL("rule"));
	            $section.hide(function(){
	            	setTimeout(function(){$secRule.slideDown()},500);
	            });
                var url = URL["rule"];
                var mobi = $mobi.val();
                $.post(url,{'mobi':mobi,'activity_id':act_id},function(r){
                    if(r && r.code==0){
                    }else{
                        //alert(r.msg);
                    }
                },"json");
	            break;
	        }
	    }
	});

	$btnStart.on("click",function(){
		var $t = $(this);
		if($t.hasClass("locked")) return;
		if(!$mobi.val()){
			$mask.html(TPL("popup",{"content":TPL("mobile")})).show();
			$mask.find(".popup").addClass("nobg");
			return;
		}
    	var url = URL["lottery"];
    	$t.addClass("locked");
        $.post(url,{'mobi':$mobi.val(),'activity_id':act_id},function(r){
            if(r && r.code==0){
            	if(r.data.level > 0){
					startLottery(r.data.level,function(){
						$t.removeClass("locked");
						$mask.html(TPL("popup",{"content":TPL("result",{"name":r.data.name})})).show();
						$mask.find(".btn-accept").attr({"id":r.data.id,"aid":r.data.lottery_award_id});
					})
            	}else{
					startLottery(0,function(){
						$t.removeClass("locked");
						$mask.html(TPL("popup",{"content":TPL("result")})).show().one("click",function(){$mask.find(".close").trigger("click")});
					})
            	}
            }else if(r && r.code==11){
				$t.removeClass("locked");
				$mask.html(TPL("popup",{"content":TPL("result")})).show().one("click",function(){$mask.find(".close").trigger("click")});
            }else if(r && r.code==12){
				$t.removeClass("locked");
				$mask.html(TPL("popup",{"content":"<p>您本月已领取过奖品，下月再来逛逛啦！</p>"})).show().one("click",function(){$mask.find(".close").trigger("click")});
            }else{
                alert(r.msg);
            }
        },"json");
	});

	$mask.on("click",".btn-submit",function(){
		var $t = $(this);
		var $mobile = $mask.find("#mobile");
		if($t.hasClass("locked")) return;
	    if(checkMobile($mobile)){
	    	var url = URL["mobi"];
	    	var mobi = $mobile.val().trim();
	    	$t.addClass("locked");
	        $.post(url,{'mobi':mobi,'activity_id':act_id},function(r){
	            $t.removeClass("locked");
	            if(r && r.code==0){
	            	$mobi.val(mobi);
	            	$mask.find(".close").trigger("click");
	                alert("号码登记成功！");
	                if($t.hasClass("for-my")){
	                	$nav.find("a[for='my']").trigger("click");
	                }else{
	                	$btnStart.trigger("click");
	                }
	            }else{
	                alert(r.msg);
	            }
	        },"json");
	    }
	});

	$mask.on("click",".btn-accept",function(){
		var $t = $(this);
		if($t.hasClass("locked")) return;
    	var url = URL["getAward"];
    	var mobi = $mobi.val();
    	var id = $t.attr("id");
    	var aid = $t.attr("aid");
    	$t.addClass("locked");
        $.post(url,{'mobi':mobi,'id':id,'lotterys_award_id':aid,'activity_id':act_id},function(r){
            $t.removeClass("locked");
            if(r && r.code==0){
            	$mask.find(".close").trigger("click");
                alert("恭喜您，奖品领取成功！");
                $nav.find("a[for='my']").trigger("click");
            }else{
                alert(r.msg);
            }
        },"json");
	});

	$mask.on("click",".btn-cancel",function(){
		var $t = $(this);
		if($t.hasClass("locked")) return;
    	var url = URL["putAward"];
    	var mobi = $mobi.val();
    	$t.addClass("locked");
        $.post(url,{'mobi':mobi,'activity_id':act_id},function(r){
            $t.removeClass("locked");
            if(r && r.code==0){
            	$mask.find(".close").trigger("click");
                alert("您已放弃了本次奖品，明天再来试试运气吧！");
                $nav.find("a[for='my']").trigger("click");
            }else{
                alert(r.msg);
            }
        },"json");
	});

	$mask.on("click",".close",function(){
		$mask.empty().hide();
	});


});