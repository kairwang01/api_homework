import requests

try:
    response = requests.post(
        "https://api-homework-seven.vercel.app/api/validateUser",
        json={"username": "test_user"}
    )
    print(response.status_code, response.json())
except Exception as e:
    print("Error:", e)
