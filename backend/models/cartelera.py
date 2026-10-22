from sqlalchemy import Column, String, Integer
from backend.db.database import Base

class Cartelera(Base):
    __tablename__ = "eventos"

    id = Column(String, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    tipo = Column(String, nullable=False)
    resumen = Column(String, nullable=False)
    lugar = Column(String, nullable=False)
    participantes = Column(String, nullable=False)
    observaciones = Column(String, nullable=True)
    fecha = Column(String, nullable=False)
    expectativa = Column(Integer,nullable=True)
