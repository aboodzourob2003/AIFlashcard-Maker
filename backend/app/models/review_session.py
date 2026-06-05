import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Integer, Numeric, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ReviewSession(Base):
    __tablename__ = "review_sessions"
    __table_args__ = (
        CheckConstraint("cards_known >= 0", name="ck_session_cards_known_nonneg"),
        CheckConstraint("cards_unknown >= 0", name="ck_session_cards_unknown_nonneg"),
        CheckConstraint(
            "cards_known + cards_unknown <= total_cards",
            name="ck_session_cards_sum",
        ),
        CheckConstraint("total_cards >= 0", name="ck_session_total_nonneg"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    deck_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("decks.id", ondelete="SET NULL"), nullable=True, index=True
    )
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    total_cards: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    cards_known: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    cards_unknown: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    score_percentage: Mapped[float | None] = mapped_column(Numeric(5, 2), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship("User", back_populates="review_sessions")
    deck: Mapped["Deck | None"] = relationship("Deck", back_populates="review_sessions")
    session_cards: Mapped[list["ReviewSessionCard"]] = relationship(
        "ReviewSessionCard", back_populates="session", cascade="all, delete-orphan"
    )
