from sqlalchemy import Column, String
from db.database import Base

class Fondo(Base):

    __tablename__ = "fondo"

    id = Column(String, primary_key=True, index=True)
    clave_topografica = Column(String, nullable=True)
    toma_1 = Column(String, nullable=True)
    fondo = Column(String, index=True, nullable=False)#uno de los 12 fondos 
    subfondo = Column(String, nullable=True)
    seccion = Column(String, nullable=True)
    serie = Column(String, nullable=True)
    coleccion = Column(String, nullable=True)
    titulo = Column(String, nullable=True)
    autor = Column(String, nullable=True)
    fecha = Column(String, nullable=True)
    lugar_imagen_visual = Column(String, nullable=True)
    informacion_adicional = Column(String, nullable=True)
    proceso_fotografico = Column(String, nullable=True)
    medidas = Column(String, nullable=True)
    color = Column(String, nullable=True)
    polaridad = Column(String, nullable=True)
    tipo = Column(String, nullable=True)
    portador_base = Column(String, nullable=True)
    inscripciones = Column(String, nullable=True)
    tema = Column(String, nullable=True)
    descriptores = Column(String, nullable=True)
