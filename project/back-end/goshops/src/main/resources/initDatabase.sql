-- remove the table named 'User' if it exists
-- drop table if exists User;
create table if not exists User (
    id int primary key auto_increment,
    name varchar(128) not null unique,
    password varchar(128) not null,
    email varchar(128) not null unique
    );

-- drop table if exists Item;
create table if not exists Item (
    id int primary key auto_increment,
    price double not null,
    description varchar(512) not null,
    img varchar(255) not null,
    category varchar(255) default null,
    time DATETIME not null default current_timestamp,
    shop_name varchar(255) default null,
    platform varchar(255) not null,
    detail_url varchar(2048) default null
);

-- drop table if exists History;
create table if not exists History (
    id int primary key auto_increment,
    name varchar(128) not null,
    search_input varchar(128) not null,
    search_time DATETIME not null default current_timestamp
);

create table if not exists subscribe (
    id int primary key auto_increment,
    name varchar(128) not null,
    description varchar(512) not null,
    price double not null,
    time DATETIME not null,
    platform varchar(255) not null,
    shop_name varchar(255) default null

);

create table if not exists pricehistory (
    id int primary key auto_increment,
    price double not null,
    time DATETIME not null default current_timestamp,
    description varchar(512) not null    
);