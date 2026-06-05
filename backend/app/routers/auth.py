from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.audit_log import AuditLog
from app.models.user import User
from app.schemas.auth import TokenResponse, UserLogin, UserOut, UserRegister
from app.utils.auth import create_access_token, hash_password, verify_password
from app.utils.deps import get_current_user

router = APIRouter()


def _log(db: Session, event: str, user_id=None, data: dict | None = None, ip: str | None = None):
    db.add(AuditLog(user_id=user_id, event_type=event, event_data=data, ip_address=ip))


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(body: UserRegister, request: Request, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == body.email.lower()).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=body.email.lower(),
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
    )
    db.add(user)
    db.flush()
    _log(db, "USER_REGISTERED", user.id, ip=request.client.host if request.client else None)
    db.commit()
    db.refresh(user)
    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(body: UserLogin, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email.lower()).first()
    if not user or not verify_password(body.password, user.hashed_password):
        _log(db, "USER_LOGIN_FAILED", data={"email": body.email}, ip=request.client.host if request.client else None)
        db.commit()
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")
    user.last_login_at = datetime.now(timezone.utc)
    _log(db, "USER_LOGIN", user.id, ip=request.client.host if request.client else None)
    db.commit()
    token = create_access_token(user.id)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user



# this is new change