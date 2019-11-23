package com.ywfy.kjywwh.controller;

import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.entity.YpEntity;
import com.ywfy.kjywwh.service.YpDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * @program: kjywwh
 * @Date: 2019-11-07 15:38
 * @Author: jinhs
 * @Description:
 */
@Controller
public class YpwhController {

    @Autowired
    private YpDataService ypDataService;

    /*至药品维护界面界面*/
    @RequestMapping(value = "/ypwh", method = RequestMethod.GET)
    public String toZyxxjk() {

        return "ypwhData";
    }

    //查询搜索框信息
    @RequestMapping("/sskList")
    @ResponseBody
    public List<YpEntity> sskList(String srm) {

        List<YpEntity> result =new ArrayList<>();
        if(!"".equals(srm)){
            result = ypDataService.sskList(srm);
        }
        return result;
    }

    //查询列表
    @RequestMapping("/ypDataList")
    @ResponseBody
    public QueryCondition jysjkList(QueryCondition condition) {

        QueryCondition result =new QueryCondition();
        if(!"".equals(condition.getYpmc())){
            result = ypDataService.ypDataList(condition);
        }
        return result;
    }

    //设置更新新抗菌药物线级
    @RequestMapping(value = "/setXkjywxj", method = RequestMethod.POST)
    @ResponseBody
    public String setXkjywxj(String ypxhList,String xkjywxj,String ypmc) {

        String[] ypxhText = ypxhList.split(",");
        for (String ypxh: ypxhText ) {
            ypDataService.setXkjywxj(ypxh,xkjywxj,ypmc);
        }
        return "success";
    }
}
