import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from core.config import settings
from routers import galeria, citas

app = FastAPI(
    title="Archivo Fotografico del MNA",
    description="Coleccion de fondos fotograficos y documentos del archivo historico",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Mount the static directory
static_path = os.path.join(os.path.dirname(__file__), "..", "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")

app.include_router(galeria.router)
app.include_router(citas.router)

@app.get("/")
def serve_index():
    return FileResponse(os.path.join(static_path, "templates", "index.html"))

# Debe coincidir con la lista EJES de static/js/ejes.js
TOTAL_EJES = 13

@app.get("/ejes/{eje_id}")
def serve_eje(eje_id: int):
    # La página es la misma para todos los ejes; static/js/eje.js la llena según el id
    if not 1 <= eje_id <= TOTAL_EJES:
        raise HTTPException(status_code=404, detail="Eje temático no encontrado")
    return FileResponse(os.path.join(static_path, "templates", "eje.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)