package com.ywfy.kjywwh.service;

import com.ywfy.kjywwh.dao.YsDataDao;
import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.entity.YsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @program: kjywwh
 * @Date: 2019-11-18 10:03
 * @Author: jinhs
 * @Description:
 */
@Service
public class YsqxwhDataService {

    @Autowired
    private YsDataDao ysDataDao;

    @Cacheable(value = {"ysxxCache"},key = "'ysxx_'+#condition.ysxx")
    public QueryCondition ysDataList(QueryCondition condition) {

        //根据条件查询 count记录数目
        Integer count = ysDataDao.ysDataCount(condition);

        //如果有记录 才去查询分页数据 没有相关记录数目 没必要去查分页数据
        QueryCondition pageResult = new QueryCondition();
        if(count>0){
            //数据设置到pageResult，返回给前端
            pageResult.setTotalRows(count);
            pageResult.setCurrentPage(condition.getCurrentPage());
            pageResult.setPageSize(condition.getPageSize());
            //查联表
            List<YsEntity> ysDataList = ysDataDao.ysDataList(condition);

            pageResult.setItems(ysDataList);
        }

        return pageResult;
    }

    public QueryCondition ykjqxYsList(QueryCondition condition) {

        //根据条件查询 count记录数目
        Integer count = ysDataDao.ykjqxYsCount(condition);

        //如果有记录 才去查询分页数据 没有相关记录数目 没必要去查分页数据
        QueryCondition pageResult = new QueryCondition();
        if(count>0){
            //数据设置到pageResult，返回给前端
            pageResult.setTotalRows(count);
            pageResult.setCurrentPage(condition.getCurrentPage());
            pageResult.setPageSize(condition.getPageSize());
            //查联表
            List<YsEntity> ysDataList = ysDataDao.ykjqxYsList(condition);

            pageResult.setItems(ysDataList);
        }

        return pageResult;

    }

    @Transactional
    @CacheEvict(value={"ysxxCache"},key = "'ysxx_'+#ysxx",beforeInvocation = true)  //更新时清除缓存
    public void yskjywwhUpdate(String ysxx,String xkjywxj) {

        //根据条件查询 count记录数目
        QueryCondition condition = new QueryCondition();
        condition.setYsxx(ysxx);
        Integer count = ysDataDao.ykjqxYsCount(condition);
        if(count>0){
            //更新YPFX_GYDM表
            ysDataDao.yskjywwhUpdate(ysxx,xkjywxj);
        }else{
            //查联表获取信息
            List<YsEntity> ysDataList = ysDataDao.ysDataList(condition);
            for (YsEntity ysEntity:ysDataList) {
                //数据添加
                ysDataDao.yskjywwhInsert(ysxx,ysEntity.getXm(),xkjywxj);
            }
        }
    }


}
