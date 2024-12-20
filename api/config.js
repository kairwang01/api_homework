// pages/api/config.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*'); // 根据需要调整允许的来源
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }

  const { config: configParam, username } = req.body;

  if (configParam !== 'true' || !username) {
    return res.status(400).json({ status: 'error', message: '无效的请求参数' });
  }

  // 模拟从远程 API 获取配置
  try {
    const response = await fetch('https://api-homework-seven.vercel.app/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ config: 'true', username }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Get config error:', error);
    return res.status(500).json({ status: 'error', message: '获取配置失败' });
  }
}
