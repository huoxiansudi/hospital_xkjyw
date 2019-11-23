/**
 * Created by Administrator on 2017/8/13/013.
 */

//日期组件
$('#rangeDate').daterangepicker(
    {
        locale: {
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 1,
            format: "YYYY-MM-DD",
            separator: "/"
        },

        ranges: {
            '今天': [moment()],
            '昨天': [moment().subtract(1, 'days')],
            '最近七天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()],
            '本月': [moment().startOf('month'), moment().endOf('month')],
            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment(),
        endDate: moment()
    }
);

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//表格配置信息
var lang = {
    "sProcessing": "<span style='color: red;font-size: 25px;' >正在获取数据，请稍后......</span>",
    "sLengthMenu": "每页 _MENU_ 项",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
    "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "表格过滤:",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页",
        "sJump": "跳转"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
};

/**
 * 表单的查询条件转换成json格式
 * @param form
 * @returns {{}}
 */
function formToJson(form) {
    var result = {};
    var fieldArray = $('#' + form).serializeArray();
    for (var i = 0; i < fieldArray.length; i++) {
        var field = fieldArray[i];
        if (field.name in result) {
            result[field.name] += ',' + field.value;
        } else {
            result[field.name] = field.value;
        }
    }
    return result;
}

function hah2(obj) {
    var reg = $(obj).val();
    var id = $(obj).attr("id");
    // var index=id.substring(5);

    //遍历所有子复选框（判断是否权被选中）
    var i = 0;
    $(".checkChild").each(function () {
        if (this.checked == false) {
            i++;
        }
    });
    if (i > 0) {
        $(".checkAll").prop("checked", false);
    } else {
        $(".checkAll").prop("checked", true);
    }

    //判断状态（循环获取表的行和列）,选中的改变背景色
    if ($(obj).prop("checked")) {
        for (var i = 1; i < $("#attend_grid tr").size(); i++) {
            var index = $("#attend_grid").find("tr").eq(i).find("td").eq(0).find("input").attr("id");//获取input属性id值
            if (index == id) {
                $("#attend_grid").find("tr").eq(i).css("background-color", "#00c0ef");
            }
        }
    } else {
        for (var i = 1; i < $("#attend_grid tr").size(); i++) {
            var index = $("#attend_grid").find("tr").eq(i).find("td").eq(0).find("input").attr("id");//获取input属性id值
            if (index == id) {
                $("#attend_grid").find("tr").eq(i).css("background-color", "");
            }
        }
    }
}

//小写转大写，同时去掉非十六进制数
function toUpperCase(obj) {
    obj.value = obj.value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
}



//复选框点击事件
function checkAll() {

    var collid = document.getElementById("checkAll");
    var coll = document.getElementsByName("checkChild");

    if (collid.checked) {
        for (var i = 0; i < coll.length; i++) {
            coll[i].checked = true;
        }
    } else {
        for (var i = 0; i < coll.length; i++) {
            coll[i].checked = false;
        }
    }

    // $(".checkChild").prop("checked", this.checked);

    $(".checkChild").each(function () {
        if ($(this).is(':checked')) {

            $("#attend_grid").find("tr").css("background-color", "#00c0ef");
            $("#attend_grid").find("tr").eq(0).css("background-color", "");//让头行不变色
        } else {
            $("#attend_grid").find("tr").css("background-color", "");
        }
    });
}

/*
//不支持ie8以下的版本
$(".checkAll").click(function () {

    $(".checkChild").prop("checked", this.checked);

    $(".checkChild").each(function () {
        if($(this).is(':checked')){

            $("#attend_grid").find("tr").css("background-color","#00c0ef");
            $("#attend_grid").find("tr").eq(0).css("background-color","");//让头行不变色
        }else{
            $("#attend_grid").find("tr").css("background-color","");
        }
    });

});*/

/**
 * 键盘按下时触发的事件
 * @param event
 */
function setTrack(event) {
    var e = event ? event : window.event;
    if (e.keyCode == 13) {
        //$("#orderNo").blur(); //失去光标
        getValue();
    }
}

/**
 * 扫描获得医嘱号
 */
function getValue() {
    var orderNo = $("#orderNo").val()
    //.trim();

    var str = orderNo.split("|");
    orderNo = str[1];
    // $("#orderNo").val("");
    $("#orderNo").val(orderNo);
    var flag = false;
    for (var i = 1; i < $("#attend_grid tr").size(); i++) {
        var aa = $("#attend_grid").find("tr").eq(i).find("td").eq(2).text();
        if (aa == orderNo) {
            $("input:checkbox").eq(i).prop('checked', 'true');
            $("#attend_grid").find("tr").eq(i).css("background-color", "#00c0ef");
            flag = true;
        }
        if (!flag) {
            flag = false;//没有医嘱号，flag=false;
        }
    }
    if (!flag) {
        var txt = "此医嘱号不存在，信息未选中，请确认！";
        // window.wxc.xcConfirm(txt,window.wxc.xcConfirm.typeEnum.info);
        alert(txt);
    }
}

function attendQuery() {
    table.ajax.reload();
    $(".checkAll").prop("checked", false);
}

// 时间组件(yyyy-mm-dd hh:mm:ss格式)
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

// 文本框中输入字母等就触发的事件

//获取光标onfocus事件，清除input且执行oninput 值改变事件
function setfocus() {
    $("#makeupCo").val("");
    setinput();
}

//正则 去除空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//值改变时候事件-oninput事件
function setinput() {
    $('#typenum').css('display', 'block');
    var index_ = Trim($("#makeupCo").val());
    $("#typenum").append("<option>1</option>");
    $("#typenum").append("<option>2</option>");
    $("#typenum").append("<option>3</option>");
    $("#typenum").append("<option>4</option>");

}





