from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List 

from db.database import get_bd
from models.citas import Citas
from schemas.citas import CitasResponse, CreateCitas

router = APIRouter(
    prefix="/citas",
    tags=["Citas"]
)

@router.post("/", response_model=CitasResponse)
def create_cita(cita: CreateCitas):
    # In a real scenario we'd use get_bd and save to DB
    # We are returning the created schema as response
    return cita

@router.get("/", response_model=List[CitasResponse])
def get_citas():
    return []
