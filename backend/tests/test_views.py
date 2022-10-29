from flask import Flask
def test_homepage_with_fixture(test_client: Flask):
    response = test_client.post(
        "/api/signup", json={"username": "yawhkhkjhj", "password": "123456"}
    )
    assert response.status_code == 200
    
