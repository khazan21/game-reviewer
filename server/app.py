from flask import make_response, request, session, jsonify;
from flask_restful import Resource; 
from config import app, db, api; 
from models import User, Review, Game;

class Users(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_user = User(user_name = data['userName'], password_hash = data['password'])
        except Exception as e:
            return make_response({'error': str(e)}, 404)
        db.session.add(new_user)
        db.session.commit()
        
        session['user_id'] = new_user.id

        return make_response(new_user.to_dict(only = ('id', 'user_name')), 201)

api.add_resource(Users, '/users')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None

        return make_response({'message': 'Logout was successful.'}, 204)

api.add_resource(Logout, '/logout')

class Authenticate(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'error': 'User not logged in.'}, 401)

api.add_resource(Authenticate, '/authenticate')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.user_name == data['userName']).first()
        if not user:
            return make_response({'error': 'Username not found.'}, 404)
        else:
            if user.authenticate(data['password']):
                session['user_id'] = user.id
                return make_response(user.to_dict(only = ('id', 'user_name')), 200)
            else:
                return make_response({'error': 'Password does not match username.'}, 404)
    
api.add_resource(Login, '/login')

class Games(Resource):
    def get(self):
        games = Game.query.all()
        dict_games = [r.to_dict() for r in games]

        return make_response(dict_games, 200)

api.add_resource(Games, '/games')

class GamesById(Resource):
    def get(self, id):
        game = Game.query.get(id)
        dict_game = game.to_dict() 

        return make_response(dict_game, 200)

api.add_resource(GamesById, '/games/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        dict_reviews = [r.to_dict() for r in reviews]

        return make_response(dict_reviews, 200)

    def post(self):
        data = request.get_json()
        try:
            new_review = Review(review = data['review'], 
                                game_id = data['game_id'], user_id = data['user_id'])
        except Exception as e:
            return make_response({'error': str(e)}, 404)
    
        db.session.add(new_review)
        db.session.commit()

        return make_response(new_review.to_dict(), 201)

api.add_resource(Reviews, '/reviews')

class ReviewById(Resource):
    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter_by(id=id).first()
        if review:
            for key in data:
                setattr(review, key, data[key])
            db.session.commit()
            return make_response(review.to_dict(), 200)
        else:
            return make_response({'error': 'Review not found.'}, 404)

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        db.session.delete(review)
        db.session.commit()

        response = make_response(jsonify({"message": f"Review id {id} has been deleted"}), 200)
        return response

api.add_resource(ReviewById, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)