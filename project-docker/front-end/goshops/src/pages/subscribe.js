import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { render } from "@testing-library/react";

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

  const renewSubscribe = () => {
    axios.post('/subscribe/')
  }

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
        title: '商品平台',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
      title: '最近更新时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '管理',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => {onSetoffDiscount(record)}}>取消关注</Button>
      ),
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Button type="primary" onClick={() => {onQueryNewPrice(record)}}>手动查询最新价格</Button>
        )
    }
  ];

  const onQueryNewPrice = (record) => {
    axios.get('/item/findminprice', {
        params: {
            name: record.description
        }
    })
    .then(res => {
        console.log(res);
        if (res.data.messageString === "success") {
            if (res.data.payLoad.price < record.price) {
                message.success("价格有变动，新价格为：" + res.data.payLoad.price);
                // 更新数据库并发送降价提醒邮件
                axios.put('/subscribe/update', null, {
                    params: {
                        jwt_value: localStorage.getItem('token'),
                        description: record.description,
                        price: res.data.payLoad.price,
                        platform: res.data.payLoad.platform,
                        shop_name: res.data.payLoad.shop_name,
                        time: res.data.payLoad.time,
                        user_name: localStorage.getItem('username')
                    }
                })
                .then(res => {
                    if (res.data.messageString === "invalid token") {
                        message.error("登录token已失效，请重新登录");
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                    } else {
                        message.success("更新成功");
                        renewData();
                    }
                })
            }
            else {
                message.success("已是最低价格哦");
            }
            // axios.put('/subscribe/update', null, {
            //     params: {
            //         jwt_value: localStorage.getItem('token'),
            //         description: record.description,
            //         price: 0,
            //         platform: res.data.payLoad.platform,
            //         shop_name: res.data.payLoad.shop_name,
            //         time: res.data.payLoad.time,
            //         user_name: localStorage.getItem('username')
            //     }
            // })
            // .then(res => {
            //     if (res.data.messageString === "invalid token") {
            //         message.error("登录token已失效，请重新登录");
            //         setTimeout(() => {
            //             window.location.href = '/login';
            //         }, 1000);
            //     } else {
            //         message.success("更新成功");
            //         renewData();
            //     }
            // })                
        } else {
            message.error(res.data.messageString);
        }
    })
   .catch(error => {
        console.log(error);
    });
  }
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