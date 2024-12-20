// pages/api/submit_feedback.js

export const config = {
    api: {
        bodyParser: false, // 关闭默认的 body 解析，以便处理 FormData
    },
};

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parse error:', err);
            return res.status(400).json({ status: 'error', message: '表单解析失败' });
        }

        const { feedback, description, current_url, user_email } = fields;
        const { page_source } = files;

        if (!feedback || !description || !current_url || !user_email || !page_source) {
            return res.status(400).json({ status: 'error', message: '缺少必要字段' });
        }

        // 读取 page_source 文件内容
        const filePath = page_source.filepath;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // 处理反馈数据，例如保存到数据库或发送到其他服务
        // 这里简化为打印到控制台
        console.log('收到反馈:', {
            feedback,
            description,
            current_url,
            user_email,
            page_source: fileContent,
        });

        return res.status(200).json({ status: 'success', message: '反馈提交成功' });
    });
}
