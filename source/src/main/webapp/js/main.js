(function ($) {
    $(document).ready(function () {


        /*----------------------------------------------------*/
        /*	Sticky Header
         /*----------------------------------------------------*/
        var stickyheader = true; // set false to disable or true to enable sticky header
        if (stickyheader == true) {
            var logo = $('#logo'),
                header = $('#header'),
                menu = $('.menu ul > li > a');
            var smallHeight = 100, // set compact header height
                durationAnim = 500, // animation speed
                defaultHeight = parseInt(header.css('height')),
                defLogoMarginTop = parseInt(logo.css('margin-top')),
                defMenuPaddingTop = parseInt(menu.css('padding-top')),
                defMenuPaddingBottom = parseInt(menu.css('padding-bottom')),
                small_height = defaultHeight - smallHeight;
            $("#header").css({
                position: "fixed"
            });

            var stickyValue = defaultHeight - 20;

            function stickyPosition(val, body, header) {
                $(header).css({
                    marginTop: val
                });
                $(body).css({
                    paddingTop: val
                });
            }

            stickyPosition(-stickyValue, null, "#header");
            stickyPosition(stickyValue, "body", null);

            function stickymenu() {
                var base = this,
                    offset = $(window).scrollTop(), // Get how much of the window is scrolled
                    header = $('#header'),
                    src = logo.find('img').attr('src');

                var menuPaddingTop = defMenuPaddingTop - small_height / 2;
                menuPaddingBottom = defMenuPaddingBottom - small_height / 2,
                    logoMarginTop = defLogoMarginTop - 1 - small_height / 2;

                if ($(window).width() > 768) {
                    if (offset > 70) { // if it is over 60px (the initial width)
                        if (!header.hasClass('compact')) {
                            header.animate({
                                height: defaultHeight - small_height
                            }, {
                                queue: false,
                                duration: durationAnim,
                                complete: function () {
                                    header.addClass('compact').css("overflow", "visible");
                                }
                            });
                            logo.animate({
                                marginTop: logoMarginTop
                            }, {
                                queue: false,
                                duration: durationAnim
                            });
                            menu.animate({
                                paddingTop: menuPaddingTop,
                                paddingBottom: menuPaddingBottom,
                                margin: 0
                            }, {
                                queue: false,
                                duration: durationAnim
                            });
                        }
                    } else if (offset > -1 && offset < 60) {
                        header.animate({
                            height: defaultHeight,
                        }, {
                            queue: false,
                            duration: durationAnim,
                            complete: function () {
                                header.removeClass('compact').css("overflow", "visible");
                            }
                        });
                        logo.stop().animate({
                            marginTop: defLogoMarginTop
                        }, {
                            queue: false,
                            duration: durationAnim
                        });
                        menu.animate({
                            paddingTop: defMenuPaddingTop,
                            paddingBottom: defMenuPaddingBottom,
                        }, {
                            queue: false,
                            duration: durationAnim
                        });
                    }
                }
            }

            stickymenu();
            $(window).scroll(function () {
                stickymenu();
            });

            // sticky header reset for mobile
            $(window).resize(function () {
                var winWidth = $(window).width();
                if (winWidth < 768) {
                    $('#logo').css('marginTop', '');
                    $('#header').css('height', '').removeClass('compact');
                    $("#header").css({
                        position: ""
                    });
                    $('.menu ul > li > a').css({
                        'paddingTop': '',
                        'paddingBottom': '',
                    });

                    stickyPosition(null, null, "#header");
                    stickyPosition(null, "body", null);
                } else {
                    stickymenu();
                    stickyPosition(-stickyValue, null, "#header");
                    stickyPosition(stickyValue, "body", null);
                    $("#header").css({
                        position: "fixed"
                    });
                }
            });
        }


        /*----------------------------------------------------*/
        /*	Navigation
         /*----------------------------------------------------*/

        $('.menu ul').superfish({
            delay: 100, // one second delay on mouseout
            speed: 500, // animation speed
            speedOut: 200, // out animation speed
            animation: {
                opacity: 'show',
                height: 'show'
            } // fade-in and slide-down animation
        });


    });

})(this.jQuery);

$(document).ready(function () {
    /*	Slider--------------------------------------------*/
    /*----------------------------------------------------*/
    $('.flexslider').flexslider({
        animation: 'slide',
        slideshowSpeed: 3000,
        prevText: '',
        nextText: '',
        controlNav: false
    });

    //When page loads...
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    //On Click Event
    $("ul.tabs li").click(function () {

        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
    });


    // BUTTON UP
    var btnUp = $('<div/>', {
        'class': 'btntoTop'
    });
    btnUp.appendTo('body');
    $(document)
        .on('click', '.btntoTop', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 700);
        });

    $(window)
        .on('scroll', function () {
            if ($(this).scrollTop() > 200)
                $('.btntoTop').addClass('active');
            else
                $('.btntoTop').removeClass('active');
        });


});

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad, and Android mobile phones
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function () {
            },
            wipeRight: function () {
            },
            wipeUp: function () {
            },
            wipeDown: function () {
            },
            preventDefaultEvents: true
        };
        if (settings) $.extend(config, settings);
        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false
            }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault()
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft()
                        } else {
                            config.wipeRight()
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown()
                        } else {
                            config.wipeUp()
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false)
                }
            }

            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false)
            }
        });
        return this
    }
})(jQuery);

/*----------------------------------------------------*/
/*	Login/Logout
 /*----------------------------------------------------*/
var LoginModalController = {
    isInited: false,
    tabsElementName: ".logmod__tabs li",
    tabElementName: ".logmod__tab",
    inputElementsName: ".logmod__form .input",
    hidePasswordName: ".hide-password",

    inputElements: null,
    tabsElement: null,
    tabElement: null,
    hidePassword: null,

    activeTab: null,
    tabSelection: 0, // 0 - first, 1 - second

    findElements: function () {
        var base = this;

        base.tabsElement = $(base.tabsElementName);
        base.tabElement = $(base.tabElementName);
        base.inputElements = $(base.inputElementsName);
        base.hidePassword = $(base.hidePasswordName);

        return base;
    },

    setState: function (state) {
        var base = this,
            elem = null;

        if (!state) {
            state = 0;
        }

        if (base.tabsElement) {
            elem = $(base.tabsElement[state]);
            elem.addClass("current");
            $("." + elem.attr("data-tabtar")).addClass("show");
        }

        return base;
    },

    getActiveTab: function () {
        var base = this;

        base.tabsElement.each(function (i, el) {
            if ($(el).hasClass("current")) {
                base.activeTab = $(el);
            }
        });

        return base;
    },

    addClickEvents: function () {
        var base = this;

        base.hidePassword.on("click", function (e) {
            var $this = $(this),
                $pwInput = $this.prev("input");

            if ($pwInput.attr("type") == "password") {
                $pwInput.attr("type", "text");
                $this.text("Ẩn");
            } else {
                $pwInput.attr("type", "password");
                $this.text("Hiện");
            }
        });

        base.tabsElement.on("click", function (e) {
            var targetTab = $(this).attr("data-tabtar");

            e.preventDefault();
            base.activeTab.removeClass("current");
            base.activeTab = $(this);
            base.activeTab.addClass("current");

            base.tabElement.each(function (i, el) {
                el = $(el);
                el.removeClass("show");
                if (el.hasClass(targetTab)) {
                    el.addClass("show");
                }
            });
        });

        base.inputElements.find("label").on("click", function (e) {
            var $this = $(this),
                $input = $this.next("input");

            $input.focus();
        });

        return base;
    },

    initialize: function () {
        var base = this;
        LoginModalController.isInited = true;
        base.findElements().setState().getActiveTab().addClickEvents();
    }
};

$(document).ready(function () {

});

var showLogin = function () {
    if (!LoginModalController.isInited) {
        LoginModalController.initialize();
    }
    $(".logmod").show();
};

var hideLogin = function () {
    $(".logmod").hide();
};
