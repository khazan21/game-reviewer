from flask import make_response, request;
from flask_restful import Resource; 
from config import app, db, api; 
from models import User, Review;

class Users(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_user = User(user_name = data['userName'], password_hash = data['password'])
        except Exception as e:
            return make_response({'error': str(e)}, 404)
    
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(only = ('id', 'user_name')), 201)

api.add_resource(Users, '/users')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.user_name == data['userName']).first()
        if not user:
            return make_response({'error': 'Username not found.'}, 404)
        else:
            if user.authenticate(data['password']):
                return make_response(user.to_dict(only = ('id', 'user_name')), 200)
            else:
                return make_response({'error': 'Password does not match username.'}, 404)
    
api.add_resource(Login, '/login')
    
class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        dictReviews = [r.to_dict() for r in reviews]

        return make_response(dictReviews, 200)

    def post(self):

        data = request.get_json()
        try:
            new_review = Review(review = data['review'], reviewer_name = data['reviewer_name'])
        except Exception as e:
            return make_response({'error': str(e)}, 404)
    
        db.session.add(new_review)
        db.session.commit()

        return make_response(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

class ReviewById(Resource):
    def patch(self, id):
        pass

    def delete(self, id):
        pass

api.add_resource(ReviewById, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

