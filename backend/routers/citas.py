from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List 

from db.database import get_bd
from models.citas import Citas
from schemas.citas import CitasResponse, CreateCitas



router = APIRouter(
    prefix="/citas",
    tags=["Galeria"]
)

@router.get 
