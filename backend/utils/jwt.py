from jose import jwt
from datetime import datetime, timedelta
from utils.security import SECRET_KEY, ALGORITHM

def create_token(data):
    data["exp"] = datetime.utcnow() + timedelta(hours=2)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)