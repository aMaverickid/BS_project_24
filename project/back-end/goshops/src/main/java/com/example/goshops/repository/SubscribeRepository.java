package com.example.goshops.repository;

import org.apache.ibatis.annotations.*;

import com.example.goshops.model.Subscribee;

import java.util.List;
import java.time.LocalDateTime;

@Mapper
public interface SubscribeRepository {
    @Select("select * from Subscribe")
    List<Subscribee> findSubscribee();

    @Select("select * from Subscribe where name = #{name}")
    List<Subscribee> findSubscribeeByName(@Param("name") String name);

    @Select ("select * from Subscribe where name = #{name} and description = #{description}")
    List<Subscribee> findSubscribeeByNameandDescription(@Param("name") String name, @Param("description") String description);

    @Insert("insert into Subscribe(name, description, price, time, platform, shop_name) values(#{name}, #{description}, #{price}, #{time}, #{platform}, #{shop_name})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertNewSubscribee(Subscribee Subscribee);

    @Delete("delete from Subscribe where name = #{name} and description = #{description}")
    void deleteSubscribee(@Param("name") String name, @Param("description") String description);

    @Update("update Subscribe set price = #{price}, item_time = #{time} where description = #{description}")
    void updatePriceByName(@Param("price") Double price, @Param("time") LocalDateTime time, @Param("description") String description);
}
