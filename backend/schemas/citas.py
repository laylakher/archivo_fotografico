from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import date,time



class CitasBase(BaseModel):

    id: str = Field(..., alias="ID")
    correo: str = Field(None, alias="Correo")
    Nombre: str = Field(None, alias="Nombre")
    Institucion: str = Field(None, alias="Institución")
    telefono: str = Field(None, alias="Telefono")
    Proyecto: str = Field(None, alias="Proyecto")
    Archivo: str = Field(None, alias="Archivo")
    Fecha: date = Field(None, alias="Fecha")
    Hora: time = Field(None, alias="Hora")


    class Config:
        allow_population_by_field_name = True
        populate_by_name = True

class CreateCitas(CitasBase):

    @field_validator("Fecha")
    @classmethod
    def validar_dia_habil(cls, v:date):
        if v.weekday() < 5 and  v.weekday() > 1:
            raise ValueError("Las citas solo pueden agendarse de lunes a jueves.")

        return v

    @field_validator("Hora")
    @classmethod
    def validar_hora(cls, v: time):
        if not (time(9,0) <= v <= time(17,0)):
            raise ValueError("El horario de atencion es de 9:00 a 17:00 hrs.")

        return v

class CitasCreate(CitasBase):
    pass

class CitasResponse(CitasBase):

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True
        from_attributes = True
        orm_mode = True