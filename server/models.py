from config import db, bcrypt;
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable = False)

    @validates('user_name')
    def validate_password(self, key, new_username):
        if type(new_username) is str and len(new_username) >= 4:
            return new_username
        else:
            raise ValueError("Username must be 4 or more characters") 

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, new_password):

        if type(new_password) is str and len(new_password) >= 4:
            enc_new_password = new_password.encode('utf-8')
            encrypted_hash = bcrypt.generate_password_hash(enc_new_password)
            hash_password_str = encrypted_hash.decode('utf-8')
            self._password_hash = hash_password_str

        else:
            raise ValueError("Password must be 4 or more characters") 


    def authenticate(self, password):
        enc_password = password.encode('utf-8')
        return bcrypt.check_password_hash(self._password_hash, enc_password)

    def __repr__(self):
        return f'<User: {self.id}, {self.user_name}>'
        
class Game(db.Model, SerializerMixin):

    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String)
    game_pic = db.Column(db.String)

    def __repr__(self):
        return f'<Game: {self.id}, {self.game_name}>'

class Review(db.Model, SerializerMixin):

    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_name = db.Column(db.String)
    review = db.Column(db.String)

    def __repr__(self):
        return f'<Review: {self.id}, {self.reviewer_name}, {self.review}>'