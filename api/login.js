// pages/api/login.js

export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
    }

    const { login, username, password, device_id } = req.body;

    // 固定的用户凭证
    const mockUser = {
        username: 'test',
        password: '123',
        nickname: '测试用户',
        endtime: '2099-12-31',
        subscription_plan: 2, // 2: 普通订阅, 3: 高级订阅
    };

    if (login !== 'true') {
        return res.status(400).json({ status: 'error', message: '无效的请求参数' });
    }

    if (username === mockUser.username && password === mockUser.password) {
        return res.status(200).json({
            status: 'success',
            user: {
                username: mockUser.username,
                nickname: mockUser.nickname,
                endtime: mockUser.endtime,
                subscription_plan: mockUser.subscription_plan,
            },
        });
    } else {
        return res.status(401).json({
            status: 'error',
            message: '用户名或密码错误',
        });
    }
}
