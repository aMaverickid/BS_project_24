import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const SubscribePage = () => {
  

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await axios.get('/subscribe/get', {
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
                setData(res.data.payLoad);
            }
        })
       .catch(error => {
            console.log(error);
        });
    };
    fetchData();
  }, []);

  const renewData = () => {
    axios.get('/subscribe/get', {
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
            setData(res.data.payLoad);
        }
    })
   .catch(error => {
        console.log(error);
    });
  };

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '最近更新时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => {onSetoffDiscount(record)}}>取消关注</Button>
      ),
    },
  ];

  const onSetoffDiscount = (record) => {
    axios.delete('/subscribe/delete', {
        params: {
            jwt_value: localStorage.getItem('token'),
            description: record.description
        }
    })
    .then(res => {
        if (res.data.messageString === "invalid token") {
            message.error("登录token已失效，请重新登录");
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        } else if (res.data.messageString === "success") {
            message.success("取消关注成功");
            renewData();
        } else {
            message.error(res.data.messageString);
        }
    })
   .catch(error => {
        console.log(error);
    });
  }

  const onBack = () => {
    window.history.back();
  }

  return (
    <div>
        <div style={{textAlign: 'center'}}>
            <div>
                <Button type="primary" onClick={onBack} style={{float: 'left'}}>返回</Button>
                <h2>我的关注</h2>
            </div>
            <Table dataSource={data} columns={columns} />
        </div>
    </div>
  );
};

export default SubscribePage;