import requests
import json
import os
import sys
from pathlib import Path

# 基础 URL
BASE_URL = "https://api-homework-seven.vercel.app/api"

# API 端点列表
API_ENDPOINTS = {
    "login": "/login",
    "submit_feedback": "/submit_feedback",
    "config": "/config",
    "get_api_setting": "/get_api_setting"
}

# 登录测试数据
LOGIN_DATA = {
    "login": "true",
    "username": "test",
    "password": "123",
    "device_id": "device123"
}

# 配置测试数据
CONFIG_DATA = {
    "config": "true",
    "username": "test"
}

# 获取 API 设置测试数据
GET_API_SETTING_DATA = {
    "get_api_setting": "true",
    "username": "test"
}

# 提交反馈测试数据
FEEDBACK_DATA = {
    "feedback": "true",
    "description": "这是一个测试反馈",
    "current_url": "https://example.com",
    "user_email": "test@example.com"
}

# 临时页面源代码文件路径
PAGE_SOURCE_FILE = "temp_page_source.html"


def create_temp_page_source(file_path):
    """创建一个临时的 HTML 文件用于提交反馈测试。"""
    html_content = "<!DOCTYPE html><html><head><title>Test Page</title></head><body><h1>测试页面源代码</h1></body></html>"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)


def cleanup_temp_page_source(file_path):
    """删除临时的 HTML 文件。"""
    try:
        os.remove(file_path)
    except OSError as e:
        print(f"Error deleting temporary file {file_path}: {e}")


def test_login(endpoint):
    """测试登录接口。"""
    url = BASE_URL + endpoint
    try:
        response = requests.post(url, json=LOGIN_DATA, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "success":
                print("[Login] 成功：", json.dumps(data, ensure_ascii=False, indent=2))
            else:
                print("[Login] 失败：", json.dumps(data, ensure_ascii=False, indent=2))
        else:
            print(f"[Login] HTTP {response.status_code}：{response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[Login] 请求错误：{e}")


def test_submit_feedback(endpoint):
    """测试提交反馈接口。"""
    url = BASE_URL + endpoint

    # 创建临时页面源代码文件
    create_temp_page_source(PAGE_SOURCE_FILE)

    try:
        with open(PAGE_SOURCE_FILE, "rb") as f:
            files = {
                "page_source": ("page_source.html", f, "text/html")
            }
            data = FEEDBACK_DATA
            response = requests.post(url, data=data, files=files, timeout=30)

        if response.status_code == 200:
            data = response.json()
            print("[Submit Feedback] 响应：", json.dumps(data, ensure_ascii=False, indent=2))
        else:
            print(f"[Submit Feedback] HTTP {response.status_code}：{response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[Submit Feedback] 请求错误：{e}")
    finally:
        # 清理临时文件
        cleanup_temp_page_source(PAGE_SOURCE_FILE)


def test_config(endpoint):
    """测试获取配置接口。"""
    url = BASE_URL + endpoint
    try:
        response = requests.post(url, data=CONFIG_DATA, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("[Config] 响应：", json.dumps(data, ensure_ascii=False, indent=2))
        else:
            print(f"[Config] HTTP {response.status_code}：{response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[Config] 请求错误：{e}")


def test_get_api_setting(endpoint):
    """测试获取 API 设置接口。"""
    url = BASE_URL + endpoint
    try:
        response = requests.post(url, data=GET_API_SETTING_DATA, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("[Get API Setting] 响应：", json.dumps(data, ensure_ascii=False, indent=2))
        else:
            print(f"[Get API Setting] HTTP {response.status_code}：{response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[Get API Setting] 请求错误：{e}")


def main():
    print("开始测试 API 端点...\n")

    # 测试登录接口
    if "login" in API_ENDPOINTS:
        print("测试登录接口...")
        test_login(API_ENDPOINTS["login"])
        print("\n")

    # 测试提交反馈接口
    if "submit_feedback" in API_ENDPOINTS:
        print("测试提交反馈接口...")
        test_submit_feedback(API_ENDPOINTS["submit_feedback"])
        print("\n")

    # 测试获取配置接口
    if "config" in API_ENDPOINTS:
        print("测试获取配置接口...")
        test_config(API_ENDPOINTS["config"])
        print("\n")

    # 测试获取 API 设置接口
    if "get_api_setting" in API_ENDPOINTS:
        print("测试获取 API 设置接口...")
        test_get_api_setting(API_ENDPOINTS["get_api_setting"])
        print("\n")

    print("API 端点测试完成。")


if __name__ == "__main__":
    main()
