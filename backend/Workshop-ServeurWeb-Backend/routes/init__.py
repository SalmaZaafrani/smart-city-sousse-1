from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from models.makeup import MakeUpSession
from firebase_admin import db
import firebase_config  # On importe juste pour s'assurer que Firebase est initialisé

router = APIRouter(prefix="/makeup", tags=["Rattrapage"])

@router.post("/")
def create_makeup(makeup: MakeUpSession, session: Session = Depends(get_session)):
    
        # 1️⃣ Sauvegarder dans SQL
    session.add(makeup)
    session.commit()
    session.refresh(makeup)

        # 2️⃣ Sauvegarder dans Firebase
    ref = db.reference(f"makeup/{makeup.id}")
    ref.set({
        "id": makeup.id,
        "student_id": makeup.student_id,
        "session_id": makeup.session_id,
        "new_date": str(makeup.new_date),
        "reason": makeup.reason
    })

    return {"message": "Rattrapage créé", "data": makeup}

