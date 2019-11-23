package com.ywfy.kjywwh.service;

import com.ywfy.kjywwh.dao.YpDataDao;
import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.entity.YpEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @program: kjywwh
 * @Date: 2019-11-07 16:03
 * @Author: jinhs
 * @Description:
 */
@Service
public class YpDataService {

    @Autowired
    private YpDataDao ypDataDao;

    //@Autowired
    //RedisTemplate redisTemplate; //k-v都是对象的

    @Cacheable(value = {"ypxxCache"},key = "'ypxx_'+#condition.ypmc")
    public QueryCondition ypDataList(QueryCondition condition) {

        /*QueryCondition pageResult = (QueryCondition) redisTemplate.opsForValue().get("yp_"+condition.getYpmc());
        if(pageResult==null){

            //根据条件查询 count记录数目
            Integer count = ypDataDao.ypDataCount(condition);

            //如果有记录 才去查询分页数据 没有相关记录数目 没必要去查分页数据
            if(count>0){
                //数据设置到pageResult，返回给前端
                pageResult.setTotalRows(count);
                pageResult.setCurrentPage(condition.getCurrentPage());
                pageResult.setPageSize(condition.getPageSize());
                //查联表
                List<YpEntity> jysjkList = ypDataDao.ypDataList(condition);

                pageResult.setItems(jysjkList);
            }
            redisTemplate.opsForValue().set("yp_"+condition.getYpmc(),pageResult);
        }
        return pageResult;
*/
        //根据条件查询 count记录数目
        Integer count = ypDataDao.ypDataCount(condition);

        //如果有记录 才去查询分页数据 没有相关记录数目 没必要去查分页数据
        QueryCondition pageResult = new QueryCondition();
        if(count>0){
            //数据设置到pageResult，返回给前端
            pageResult.setTotalRows(count);
            pageResult.setCurrentPage(condition.getCurrentPage());
            pageResult.setPageSize(condition.getPageSize());
            //查联表
            List<YpEntity> jysjkList = ypDataDao.ypDataList(condition);

            pageResult.setItems(jysjkList);
        }

        return pageResult;
    }

    @Transactional
    @CacheEvict(value={"ypxxCache"},key = "'ypxx_'+#ypmc",beforeInvocation = true)  //更新时清除缓存
    public void setXkjywxj(String ypxh, String xkjywxj,String ypmc) {
        //更新GY_YPCDJG表
        ypDataDao.updateGyCdjg(ypxh,xkjywxj);
        //更新GY_YPMCGGZD表
        ypDataDao.updateGyYpggzd(ypxh,xkjywxj);
    }

    @Cacheable(value = {"ypxxCache"},key = "'ypxx_'+#srm")
    public List<YpEntity> sskList(String srm) {
        List<YpEntity> ypEntity = ypDataDao.sskList(srm);
        return ypEntity;
    }
}
