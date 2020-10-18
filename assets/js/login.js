$(function() {
    //登录和注册表单的切换
    $('#reg_login').on('click', function() {
        $('.reg_form').show();
        $('.login_form').hide();
    })
    $('#log_login').on('click', function() {
        $('.reg_form').hide();
        $('.login_form').show();

    });



})