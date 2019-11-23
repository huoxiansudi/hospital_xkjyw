



//使用线级权限（是否全选）
function syxjqx(obj){

    //判断状态是否全选
    if ($(obj).prop("checked")) {
        $("input[name='kjywChild']").prop("checked", true);
        $('input[name="kjywChild"]:checked').each(function(){
            $(this).val("1"); //对所有被选中的name为kjywChild 赋值
        })
    }else{
        $("input[name='kjywChild']").prop("checked", false);
        $('input[name="kjywChild"]:checked').each(function(){
            $(this).val("0");
        })
    }
}

//是否选中某个抗菌线级权限
function isCheck(obj) {

    var id = $(obj).attr("id");
    // $("input[name='kjywChild']").css("background-color", "#00c0ef"); 设置不起作用
    // $("#fxzsymzCheck1").css("background-color","gray");

    if ($(obj).prop("checked")) { //如果选中则，对input标签赋值为 1
        obj.value=1;
    }else{
        obj.value=0;
    }
}
function valueChange(obj){
    if(obj.value==""){
        $("#xzsyj_button").css('display', 'none'); //空时隐藏
    }else{
        $("#xzsyj_button").css('display', 'block');
    }
}
//保存
function ysxxSave(){

    var xkjywxj = "";//新抗菌药物线级值
    var msg = "确定改医生权限么！";//弹框提示信息

    $("input[name='kjywChild']").each(function(i,item){
        console.log("下标:"+i+"value值:"+item.value);
        xkjywxj=xkjywxj+item.value
    });
    var ysxx = $("#ysxx").val();

    //对需执行的操作进行 "确认"
    if (confirm(msg)) {

        $.post("/yskjywwhUpdate", {'ysxx': ysxx,'xkjywxj': xkjywxj}, function (result) {
            if (result == "success") {
                $(".checkAll").prop("checked", false);
                var txt = "设置成功!";
                alert(txt);
                table.ajax.reload();
            } else {
                var txt = "设置失败!";
                alert(txt);
                $(".checkAll").prop("checked", false);
                table.ajax.reload();
            }
        })

    } else {
        return false;
    }

}