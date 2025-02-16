import React, { useState, useEffect } from 'react';
import { Input, message, Button, Menu, Modal} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreTwoTone, AppstoreAddOutlined, AppstoreOutlined} from '@ant-design/icons';
import axios from 'axios';
import './menu.css';
import ItemList from '../components/itemlist';
const { Search } = Input;
const MenuPage = () => {
    // 爬到的数据
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [platform, setPlatform] = useState('苏宁');
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isLoad, setisLoad] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [newSearchValue, setNewSearchValue] = useState('');

    
    useEffect(() => {
        const fetchData = async () => {
            setisLoad(true);
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const temp = params.get('search');
            setSearchValue(temp);
            // 等待查询结果以及写入数据库
            await axios.get('/item/insert', {
                params: {
                    input: temp
                }
            })
            .then(res => {
                console.log(res);
                if (res.data.messageString === "success") {                    
                    console.log("搜索成功");
                    console.log(res.data.payLoad);
                    setData(res.data.payLoad);
                }
                else {
                    message.error(res.data.messageString);
                    // setTimeout(() => {
                    //     window.location.href = '/search';
                    // }, 2000);
                }                
            })
            .catch(err => {
                console.log(err);
            });
            setisLoad(false);            
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data != null)
            setFilter(data.filter(item => item.platform === platform));
    },[platform, data]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleMySubcribe = () => {
        console.log("我的关注点击事件");
        window.location.href = '/subscribe';
    };
    
    const handleShowLogout = () => {
        console.log("退出登录点击事件");
        setIsLogout(true);        
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');        
        setIsLogout(false);
        window.location.href = '/login';
    };

    const handleSearch = () => {
        console.log(newSearchValue);
        window.location.href = '/menu?search=' + newSearchValue;
      };

    const items = [
        {
          key: '1',
          label: '欢迎您，' + (localStorage.getItem('username') === null ? '游客' : localStorage.getItem('username')),
        },
        {
          key: '2',
          label: (
            <div onClick={handleMySubcribe}>我的关注</div>
          ),
        },
        {
          key: '3',
          label: (
            <div onClick={handleShowLogout} style={{ color: 'white' }}>退出登录</div>
          ),
        },
      ];

    const submenu = [
        {
            label: '苏宁易购',
            key: '苏宁',
            icon: <AppstoreAddOutlined />,
        }, 
        {
            label: '当当网',
            key: '当当',
            // fancy icon
            icon: <AppstoreTwoTone/>,
        },
        {
            label: '京东商城',
            key: '京东',
            icon: <AppstoreOutlined />,
        }
    ];

    const onClick = (e) => {
        console.log('click ', e);
        setPlatform(e.key);
      };

    return (
        <div style={{ height: "100vh", display: "flex" }}>
          {/* 侧边栏 */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: sidebarVisible ? "250px" : "0",
              height: "100vh",
              backgroundColor: "#8d6e63",
              overflowX: "hidden",
              transition: "0.3s",
              padding: sidebarVisible ? "10px" : "0",
              color: "white",
            }}
          >
            <h2 style={{ color: "white", textAlign: "center" }}>Goshops</h2>
            <Menu
              theme="dark"
              mode="inline"
              items={items}
              style={{ backgroundColor: "#8d6e63" }}
            />
          </div>

        {/* 主内容 */}
            <div
            style={{
                marginLeft: sidebarVisible ? "260px" : "0",
                width: "100%",
                transition: "0.3s",
            }}
            >
            <Modal
                title="确认退出登录"
                open={isLogout}
                onOk={handleLogout}
                onCancel={() => setIsLogout(false)}
                okText="确认"
                cancelText="取消"
            >
                确定要退出登录吗？
            </Modal>
            <Button
                type="text"
                onClick={toggleSidebar}
                style={{
                margin: "10px",
                position: "fixed",
                top: "10px",
                left: "10px",
                zIndex: 1000,
                fontSize: "20px",                
                }}
                icon={sidebarVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            />
                <div style={{ textAlign: 'center', marginTop: '2%' }}>
                <h3>
                    <span class="nordic-style">Goshops</span>
                    正在为您搜索: <span class="search-text">{searchValue}</span>
                </h3>
                <p />
                <Search
                    placeholder="请输入商品名称"
                    size="large"
                    style={{ width: '50%' }}
                    onChange={(e) => setNewSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    enterButton
                />
                </div>
                <Menu onClick={onClick} selectedKeys={[platform]} mode="horizontal" items={submenu} />
                <br />
                <div> {isLoad ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '2%', marginLeft: '2%'}}>                                           
                                  <h3>加载中，请稍候...</h3>
                                </div> : <ItemList items={filter} />                                  
                        }

                </div>
            </div>
        </div>
      );
}

export default MenuPage;