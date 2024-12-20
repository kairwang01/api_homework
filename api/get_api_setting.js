// pages/api/get_api_setting.js

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

    const { get_api_setting, username } = req.body;

    if (get_api_setting !== 'true' || !username) {
        return res.status(400).json({ status: 'error', message: '无效的请求参数' });
    }

    // 模拟从数据库或其他服务获取 API 设置
    const apiSetting = {
        status: "success",
        database_type: "PostgreSQL"
    };

    return res.status(200).json(apiSetting);
}
