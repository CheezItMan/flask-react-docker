# src/api/models.py

import os

from flask.globals import current_app
from sqlalchemy.sql import func

from src import bcrypt, db
import datetime
import jwt


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, username, email, password=""):
        self.username = username
        self.email = email
        self.password = bcrypt.generate_password_hash(
            password, current_app.config.get("BCRYPT_LOG_ROUNDS")
        ).decode()

    def encode_token(self, user_id):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(
                days=0, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
        }

        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )


if os.getenv("FLASK_ENV") == "development":
    from src import admin
    from src.api.users.admin import UsersAdminView

    admin.add_view(UsersAdminView(User, db.session))
