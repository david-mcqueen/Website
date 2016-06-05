/**
 * Created by davidmcqueen on 10/10/2015.
 */

$(document).ready(function(){

    // Cache selectors
    var lastId,
        topMenu = $("#topMenu"),
        topMenuHeight = topMenu.outerHeight()+15,
    // All list items
        menuItems = topMenu.find("li a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function(e){
        clearActiveAttribute();
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 800);
        e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function(){
        if($(document).scrollTop()>0){
            $("header").removeClass("large").addClass("small");
        }
        else{
            $("header").removeClass("small").addClass("large");
            clearActiveAttribute();
            lastId = "";
        }

        if($("header").hasClass("small")){
            // Get container scroll position
            var fromTop = $(this).scrollTop()+topMenuHeight;


            // Get id of current scroll item
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
            if (!cur){
                debugger;
            }
            // Get the id of the current element
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                clearActiveAttribute();
                // Set active class
                menuItems.filter("[href=#"+id+"]").addClass("active");
            }
        }


    });
});



function clearActiveAttribute(){
    $( ".active" ).each(function( index ) {
        $(this).removeClass("active");
    });
}