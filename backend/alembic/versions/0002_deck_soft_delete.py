"""Add is_deleted to decks for soft delete

Revision ID: 0002
Revises: 0001
Create Date: 2024-01-02 00:00:00.000000

"""
from typing import Sequence, Union
import sqlalchemy as sa
from alembic import op

revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("decks", sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default="false"))
    op.create_index("ix_decks_is_deleted", "decks", ["is_deleted"])


def downgrade() -> None:
    op.drop_index("ix_decks_is_deleted", table_name="decks")
    op.drop_column("decks", "is_deleted")
