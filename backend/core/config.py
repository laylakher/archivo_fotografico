from typing import List 
from pydantic_settings import BaseSettings
from pydantic import field_validator

#AQUI TIENES QUE PONER TODAS LAS VARIABLES QUE ESTAN EN .ENV PARA Q FUNCIONE
class Settings(BaseSettings):

    API_PREFIX : str ="/api"
    DEBUG: bool = True

    DATABASE_URL: str
    ALLOWED_ORIGINS: str = ""

    @field_validator("ALLOWED_ORIGINS")
    def parse_allowed_origins(cls, v: str) -> List[str]:
        return v.split(",") if v else[]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf_8"
        case_sensitive = True

settings = Settings()