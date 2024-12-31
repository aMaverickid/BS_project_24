package com.example.goshops.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Options;

import java.util.List;
import java.time.LocalDateTime;

import com.example.goshops.model.History;


@Mapper
public interface HistoryRepository {

    // select
    @Select("select search_input, search_time from history where name = #{name}")
    List<History> findHistoryByAccount(@Param("name") String name);

    @Select("select * from history where search_input = #{input} and name = #{name}")
    History findHistoryByInputAndName(@Param("name") String name, @Param("input") String input);

    // update
    @Update("update history set search_time = #{new_search_time} where search_input = #{input} and name = #{name}")
    void UpdateHistoryTimeByInput(@Param("new_search_time") LocalDateTime time, @Param("name") String name, @Param("input") String input);

    // insert
    @Insert("insert into history(name, search_input, search_time) values(#{name}, #{search_input}, #{search_time})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertNewHistory(History history);
}

