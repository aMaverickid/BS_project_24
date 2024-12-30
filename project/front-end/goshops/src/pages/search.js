import React, { useState, useEffect } from 'react';
import { Input, message, List, Button, Menu, Modal} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import axios from 'axios';
const { Search } = Input;



const Searchpage = () => {  
    const [searchValue, setSearchValue] = useState(''); 
    const [history, setHistory] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    
    useEffect(() => {
        // 获取历史记录
        const getHistory = async () => {
            await axios.get('/history/get', {
                params: {
                    jwt_value: localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.data.messageString === "invalid token") {
                    message.error("登录token已失效，请重新登录");
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                } else {
                    console.log(res.data.payLoad);                    
                    setHistory(res.data.payLoad);
                }
            })
           .catch(error => {
                console.log(error);
            });
        }
        getHistory();
    }, [reloadData])

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleMySubcribe = () => {
        console.log("我的关注点击事件");
        window.location.href = '/subcribe';
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


    const handleSearch = () => {
        if (searchValue === '') {
            message.error('请输入商品名称!');
        } 
        if (localStorage.getItem('token') === null) {
            message.error('登录后使用更多功能!');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }
        else {            
            axios.post('/history/insert', null, {
                params: {
                    jwt_value: localStorage.getItem('token'),
                    search_input: searchValue
                }})
                .then(res => {
                    if (res.data.messageString === "invalid token") {
                        message.error("登录token已失效，请重新登录");
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                    } else {
                        message.success('搜索成功');
                        setReloadData(!reloadData);
                        window.location.href = '/menu?search=' + searchValue;
                    }
                })
               .catch(error => {
                    console.log(error);
                });
        }
    }

    const OnItemClick = (item) => {
        axios.post('/history/insert', null, {
            params: {
                jwt_value: localStorage.getItem('token'),
                input: item
            }})
            .then(res => {
                if (res.data.message === "invalid token") {
                    message.error("登录token已失效，请重新登录");
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                }
            })
           .catch(error => {
                console.log(error);
            });
        setReloadData(!reloadData);
        window.location.href = '/menu?search=' + encodeURIComponent(item);
    }

    // const handleInputChange = (e) => {
    //     setSearchValue(e.target.value);
    // }

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
              marginLeft: sidebarVisible ? "250px" : "0",
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
            <div style={{ height: "100vh" }}>
              <div style={{ textAlign: 'center', marginTop: '5%' }}>
                <h2>更多好价好物，尽在goshops!</h2>
                <p />
                <Search
                  placeholder="商品名称"
                  size="large"
                  style={{ width: '50%' }}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  enterButton
                />
              </div>
              <div style={{ display: 'flex' }}>
                <List
                  header={<div><h2>搜索历史</h2></div>}
                  style={{ marginTop: '5%', width: '100%', margin: "5% 20%", height: "80vh" }}
                  bordered
                  dataSource={history}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<div onClick={() => OnItemClick(item)}>{item}</div>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Searchpage;