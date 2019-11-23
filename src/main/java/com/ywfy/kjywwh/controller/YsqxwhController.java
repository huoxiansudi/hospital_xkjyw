package com.ywfy.kjywwh.controller;

import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.service.YsqxwhDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @program: kjywwh
 * @Date: 2019-11-18 10:19
 * @Author: jinhs
 * @Description:
 */
@Controller
public class YsqxwhController {

    @Autowired
    private YsqxwhDataService ysqxwhDataService;

    /*至权限维护界面*/
    @RequestMapping(value = "/ysqxwh", method = RequestMethod.GET)
    public String toZyxxjk() {

        return "ysqxwhData";
    }

    //查询列表
    @RequestMapping("/ysDataList")
    @ResponseBody
    public QueryCondition jysjkList(QueryCondition condition) {

        QueryCondition result =new QueryCondition();
        //查询YPFX_GYDM表是否有信息（首页展示所有有抗菌药物权限的医生信息）
        if(condition.getYsxx()==null || "".equals(condition.getYsxx())){
            result = ysqxwhDataService.ykjqxYsList(condition);
        }
        //查询YPFX_GYDM表是否有信息可进行维护操作
        if(condition.getYsxx()!=null && !"".equals(condition.getYsxx())){
            result = ysqxwhDataService.ysDataList(condition);
        }

        return result;
    }

    //设置更新新抗菌药物线级
    @RequestMapping(value = "/yskjywwhUpdate", method = RequestMethod.POST)
    @ResponseBody
    public String yskjywwhUpdate(String ysxx,String xkjywxj) {

        //String[] ypxhText = ypxhList.split(",");
        ysqxwhDataService.yskjywwhUpdate(ysxx,xkjywxj);

        return "success";
    }
}
