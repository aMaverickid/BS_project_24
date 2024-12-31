import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";
import { Descriptions, message } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InfoPage = () => {
    const [data, setData] = useState([{id: null, item_name: null, price: null, platform: null, shop_name: null, image: null}]);
    const [item_name, setItem_Name] = useState("");
    const [latest_data, setLatest_Data] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            
          const query = window.location.search;
          const params = new URLSearchParams(query);
          const search_name = params.get('name'); 
        //   message.info("正在查询【" + search_name + "】的信息");         
          setItem_Name(search_name);
          await axios.get('/item/show', {
              params: {
                  name: search_name
              }
          })
          .then(res => {
            if (res.data.messageString === "success") {
                console.log(res.data.payLoad);
                setData(res.data.payLoad.reverse());
                setLatest_Data(res.data.payLoad[0]);
            }
            else {
                message.error(res.data.messageString);            
            }
          })
          .catch(error => {
              console.log(error);
          });
        };
        fetchData();
      }, []);

    const onBack = () => {
        window.history.back();
    };
    
    return (
        <div>
            <div>
                <LeftOutlined onClick={onBack} style = {{margin: '1%', fontSize: '20px', cursor: 'pointer'}} />
            </div>
            <div style = {{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                <h2>【{item_name}】</h2>
            </div>
            {isMobile && (
            <div>
                <div>
                    <img src = {latest_data.img} alt = {item_name} style = {{marginLeft: '25%', width: '50%', height: '50%'}} />
                </div>
                <div>
                    <Descriptions title="商品信息" layout="vertical" bordered="true" style={{width: '80%', marginLeft: '5%'}}>
                        <Descriptions.Item label="商品名称">{item_name}</Descriptions.Item>
                        <Descriptions.Item label="商品最新价格">{latest_data.price}</Descriptions.Item>
                        <Descriptions.Item label="商品来源">{latest_data.platform === null ? '暂无' : latest_data.platform}</Descriptions.Item>
                        <Descriptions.Item label="商品商家">{latest_data.shop_name === null ? '暂无' : latest_data.shop_name}</Descriptions.Item>
                        <Descriptions.Item label="商品链接">
                            <a href = {latest_data.detail_url} target = "_blank" rel = "noreferrer">{latest_data.detail_url}</a>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            )}
            {!isMobile && (
            <div style = {{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                <div>
                    <img src = {latest_data.img} alt = {item_name} style = {{width: '100%', height: '100%'}} />
                </div>
                <div>
                    <Descriptions title="商品信息" layout="vertical" bordered="true" style={{width: '80%', marginLeft: '5%'}}>
                        <Descriptions.Item label="商品名称">{item_name}</Descriptions.Item>
                        <Descriptions.Item label="商品最新价格">{latest_data.price}</Descriptions.Item>
                        <Descriptions.Item label="商品来源">{latest_data.platform === null ? '暂无' : latest_data.platform}</Descriptions.Item>
                        <Descriptions.Item label="商品商家">{latest_data.shop_name === '' ? '暂无' : latest_data.shop_name}</Descriptions.Item>
                        <Descriptions.Item label="商品链接">
                        <a href = {latest_data.detail_url} target = "_blank" rel = "noreferrer">{latest_data.detail_url}</a>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            )}
            <div style = {{display: 'flex', justifyContent: 'center', margin: '1%'}}>
            价格走势图
            </div>
            <ResponsiveContainer width="80%" height={400} style={{display: 'flex', justifyContent: 'center', margin: '1%'}}>
                <LineChart data={data}>
                    <XAxis dataKey="item_time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default InfoPage;