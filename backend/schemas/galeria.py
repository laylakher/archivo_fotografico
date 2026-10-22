from pydantic import BaseModel, Field
from typing import Optional

class FondoBase(BaseModel):
    id: str = Field(..., alias="ID")
    clave_topografica: Optional[str] = Field(None, alias="CLAVE TOPOGRÁFICA")
    toma_1: Optional[str] = Field(None, alias="TOMA_1")
    fondo: Optional[str] = Field(None, alias="FONDO")
    subfondo: Optional[str] = Field(None, alias="SUBFONDO")
    seccion: Optional[str] = Field(None, alias="SECCIÓN")
    serie: Optional[str] = Field(None, alias="SERIE")
    coleccion: Optional[str] = Field(None, alias="COLECCIÓN")
    titulo: Optional[str] = Field(None, alias="TÍTULO")
    autor: Optional[str] = Field(None, alias="AUTOR")
    fecha: Optional[str] = Field(None, alias="FECHA")
    lugar_imagen_visual: Optional[str] = Field(None, alias="LUGAR DE LA IMAGEN VISUAL")
    informacion_adicional: Optional[str] = Field(None, alias="INFORMACIÓN ADICIONAL")
    proceso_fotografico: Optional[str] = Field(None, alias="PROCESO FOTOGRÁFICO")
    medidas: Optional[str] = Field(None, alias="MEDIDAS")
    color: Optional[str] = Field(None, alias="COLOR")
    polaridad: Optional[str] = Field(None, alias="POLARIDAD")
    tipo: Optional[str] = Field(None, alias="TIPO")
    portador_base: Optional[str] = Field(None, alias="PORTADOR O BASE")
    inscripciones: Optional[str] = Field(None, alias="INSCRIPCIONES")
    tema: Optional[str] = Field(None, alias="TEMA")
    descriptores: Optional[str] = Field(None, alias="DESCRIPTORES")

    class Config:
        allow_population_by_field_name = True
        populate_by_name = True

class FondoCreate(FondoBase):
    pass

class FondoResponse(FondoBase):
    class Config:

        #es para decirle a pydantic que no es un diccionario normal sino que es un objeto de la base de datos
        orm_mode = True# esto es para que pydantic funcione para la version 1 de fastapi
        from_attributes = True#esto es para que pydantic funcione para la version 2 de fastaapi
        #estos son para que se cree el esquema tanto con el nombre de la variable python como con el alias
        allow_population_by_field_name = True
        populate_by_name = True
