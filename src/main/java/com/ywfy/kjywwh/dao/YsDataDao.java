package com.ywfy.kjywwh.dao;

import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.entity.YsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @program: kjywwh
 * @Date: 2019-11-07 16:05
 * @Author: jinhs
 * @Description:
 */
@Mapper
public interface YsDataDao {

    Integer ysDataCount(@Param("condition") QueryCondition condition);

    List<YsEntity> ysDataList(@Param("condition") QueryCondition condition);

    void yskjywwhUpdate(String ysxx, String xkjywxj);

    Integer ykjqxYsCount(@Param("condition") QueryCondition condition);

    List<YsEntity> ykjqxYsList(@Param("condition") QueryCondition condition);

    void yskjywwhInsert(String ysxx,String mc, String xkjywxj);

    //Integer updateGyCdjg(@Param("ypxh") String ypxh, @Param("xkjywxj") String xkjywxj);

}
