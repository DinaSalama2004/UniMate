import pytest


@pytest.fixture
def sample_user():
    return {"email": "student@test.com", "password": "Secret123!"}


def test_register_creates_student(client, sample_user):
    response = client.post("/register", json=sample_user)
    assert response.status_code == 200
    assert response.json() == {"message": "Student created"}


def test_register_duplicate_email(client, sample_user):
    client.post("/register", json=sample_user)
    response = client.post("/register", json=sample_user)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email exists"


def test_login_success(client, sample_user):
    client.post("/register", json=sample_user)
    response = client.post("/login", json=sample_user)
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "student"
    assert "access_token" in data
    assert data["access_token"]


def test_login_wrong_password(client, sample_user):
    client.post("/register", json=sample_user)
    response = client.post(
        "/login",
        json={"email": sample_user["email"], "password": "wrong-password"},
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_login_unknown_email(client):
    response = client.post(
        "/login",
        json={"email": "nobody@test.com", "password": "x"},
    )
    assert response.status_code == 401
