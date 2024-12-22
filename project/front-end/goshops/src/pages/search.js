import React, { useState, useEffect } from 'react';
import { Input, message, List} from 'antd';
// import TopPart from '../components/toppart';
import axios from 'axios';
const { Search } = Input;



const Searchpage = () => {  
    const [searchValue, setSearchValue] = useState(''); 
    const [data, setData] = useState(['商品1', '商品2', '商品3', '商品4', '商品5', '商品6', '商品7', '商品8', '商品9', '商品10']);
    const [history, setHistory] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        // 获取历史记录
        const getHistory = async () => {
            await axios.get('/history/get', {
                params: {
                    jwt_value: localStorage.getItem('token')
                }
            })
            .then(res => {
                if (res.data.message === "invalid token") {
                    message.error("登录token已失效，请重新登录");
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                } else {
                    console.log(res.data.payload);
                    setHistory(res.data.payload);
                }
            })
           .catch(error => {
                console.log(error);
            });
        }
        getHistory();
    }, [reloadData])

    const handleSearch = () => {
        if (searchValue === '') {
            TooLessMessage();
        } else {
            axios.post('/history/insert', null, {
                params: {
                    jwt_value: localStorage.getItem('token'),
                    input: searchValue
                }})
                .then(res => {
                    if (res.data.message === "invalid token") {
                        message.error("登录token已失效，请重新登录");
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                    } else {
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

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const TooLessMessage = () => {
        message.info('请输入商品名称');
    }

  return (
    <div style={{height: "100vh"}}>
        <div style = {{textAlign: 'center', marginTop: '5%'}}>
            <h2>查询商品，发现更多好物：</h2>
            <p />
            <Search 
            placeholder="请输入商品名称" 
            size = "large" 
            style = {{width: '50%'}}
            onChange = {handleInputChange} 
            onSearch={handleSearch} enterButton />
        </div>
        <div style={{ display: 'flex' }}>
            {/* <List
                header={<div><h2>热门商品</h2></div>}
                style = {{marginLeft: '5%', marginTop: '5%', width: '40%'}}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<div onClick={() => OnItemClick(item)}>{item}</div>}
                        />
                    </List.Item>
                )}
            /> */}
            <List
                header={<div><h2>搜索历史</h2></div>}
                style = {{marginTop: '5%', width: '100%', margin: "5% 20%", height: "80vh"}}
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
    );
}

export default Searchpage;