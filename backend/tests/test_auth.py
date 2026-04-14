import pytest


@pytest.fixture
def sample_register():
    return {
        "full_name": "Test Student",
        "email": "student@test.com",
        "password": "Secret123!",
        "confirm_password": "Secret123!",
    }


@pytest.fixture
def sample_login():
    return {"email": "student@test.com", "password": "Secret123!"}


def test_register_creates_student(client, sample_register):
    response = client.post("/register", json=sample_register)
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "student"
    assert "token" in data
    assert data["token"]


def test_register_duplicate_email(client, sample_register):
    client.post("/register", json=sample_register)
    response = client.post("/register", json=sample_register)
    assert response.status_code == 400
    body = response.json()
    assert body["detail"]["code"] == "email_exists"
    assert "message" in body["detail"]


def test_register_passwords_mismatch(client, sample_register):
    bad = {**sample_register, "confirm_password": "Different123!"}
    response = client.post("/register", json=bad)
    assert response.status_code == 422
    body = response.json()
    assert body["error"] == "validation_error"
    assert any(
        "do not match" in d["message"].lower() for d in body["details"]
    )


def test_register_password_too_short(client, sample_register):
    bad = {
        **sample_register,
        "password": "short",
        "confirm_password": "short",
    }
    response = client.post("/register", json=bad)
    assert response.status_code == 422
    body = response.json()
    assert body["error"] == "validation_error"
    assert any("8 characters" in d["message"] for d in body["details"])


def test_register_invalid_email_format(client, sample_register):
    bad = {**sample_register, "email": "not-an-email"}
    response = client.post("/register", json=bad)
    assert response.status_code == 422
    assert response.json()["error"] == "validation_error"


def test_login_success(client, sample_register, sample_login):
    client.post("/register", json=sample_register)
    response = client.post("/login", json=sample_login)
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "student"
    assert "token" in data
    assert data["token"]


def test_login_wrong_password(client, sample_register, sample_login):
    client.post("/register", json=sample_register)
    response = client.post(
        "/login",
        json={"email": sample_login["email"], "password": "wrong-password"},
    )
    assert response.status_code == 401
    body = response.json()
    assert body["detail"]["code"] == "invalid_credentials"
    assert "message" in body["detail"]


def test_login_unknown_email(client):
    response = client.post(
        "/login",
        json={"email": "nobody@test.com", "password": "x"},
    )
    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "invalid_credentials"
