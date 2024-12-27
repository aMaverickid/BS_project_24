-- remove the table named 'User' if it exists
drop table if exists User;
create table if not exists User (
    id int primary key auto_increment,
    name varchar(128) not null unique,
    password varchar(128) not null,
    email varchar(128) not null unique
    );

-- create table if not exists History (
--     id int primary key auto_increment,
--     account varchar(128) not null,
--     search_input varchar(128) not null,
--     search_time DATETIME not null
-- );

-- create table if not exists Item (
--     id int primary key auto_increment,
--     item_name varchar(512) not null,
--     price double not null,
--     shop_name varchar(512),
--     item_time DATETIME not null,
--     platform varchar(128) not null,
--     image varchar(256),
--     item_id varchar(512)
-- );

-- create table if not exists Discount (
--     id int primary key auto_increment,
--     account varchar(128) not null,
--     item_name varchar(512) not null,
--     price double not null,
--     item_time DATETIME not null,
--     platform varchar(128) not null
-- );