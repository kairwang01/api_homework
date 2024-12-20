// pages/api/config.js

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

    // 模拟从数据库或其他服务获取配置
    const configData = {
        version: "1.0.0",
        announcement: "这是一个公告",
        apiurl: "https://api.example.com"
    };

    return res.status(200).json(configData);
}
