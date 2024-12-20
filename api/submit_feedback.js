// pages/api/submit_feedback.js

export const config = {
  api: {
    bodyParser: false, // 关闭默认的 body 解析，以便处理 FormData
  },
};

import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

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
    const fileContent = fs.readFileSync(filePath);

    // 创建 FormData 以转发到远程 API
    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('description', description);
    formData.append('current_url', current_url);
    formData.append('user_email', user_email);
    formData.append('page_source', fileContent, {
      filename: 'page_source.html',
      contentType: 'text/html',
    });

    try {
      const response = await fetch('https://api-homework-seven.vercel.app/api/submit_feedback', {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });

      const result = await response.json();
      return res.status(200).json(result);
    } catch (error) {
      console.error('Submit feedback error:', error);
      return res.status(500).json({ status: 'error', message: '提交反馈失败' });
    }
  });
}
