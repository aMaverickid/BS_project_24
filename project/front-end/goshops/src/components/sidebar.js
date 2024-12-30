import React, { useState } from 'react';
import { Layout, Menu, Typography, Modal } from 'antd';
import {
    HomeOutlined,
    HeartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import './sidebar.css';

const { Sider } = Layout;
const { Text } = Typography;

const SideBar = () => {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const username = localStorage.getItem('username') || '游客';

    const handleMyDiscount = () => {
        window.location.href = '/mydiscount';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogoutOpen(false);
        window.location.href = '/login';
    };

    const menuItems = [
        {
            key: '1',
            icon: <HomeOutlined />, // 首页图标
            label: '首页',
            onClick: () => (window.location.href = '/'),
        },
        {
            key: '2',
            icon: <HeartOutlined />,
            label: '我的关注',
            onClick: handleMyDiscount,
        },
        {
            key: '3',
            icon: <LogoutOutlined style={{ color: 'red' }} />,
            label: <span style={{ color: 'red' }}>退出登录</span>,
            onClick: () => setIsLogoutOpen(true),
        },
    ];

    return (
        <Sider
            width={250}
            style={{
                background: '#f7f3e9', // 温暖木质背景
                boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="sidebar-header" style={{ padding: '16px', textAlign: 'center' }}>
                <Text strong style={{ fontSize: '20px', color: '#856d4d' }}>
                    PriceWise
                </Text>
                <div style={{ marginTop: '8px', color: '#856d4d' }}>欢迎您，{username}</div>
            </div>

            <Menu
                mode="inline"
                style={{
                    background: 'transparent',
                    border: 'none',
                }}
                items={menuItems}
            />

            <Modal
                title="确认退出登录"
                open={isLogoutOpen}
                onOk={handleLogout}
                onCancel={() => setIsLogoutOpen(false)}
                okText="确认"
                cancelText="取消"
            >
                你确定要退出登录吗？
            </Modal>
        </Sider>
    );
};

export default SideBar;
