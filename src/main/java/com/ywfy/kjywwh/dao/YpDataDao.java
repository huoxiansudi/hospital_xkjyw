package com.ywfy.kjywwh.dao;

import com.ywfy.kjywwh.domain.QueryCondition;
import com.ywfy.kjywwh.entity.YpEntity;
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
public interface YpDataDao {

    Integer ypDataCount(@Param("condition") QueryCondition condition);

    List<YpEntity> ypDataList(@Param("condition") QueryCondition condition);



    Integer updateGyYpggzd(@Param("ypxh")String ypxh, @Param("xkjywxj")String xkjywxj);

    Integer updateGyCdjg(@Param("ypxh")String ypxh, @Param("xkjywxj")String xkjywxj);

    List<YpEntity> sskList(@Param("srm")String srm);
}
