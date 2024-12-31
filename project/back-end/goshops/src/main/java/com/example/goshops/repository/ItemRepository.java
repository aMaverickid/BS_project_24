package com.example.goshops.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;

import java.util.List;

import com.example.goshops.model.Item;

@Mapper
public interface ItemRepository {

    @Insert("insert into item (price, description, img, category, shop_name, platform, detail_url) values (#{price}, #{description}, #{img}, #{category}, #{shop_name}, #{platform}, #{detail_url})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void InsertItem(Item item);

    @Select("select * from item where description = #{description}")
    List<Item> findItemByName(@Param("description") String description);

    // 查找价格最小一项
    @Select("select * from item where description = #{description} order by price limit 1")
    Item findMinPriceItemByName(@Param("description") String description);
}
