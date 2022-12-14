"""empty message

Revision ID: 0486459b49bb
Revises: 3f7e750509a0
Create Date: 2022-07-05 19:31:58.295668

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0486459b49bb'
down_revision = '3f7e750509a0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('login_attempts', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'login_attempts')
    # ### end Alembic commands ###
