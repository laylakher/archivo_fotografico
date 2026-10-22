from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 

from core.config import settings
from routers import galeria

app = FastAPI(
    Title="Archivo Fotografico del MNA",
    description = "Coleccion de fondos fotograficos y documentos del archivo historico",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = settings.ALLOWED_ORIGINS,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]

)

app.include_router(galeria.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host ="127.0.0.1", port=8000, reload=True)