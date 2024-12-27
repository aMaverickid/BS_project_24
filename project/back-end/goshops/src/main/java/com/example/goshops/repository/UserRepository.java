package com.example.goshops.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.goshops.model.User;

@Mapper
public interface UserRepository {
    
    // find 一个字段
    @Select("select password from user where name = #{name}")
    String getPasswordByAccount(@Param("name") String name);
    
    @Select("select name from user where name = #{name}")
    String getNameByName(@Param("name") String name);

    @Select("select email from user where email = #{email}")
    String getEmailByEmail(@Param("email") String email);

    // find all
    @Select("select * from user where email = #{email}")
    User getUserByEmail(@Param("email") String email);

    @Select("select * from user where name = #{name}")
    User getUserByAccount(@Param("name") String name);

    // insert
    @Insert("insert into user (name, password, email) values (#{name}, #{password}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertUser(User user);


    // update
    @Update("update user set password = #{password} where name = #{name}")
    void updatePasswordByName(@Param("name") String name, @Param("password") String password);
}
