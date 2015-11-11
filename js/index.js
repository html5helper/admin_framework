var mt_event = new (Class.create(EventDispatcher,{
    initialize : function() {
        window.addEventListener('message', function(e){
            this.dispatchEvent({name:'window.message',data:e.data});
        }.bind(this), false);
    },
    postMessage : function(frame,data,origin){
        origin = origin|"*";
        if(frame.postMessage){
            frame.postMessage(data,origin);
        }
    }
}));
//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
function renderMenu() {
    $('#side-menu').metisMenu();
    
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
}

$(function() {
    renderMenu();
    var defaultView = Class.create(mt.DefaultView,{
        initialize : function() {
            this.container = $("#module_title");
        },
        run : function(moduleId){
            this.container.html(moduleId);
        },
        stop : function(){
            if(this.container){
                $(this.container).html('');
            }
        }
    });
    var admin = new mt.AdminFramework($("#side-menu li a"),defaultView);
});
