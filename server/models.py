from config import db, bcrypt;
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable = False)

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_password):
        enc_new_password = new_password.encode('utf-8')
        encrypted_hash = bcrypt.generate_password_hash(enc_new_password)
        hash_password_str = encrypted_hash.decode('utf-8')
        self._password_hash = hash_password_str

    def authenticate(self, password):
        enc_password = password.encode('utf-8')
        return bcrypt.check_password_hash(self._password_hash, enc_password)

    def __repr__(self):
        return f'<User: {self.id}, {self.user_name}>'
    
class Game(db.Model):

    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String)
    game_pic = db.Column(db.String)

    def __repr__(self):
        return f'<Game: {self.id}, {self.game_name}>'

class Review(db.Model):

    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_name = db.Column(db.String)
    review = db.Column(db.String)

    def __repr__(self):
        return f'<Review: {self.id}, {self.reviewer_name}, {self.review}>'