$(function () {
    /********************************************扩展$函数************************************************/
    // 禁止用户TAB键
    $('input').on('keydown', function (event) {
        if (event.key == 'Tab' || event.keyCode == 9) {
            return false;
        }
    });

    var this_height, parent_height, need_height;

    $.fn.extend({
        /*
         *图片预加载
         *参数： pics:图片数组
         *       callback： 图片加载完毕回调函数
         *       num：进度 
        */
        uImgLoad: function (pics, num, callback) {
            var index = 0;
            var len = pics.length;
            var img = new Image();
            var flag = false;

            var progress = function(w){
                num.html(w);
            }

            var load = function(){
                img.src = pics[index];
                img.onload = function() {
                    progress(Math.floor(((index + 1) / len) * 100) + "%");
                    index ++ ;
                    if (index < len) {
                        load();
                    }else{
                        callback();
                    }
                }
                return img;
            }
            if(len > 0){
                load();
            }else{
                progress("100%");
            }
        },
        /*
         *获取验证码倒计时
         *参数： time：倒计时时间 单位S
        */
        getCode: function (time) {
            // 倒计时秒数
            var now = time;

            var $this = $(this);
            var isGet = $this.data('isget');
            if (isGet === 'true') {
                return false;
            } else if (isGet === 'false' || isGet === undefined) {
                $this.data('isget','true');
                $this.addClass('active');
                $this.html('<i>'+now+'</i>s后获取');
                var timer = timer = setInterval(function () {
                    if (now>1) {
                        now -= 1;
                        $this.html('<i>'+ now +'</i>s后获取');
                    }
                }, 1000);
                setTimeout(function () {
                    $this.removeClass('active');
                    $this.html('获取验证码');
                    $this.data('isget','false');
                    timer = null;
                },now * 1000);
            }
        },
        /*
        *弹窗功能
        *   option：{
                modalEle: '#modal', //弹窗元素
                modalTile: '提示',   //弹窗title
                modalText: '请输入您的手机号码！', //弹窗文字
                closeShow: false, //是否显示右上角关闭按钮
                cancelShow: fasle //是否显示取消按钮
                modalEnter: function (modal) { //点击确定回调函数
                    
                }
                modalCancel: function (modal) { //点击取消回调函数
                    
                }
            }
        * 
        */
        creatModal: function (option) {
            // 创建modal对象
            var Modal = function () {
                this.ele = option.modalEle;
                this.title = option.modalTitle;
                this.text = option.modalText;
                this.init();
                this.Show();
            }
            // 添加方法
            Modal.prototype = {
                init: function () {
                    var _this = this;
                    var $modal = $(this.ele);
                    var modalTitle = $modal.find('.modal-title').html(this.title);
                    var modalText = $modal.find('.modal-text').html(this.text);
                    var $modalClose = $modal.find('.modal-close');
                    var $enter = $modal.find('.modal-enter');
                    var $cancel = $modal.find('.modal-cancel');
                    if (option.closeShow == false) {
                        $modalClose.hide();
                    } else {
                        $modalClose.show();
                    };

                    if (option.cancelShow == true) {
                        $cancel.show();
                    } else {
                        $cancel.hide();
                    };

                    $modalClose.one('touchend', function () {
                        _this.Close();
                    });
                    $enter.one('touchend', function () {
                        option.modalEnter(_this);
                    });
                    $cancel.one('touchend', function () {
                        _this.Close();
                    });

                },
                Close: function () {
                    $(this.ele).fadeOut();
                },
                Show: function () {
                    $(this.ele).fadeIn();
                }
            }
            // 创建modal对象
            return new Modal();

        }
    });
    

    // 背景音乐
    ;(function () {
        var audio = document.getElementById("myAudio");
        audio.play();
        $('.audio-control').on('touchend', function () {
            if (audio.paused) {
                $('.audio-control-icon').addClass('audioRotate');
                audio.play();
            } else {
                $('.audio-control-icon').removeClass('audioRotate');
                audio.pause()
            }
        });
    })();

    // 滑动
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: false,
        mousewheelControl : true,
        observer: true,
        observeParents: true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        }, 
        onSlideChangeEnd: function(swiper){
          swiperAnimate(swiper);
          if (swiper.activeIndex == 19) {
            // 业务说明
            $(this).creatModal({
                modalEle: '#modal',
                modalTitle: '业务说明',
                modalText: '<div style="text-indent: 2em;height: 7rem;overflow-y: scroll;text-align: left;">文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明文案说明</div>',
                modalEnter: function (modal) {
                    modal.Close();
                }
            });
          }
        }
    });

    /**********************************************绑定事件**********************************************/

    // 图片预加载
    var pics = [
        'images/logo.png',
        'images/icon_01.png',
        'images/slid-btn.png',
        'images/img_01_01.png',
        'images/img_01_02.png',
        'images/img_01_03.png',
        'images/img_01_04.png',
        'images/img_01_05.png',
        'images/img_01_06.png',
        'images/img_01_07.png',
        'images/img_01_08.png',
        'images/img_01_09.png',
        'images/img_02_01.png',
        'images/img_02_02.png',
        'images/img_02_03.png',
        'images/img_02_04.png',
        'images/img_02_05.png',
        'images/img_02_06.png',
        'images/img_02_07.png',
        'images/img_02_08.png',
        'images/img_03_01.png',
        'images/img_03_02.png',
        'images/img_03_03.png',
        'images/img_03_04.png',
        'images/img_03_05.png',
        'images/img_04_01.png',
        'images/img_04_02.png',
        'images/img_04_03.png',
        'images/img_04_04.png',
        'images/img_04_05.png',
        'images/img_05_01.png',
        'images/img_05_02.png',
        'images/img_05_03.png',
        'images/img_05_04.png',
        'images/img_05_05.png',
        'images/img_06_01.png',
        'images/img_07_01.png',
        'images/img_07_02.png',
        'images/img_07_03.png',
        'images/img_07_04.png',
        'images/img_08_01.png',
        'images/img_08_02.png',
        'images/img_08_03.png',
        'images/img_08_04.png',
        'images/img_08_05.png',
        'images/img_09_01.png',
        'images/img_09_02.png',
        'images/img_09_03.png',
        'images/img_10_01.png',
        'images/img_10_02.png',
        'images/img_10_03.png',
        'images/img_10_04.png',
        'images/img_10_05.png',
        'images/img_10_06.png',
        'images/img_10_07.png',
        'images/img_10_08.png',
        'images/img_11_01.png',
        'images/img_11_02.png',
        'images/img_12_01.png',
        'images/img_12_02.png',
        'images/img_12_03.png',
        'images/img_12_04.png',
        'images/img_13_01.png',
        'images/img_13_02.png',
        'images/img_13_03.png',
        'images/img_13_04.png',
        'images/img_14_01.png',
        'images/img_14_02.png',
        'images/img_15_01.png',
        'images/img_15_02.png',
        'images/img_15_03.png',
        'images/img_16_01.png',
        'images/img_16_02.png',
        'images/img_16_03.png',
        'images/img_17_01.png',
        'images/img_17_02.png',
        'images/img_17_03.png',
        'images/img_17_04.png',
        'images/img_17_05.png',
        'images/img_18_01.png',
        'images/img_18_02.png',
        'images/img_18_03.png',
        'images/img_18_04.png',
        'images/img_19_01.png',
        'images/img_19_02.png'
    ];

    $('.progress-num').uImgLoad(pics,$('.progress-num'),function () {
        $('.page-loading').fadeOut('fast', function () {
            $('.login').fadeIn('fast');
        });
        $('.first-content .ani').each(function () {
            var thisanimate = $(this).attr('swiper-animate-effect');
            $(this).removeClass(thisanimate);
            $(this).removeClass('animated');
        });
    });
    

    
    // 点击获取验证码
    $('.login-form-code-btn').on('touchend', function () {
        var tel = $('#loginTel').val();
        var mobile = /^1(3[4-9]|47|5[0-2]|5[7-9]|78|8[2-4]|8[78])\d{8}$/
        if (!mobile.test(tel)) {
            $(this).creatModal({
                modalEle: '#modal',
                modalTitle: '提示',
                modalText: '请您输入正确的中国移动手机号码！',
                modalEnter: function (modal) {
                    modal.Close();
                }
            });
            return false;
        }
        $(this).getCode(60);
    });

    //点击登录
    $('#login').on('touchend', function () {
        document.querySelector('#loginTel').blur();
        document.querySelector('#loginCode').blur();
        var mobile = /^1(3[4-9]|47|5[0-2]|5[7-9]|78|8[2-4]|8[78])\d{8}$/;
        var tel = $('#loginTel').val();
        var code = $('#loginCode').val();
        // 手机号判断
        if (!mobile.test(tel)) {
            $(this).creatModal({
                modalEle: '#modal',
                modalTitle: '提示',
                modalText: '请您输入正确的中国移动手机号码！',
                modalEnter: function (modal) {
                    modal.Close();
                }
            });
            return false;
        }
        // 验证码判断
        if (code === '') {
            $(this).creatModal({
                modalEle: '#modal',
                modalTitle: '提示',
                modalText: '请输入您收到的验证码！',
                modalEnter: function (modal) {
                    modal.Close();
                }
            });
            return false;
        }

        // 在ajax异步回调之后判断code是否为正确的验证码 如果不正确就按照上面调用弹窗 请输入您收到的验证码！提示



        //请在ajax异步回调之后调用此段代码 如果填写手机号码是非受邀用户执行此段代码

        // $(this).creatModal({
        //     modalEle: '#modal',
        //     modalTitle: '登录失败',
        //     modalText: '对不起，您不是本次活动受邀用户！',
        //     modalEnter: function (modal) {
        //         modal.Close(); 
        //     }
        // });



        //请在ajax异步回调之后调用此段代码 验证码填写错误时执行此段代码
        
        // $(this).creatModal({
        //     modalEle: '#modal',
        //     modalTitle: '提示',
        //     modalText: '验证码填写错误！',
        //     modalEnter: function (modal) {
        //         modal.Close(); 
        //     }
        // });

        // 请在ajax异步回调之后调用此段代码 验证成功后执行此段代码
        
        $(this).creatModal({
            modalEle: '#modal',
            modalTitle: '登录成功',
            modalText: '尊敬的客户您好，<br />文末的体验活动，静待您的参加！',
            closeShow: false,
            modalEnter: function (modal) {
                $('.login').slideUp(function () {
                    $('.swiper-container').show();
                    $('.first-content .ani').addClass('animated');
                    $('.first-content .ani').each(function () {
                        var thisanimate = $(this).attr('swiper-animate-effect');
                        $(this).addClass(thisanimate);
                    });
                    this_height = $('.card-scroll').height();
                    parent_height = $('.card-scroll').parent().height();
                    need_height = this_height - parent_height;
                });

                modal.Close();
            }
        });
        
    });

    
    // 点最后一页击确认按钮办理业务
    $('.enter-btn').on('touchend', function () {
        var loginform = $(this).parents('.login-form');
        var input = loginform.find('.handleInput');
        var v = input.val();
        var d, s;
        $('.card-item').each(function () {
            if ($(this).hasClass('act')) {
                d = $(this).find('.card-item-title').text();
                s = $(this).find('.card-item-details span:first').text();
            }
        });
        $('.handleInput').val('');
        input.val(v);
        input[0].blur();
        var t = input.val();
        var mobile = /^1(3[4-9]|47|5[0-2]|5[7-9]|78|8[2-4]|8[78])\d{8}$/
        if (!mobile.test(t)) {
            $(this).creatModal({
                modalEle: '#modal',
                modalTitle: '提示',
                modalText: '请您输入正确的中国移动手机号码！',
                modalEnter: function (modal) {
                    modal.Close();
                }
            });
            return false;
        }
        $(this).creatModal({
            modalEle: '#modal',
            modalTitle: '手机号确认',
            modalText: '是否为手机号' + t + '办理<br />' + s + d + '?',
            cancelShow: true,
            modalEnter: function (modal) {
                $(this).creatModal({
                    modalEle: '#modal',
                    modalTitle: '提示',
                    modalText: '办理成功！',
                    modalEnter: function (modal) {
                        modal.Close();
                    }
                }); 
            }
        });
        //请在ajax异步回调之后调用此段代码
        // (受邀用户)是否已经赠送他人或为自己办理过体验包，如果办理过提示：您已经办理过业务体验包！
        
        // $(this).creatModal({
        //     modalEle: '#modal',
        //     modalTitle: '办理失败',
        //     modalText: '您已经办理过业务体验包！',
        //     modalEnter: function (modal) {
        //         modal.Close(); 
        //     }
        // });


        //请在ajax异步回调之后调用此段代码
        // 输入的手机号（最后一页）已经办理过业务体验包 
        
        // $(this).creatModal({
        //     modalEle: '#modal',
        //     modalTitle: '办理失败',
        //     modalText: '此号码已经办理过体验包，<br />无须再次办理!',
        //     modalEnter: function (modal) {
        //         modal.Close(); 
        //     }
        // });
        
        //请在ajax异步回调之后调用此段代码
        //办理成功后执行的代码
        
          
    });
    


    // 选择档位
    $('.card-item').on('click', function () {
        $('.card-item').removeClass('act');
        $(this).addClass('act');
    });

    // 企业文化跳转
    $('.img_02_04').on('click', function () {
        mySwiper.slideTo(4,300,true);
    });
    // 5G场景跳转
    $('.img_02_05').on('click', function () {
        mySwiper.slideTo(5,300,true);
    });
    // 集团业务跳转
    $('.img_02_06').on('click', function () {
        mySwiper.slideTo(11,300,true);
    });
    // 个人业务跳转
    $('.img_02_07').on('click', function () {
        mySwiper.slideTo(14,300,true);
    });
    // 业务体验跳转
    $('.img_02_08').on('click', function () {
        mySwiper.slideTo(19,300,true);
    });

    // 沟通管家跳转
    $('.img_08_02').on('click', function () {
        mySwiper.slideTo(15,300,true);
    });
    // 魔百盒跳转
    $('.img_08_03').on('click', function () {
        mySwiper.slideTo(16,300,true);
    });
    // 云世界跳转
    $('.img_08_04').on('click', function () {
        mySwiper.slideTo(17,300,true);
    });
    // 家宽产品跳转
    $('.img_08_06').on('click', function () {
        mySwiper.slideTo(18,300,true);
    });


    (function () {
        var el = $('.card-scroll')[0];
        
        var gundongY = 0;
        var sty = ety = curY = 0;
        function getT3d(elem, ename) {
            var str1 = elem.style.webkitTransform;
            if (str1 == "") return "0";
            str1 = str1.replace("translate3d(", "");
            str1 = str1.replace(")", "");
            var carr = str1.split(",");

            if (ename == "x") return carr[0];
            else if (ename == "y") return carr[1];
            else if (ename == "z") return carr[2];
            else return "";
        }

        function limit(num) {
            if (num > 0) {
                return 0;
            } else if(num < -need_height) {
                return -need_height;
            }
            return num;
        }
        // el.addEventListener('touchmove', function (event) {
            
        //     return false;
        // });
        $('.card-scroll').on('touchstart', function (event) {
            gundongY = 0;
            ety = parseInt(getT3d(el, "y"));
            
            sty = event.originalEvent.touches[0].pageY;
        });

        $('.card-scroll').on('touchmove', function (event) {
            gundongY = event.originalEvent.touches[0].pageY - sty;
            curY = limit(gundongY + ety);
            $('.card-scroll')[0].style.webkitTransform = 'translate3d(' + 0 + 'px, ' + (curY) + 'px,0px)';
            return false;
        });

    })();
});