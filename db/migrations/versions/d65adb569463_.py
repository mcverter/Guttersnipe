"""empty message

Revision ID: d65adb569463
Revises: 2406fb45e03e
Create Date: 2017-02-01 16:47:16.224755

"""

# revision identifiers, used by Alembic.
revision = 'd65adb569463'
down_revision = '2406fb45e03e'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('thing_tag_association',
    sa.Column('subtype_id', sa.Integer(), nullable=True),
    sa.Column('thing_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['subtype_id'], ['subtype.id'], ),
    sa.ForeignKeyConstraint(['thing_id'], ['thing.id'], )
    )
    op.drop_index('ix_shareable_tags', table_name='thing')
    op.drop_column('thing', 'tags')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('thing', sa.Column('tags', postgresql.ARRAY(TEXT()), autoincrement=False, nullable=True))
    op.create_index('ix_shareable_tags', 'thing', ['tags'], unique=False)
    op.drop_table('thing_tag_association')
    op.drop_table('tag')
    ### end Alembic commands ###
