"""fixed relationships and added association proxy

Revision ID: 9308da92e05b
Revises: b0cfdb6155f8
Create Date: 2023-08-24 14:10:42.789031

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9308da92e05b'
down_revision = 'b0cfdb6155f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.add_column(sa.Column('game_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_games_game_id_games'), 'games', ['game_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_games_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint('fk_reviews_game_id_games', type_='foreignkey')
        batch_op.drop_constraint('fk_reviews_user_id_users', type_='foreignkey')
        batch_op.drop_column('game_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('game_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_reviews_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key('fk_reviews_game_id_games', 'games', ['game_id'], ['id'])

    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_games_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_games_game_id_games'), type_='foreignkey')
        batch_op.drop_column('user_id')
        batch_op.drop_column('game_id')

    # ### end Alembic commands ###