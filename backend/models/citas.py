from sqlalchemy import Column, String
from db.database import Base


class Citas(Base):
    __tablename__ = "citas"

    id=Column(String, primary_key=True, index=True)
    correo=Column(String, nullable=True)
    nombre=Column(String, nullable=True)
    institucion=Column(String, nullable=True)
    telefono=Column(String, nullable=True)
    proyecto=Column(String, nullable=True)
    archivo=Column(String, nullable=True)
    fecha=Column(String, nullable=True)
    hora=Column(String, nullable=True)