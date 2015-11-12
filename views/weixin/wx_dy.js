$(function() {
    var api_host = "http://pass.mtedu.com";
    mt.views.wx_dy = Class.create(mt.BaseView,{
        initialize : function() {
            this.container = $("#page-wrapper");
        },
        loadData:function(response){
            var items = [];
            var list = response.data;
            this.container.html("wx_dy当前通道签到数据："+list.length);
        },
        run : function(moduleId){
            this.container.html('main:'+moduleId);
            $.get(api_host+'/course/1107/students',this.loadData.bind(this));
        },
        stop : function(){
            if(this.container){
                $(this.container).html('');
            }
        }
    });
});
