import Component from '@ember/component';
import Scroller from 'ember-cli-scroller';
import $ from 'jquery';

export default Component.extend(Scroller, {
    navCollapsed: true,

    didInsertElement: function() {
        this.bindScrolling();
        $('#nav-min-outer').bind("touchmove",function(e){
            e.stopPropagation();
            e.preventDefault();
        });
        $('#nav-min').bind("touchmove",function(e){
            e.stopPropagation();
            e.preventDefault();
        });
    },
    
    willRemoveElement: function() {
        this.unbindScrolling();
    },
    
    scrolled: function () {
        let cur = window.scrollY;
        let aTop = 80;
    
        if (cur < aTop) {
            let ft = cur * 1.0 / aTop;
            $('#nav').css("background-color", 'rgba(255, 255, 255, ' + ft + ')');
            // $('#nav-min .nav').css("background-color", 'rgba(255, 255, 255, ' + ft + ')');
            $('.logo').attr("src","/images/img_logo_white.svg");
            $('#nav .title').removeClass('scrolled-title');
            // $('.menu-icon').attr("src","/images/icon_meun.svg");
        } else {
            $('#nav').css("background-color", 'rgba(255, 255, 255, 1.0)');
            // $('#nav-min .nav').css("background-color", 'rgba(255, 255, 255, 1.0)');
            $('.logo').attr("src","/images/img_logo_theme.svg");
            $('#nav .title').addClass('scrolled-title');
            // $('.menu-icon').attr("src","/images/icon_meun-blue.svg");
        }
        
        let wst = $(window).scrollTop(); //滚动条距离顶端值
            // scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop(); //滚动条距离底端值
        for (let i = 1; i < 6; i++) { //加循环
            if ($("#a" + i).offset().top - 64 <= wst) { //判断滚动条位置 64是锚点偏移数
                $('#nav a').removeClass("active"); //清除类
                $("#a" + i + i).addClass("active"); //给当前导航加类
                $('#nav-min a').removeClass("active"); //清除类
                $("#a" + i + i + i).addClass("active"); //给当前导航加类

                // if (scrollBottom <= 0) { //判断滚动条位置 是否到底
                //     $('#nav a').removeClass("active"); //清除类
                //     $("#a" + (i + 1) + (i + 1)).addClass("active"); //给当前导航加类
                //     $('#nav-min a').removeClass("active"); //清除类
                //     $("#a" + (i + 1) + (i + 1) + (i + 1)).addClass("active"); //给当前导航加类
                // }
            }
        }
    },
    actions: {
        toggleNav() {
            this.toggleProperty("navCollapsed");
            if (this.navCollapsed) {
                $('.menu-icon').attr("src","/images/icon_meun-black.svg");
            } else {
                $('.menu-icon').attr("src","/images/icon_meun-blue.svg");
            }
        },
        linkToIndex() {
            this.toHomepage();
        },
        navClick(param) {
            $('.title').removeClass('active');
            this.set('navCollapsed',true);
            $('.menu-icon').attr("src","/images/icon_meun-black.svg");
            if (param === 1) {
                $('#a11').addClass('active');
            } else if (param === 2) {
                $('#a22').addClass('active');
            } else if (param === 3) {
                $('#a33').addClass('active');
            } else if (param === 4) {
                $('#a44').addClass('active');
            } else if (param === 5) {
                $('#a55').addClass('active');
            }
        }
    }
});
