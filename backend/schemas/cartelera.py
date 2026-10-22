from pydantic import BaseModel, Field
from typing import Optional

class CarteleraBase(BaseModel):
    id: str = Field(..., alias="ID")
    titulo: str = Field(..., alias="Nombre del evento")
    tipo: str = Field(..., alias="Tipo de exposición")
    resumen: str = Field(..., alias="Resumen de la exposicion")
    lugar: str = Field(..., alias="Ubicación/ Dónde")
    participantes: str = Field(..., alias="Participaciones")
    observaciones: Optional[str] = Field(None, alias="Observaciones o restricciones")
    fecha: str = Field(..., alias="Mes y día")
    expectativa: Optional[str] = Field(None, alias="Asistencia esperada")

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True

class CarteleraRegistro(CarteleraBase):
    asistencia: Optional[int] = Field(None, alias="Asistencia")

class CarteleraCreate(CarteleraBase):
    pass


class CarteleraResponse(CarteleraBase):
    class Config:
        orm_mode = True
        from_atributes = True
        allow_population_by_field_name = True
        populate_by_name = True
