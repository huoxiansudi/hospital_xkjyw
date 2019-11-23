

function getYpxx(obj) {

    // $("#srk").hide();
    // $("#ypmc").show();

    $.ajax({
        url:"/sskList",    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data:{"srm":obj.value},    //参数值
        type:"GET",   //请求方式
        beforeSend:function(){
            //请求前的处理
            $("#submit").attr({ disabled: "disabled" });// 禁用按钮防止重复提交
        },
        success:function(result){
            //请求成功时处理
            $('#ypmc option').not('option:first').remove(); //select为下拉框的id ，option为它的子标签
            for (var i = 0; i < result.length; i++) {
                var option = document.createElement("option");
                $(option).val(result[i].ypxh);
                $(option).text(result[i].ypmc+' '+result[i].ypgg);
                $('#ypmc').append(option);
            }
        },
        complete:function(){
            //请求完成的处理
            $("#submit").removeAttr("disabled");

        },
        error:function(){
            //请求出错处理
            console.info("error: " + data.responseText);
        }
    });

}

//设置抗菌药物
function szcXzsyj(id) {
    /*Ewin.confirm({message: "确认要删除选择的数据吗？"}).on(function (e) {
        if (!e) {
            return;
        }
    });*/

    var text = "";//ypxh 药品序号
    var xkjywxj = "";//新抗菌药物线级值
    var msg = "";//弹框提示信息
    var ypmc = $("#ypmc").val();
    $(".checkChild").each(function () { //循环判断是否选中
        if ($(this).is(':checked')) {
            text += $(this).val() + ",";
        }
    });
    text = text.substring(0, text.length - 1); //去除最后一个","
    if (text == "") {
        var txt = "未选中需要设置的药品!";
        alert(txt);
        return;
    }

    //判断是哪一种 "抗菌药物线级"
    if (id == "xzsyj_button") {
        xkjywxj = 2;//限制使用级
        msg = "确定将所选药品设置成限制使用级！";
    } else if (id == "tssyj_button") {
        xkjywxj = 3;//特殊使用级
        msg = "确定将所选药品设置成非限制使用级！";
    } else if (id == "fxzsyj_button") {
        xkjywxj = 1;//特殊使用级
        msg = "确定将所选药品设置成特殊使用级！";
    } else {
        xkjywxj = 0;//默认是0
    }

    //对需执行的操作进行 "确认"
    if (confirm(msg)) {

        $.post("/setXkjywxj", {'ypxhList': text, 'xkjywxj': xkjywxj,'ypmc':ypmc}, function (result) {
            if (result == "success") {
                $(".checkAll").prop("checked", false);
                var txt = "设置成功!";
                alert(txt);
                table.ajax.reload();
            } else {
                var txt = "设置失败!";
                alert(txt);
                $(".checkAll").prop("checked", false);
            }
        })

    } else {
        return false;
    }
}