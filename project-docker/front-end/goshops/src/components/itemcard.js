import React, { useState } from 'react';
import { Card, Button, Modal, message, Typography } from 'antd';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './itemcard.css';
const { Text } = Typography;

const ItemCard = ({ item }) => {
  const [showMedal, setShowMedal] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false); // 控制价格历史弹窗
  const [priceHistoryData, setPriceHistoryData] = useState([]); // 存储历史价格数据

  const onSetSubscribe = () => {
    axios
      .post('/subscribe/insert', null, {
        params: {
          jwt_value: localStorage.getItem('token'),
          description: item.description,
          price: Number(item.price),
          platform: item.platform,
          shop_name: item.shop_name,
          time: item.time
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.messageString === "success") {
          message.success("设置成功");
          setShowMedal(false);
        } else if (res.data.messageString === "invalid token") {
          message.error("登录token已失效，请重新登录");
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        } else {
          message.error(res.data.messageString);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onShowMedal = () => {
    setShowMedal(true);
  };

  const onCloseMedal = () => {
    setShowMedal(false);
  };

  const onClick = () => {
    console.log("clicked");

    // 提示用户即将跳转
    const isConfirmed = window.confirm("您将要离开Goshops跳转至其他网站，是否继续？");

    // 如果用户确认跳转，则执行跳转
    if (isConfirmed) {
      window.location.href = item.detail_url;
    }
  };

  // 获取历史价格数据
  const onShowItemHistory = (description) => {
    // 假设你有一个API可以获取历史价格数据
    axios.get('/item/showhistory', {
      params: { name: description }
    })
    .then(res => {
      if (res.data.messageString === "success") {
        console.log(res.data.payLoad);
        setPriceHistoryData(res.data.payLoad);  // 设置历史价格数据
        setShowPriceHistory(true);  // 显示历史价格弹窗
      } else {        
        setShowPriceHistory(true);  // 显示历史价格弹窗
        message.error("获取历史价格失败");
      }
    })
    .catch(error => {
      console.error(error);
      setShowPriceHistory(true);  // 显示历史价格弹窗
      message.error("获取历史价格失败");
    });
  };

  const onClosePriceHistoryModal = () => {
    setShowPriceHistory(false);
  };

  return (
    <div className="item-card">
      <Modal 
        title="关注" 
        open={showMedal} 
        onOk={onSetSubscribe} 
        onCancel={onCloseMedal}
        className="modal"
      >
        <p>确认关注该商品？Goshops将为您发送降价提醒</p>
      </Modal>

      <Modal
        title="历史价格"
        visible={showPriceHistory}
        onCancel={onClosePriceHistoryModal}
        footer={null}
        width={800}
        className="modal"
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={priceHistoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Modal>

      <Card className="card">
        <img
          src={item.img}
          alt={item.description}
          className="item-card-img"
          onClick={onClick}
        />
        <p className="item-description" onClick={onClick}>{item.description}</p>
        <p className="shop-name" onClick={onClick}>{item.shopName}</p>
        <div className="price-container">
          <Text strong className="price">
            ￥{item.price}
          </Text>
          <div className="btn-container">
            <Button className="btn" onClick={() => onShowItemHistory(item.description)}>
              查看历史价格
            </Button>
            <Button className="btn" onClick={onShowMedal}>
              关注
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
