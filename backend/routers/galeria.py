from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db.database import get_bd
from models.galeria import Fondo
from schemas.galeria import FondoResponse

router = APIRouter(
    prefix="/galeria",
    tags=["Galeria"]
)

@router.get("/fondos", response_model=List[str], summary="Obtener todos los fondos disponibles")
def obtener_fondos(db: Session = Depends(get_bd)):
    """
    Retorna una lista con los nombres de todos los fondos (colecciones) disponibles.
    (Las 13 colecciones que se mostrarán en la galería).
    """
    fondos = db.query(Fondo.fondo).distinct().all()
    return [f[0] for f in fondos if f[0] is not None]

@router.get("/fondos/{nombre_fondo}", response_model=List[FondoResponse], summary="Obtener imágenes por fondo")
def obtener_imagenes_por_fondo(nombre_fondo: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_bd)):
    """
    Obtiene todas las imágenes y su información correspondiente a un fondo específico.
    """
    imagenes = db.query(Fondo).filter(Fondo.fondo == nombre_fondo).offset(skip).limit(limit).all()
    if not imagenes:
        raise HTTPException(status_code=404, detail="No se encontraron imágenes para este fondo")
    return imagenes

@router.get("/imagenes/{imagen_id}", response_model=FondoResponse, summary="Obtener detalle de una imagen")
def obtener_imagen_por_id(imagen_id: str, db: Session = Depends(get_bd)):
    """
    Obtiene el detalle de una imagen específica por su ID.
    """
    imagen = db.query(Fondo).filter(Fondo.id == imagen_id).first()
    if not imagen:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")
    return imagen
