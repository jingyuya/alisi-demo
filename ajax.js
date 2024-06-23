function ajax(options){
    //设置默认值
    var defaults = {
        type:'get',
        url:'',
        data:{},
        header:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        success:function(){},
        error:function(){}
    }
    //如果options不为空，则覆盖defaults属性
    Object.assign(defaults,options);
    

    var xhr = new XMLHttpRequest();

    //拼接请求参数的变量
    var params = '';
    //循环用户传递进来的对象格式参数
    for (const key in defaults.data) {
        //格式转换
        params += key + '=' + defaults.data[key] + '&';
    }
    //将字符串最后的&去掉
    params = params.substr(0,params.length-1);
    if(defaults.type == 'get'){
        defaults.url = defaults.url + '?' + params;
    }

    xhr.open(defaults.type, defaults.url);
    
    //按照请求方式设置发送请求
   if(defaults.type == 'get'){
        xhr.send();
   }else{
        var contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        //判断用户希望的请求参数格式
        if(contentType == 'application/x-www-form-urlencoded'){
            //params传递
            xhr.send(params);
        }else{
            //json格式传递(JSON对象要转成JSON字符串)
            xhr.send(JSON.stringify(defaults.data));
        }
        
   }

   //监听xhr下面的onload事件，当xhr对象接收完响应后数据触发
    xhr.onload = function(req,res){
        //获取相应头中的数据
        var contentType = xhr.getResponseHeader('Content-Type');
        var responseText = xhr.responseText;
        if(contentType.includes('application/json')){
            //将JSON字符串转成JSON对象
            responseText = JSON.parse(responseText);
        }
        
        //建议将xhr返回，这个里面信息很多
        if(xhr.status == 200){
            defaults.success(responseText,xhr);
        }else{
            defaults.error(responseText,xhr);
        }
        
    }
}