$(function() {
    var layer = layui.layer
    var form = layui.form;
    //登录和注册表单的切换
    $('#reg_login').on('click', function() {
        $('.reg_form').show();
        $('.login_form').hide();
    })
    $('#log_login').on('click', function() {
        $('.reg_form').hide();
        $('.login_form').show();

    });
    //为表单项添加验证规则
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //验证两次密码不一致问题
        repwd: function(value) {
            if ($('#regForm [name=repassword]').val() !== value) {
                layer.msg(`两次密码不一致，请重新输入`)
            }
        }
    });

    //监听注册表单的提交事件
    $('#regForm').on('submit', function(e) {
        // alert(1）
        e.preventDefault()
        var data = $('#regForm').serialize();
        $.ajax({
            method: 'POST',
            url: `/api/reguser`,
            data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                layer.msg(`注册成功，请登录`)
                    //注册成功的话就跳转到登录页面
                $('#log_login').click();
            }
        })
    });
    //监听登录表单的提交事件
    $('#logForm').on('submit', function(e) {
        e.preventDefault();
        var data = $('#logForm').serialize();
        $.ajax({
            method: 'POST',
            url: `/api/login`,
            data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res);
                //成功后跳转到首页，并且保存token值到本地存储
                location.href = `/index.html`;
                localStorage.setItem('token', res.token)
            }
        })
    })














})