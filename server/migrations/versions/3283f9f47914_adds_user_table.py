"""adds user table

Revision ID: 3283f9f47914
Revises: e00056a265ef
Create Date: 2023-08-15 20:14:10.449645

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3283f9f47914'
down_revision = 'e00056a265ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
