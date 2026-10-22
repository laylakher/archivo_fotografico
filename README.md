# Archivo Fotográfico del MNA

Este proyecto es una aplicación web para el **Fondo Fotográfico del Museo Nacional de Antropología (MNA)**. Su objetivo es proporcionar una interfaz interactiva y moderna para explorar el acervo histórico del museo, agendar citas de consulta, visualizar eventos e interactuar con el material fotográfico mediante juegos interactivos.

## 🚀 Arquitectura del Proyecto

El proyecto está dividido en un Backend desarrollado con **Python (FastAPI)** y un Frontend construido con **HTML, CSS (Tailwind) y Vanilla JavaScript**.

### Stack Tecnológico
- **Backend**: Python, FastAPI, SQLAlchemy, Uvicorn, SQLite.
- **Frontend**: HTML5, Tailwind CSS, JavaScript (Vanilla), GSAP (para animaciones), Lenis (para scroll suave), y Lucide Icons.

---

## 📂 Estructura del Proyecto

```text
archivo_fotografico/
│
├── backend/                  # Servidor y API (FastAPI)
│   ├── core/                 # Configuraciones globales (.env, settings)
│   ├── db/                   # Conexión a la base de datos SQLAlchemy
│   ├── models/               # Modelos de Base de Datos (Tablas)
│   ├── schemas/              # Esquemas de Pydantic (Validación de datos)
│   ├── routers/              # Endpoints de la API (citas, galería, etc.)
│   ├── main.py               # Punto de entrada de la aplicación FastAPI
│   └── .env                  # Variables de entorno (ej. DATABASE_URL)
│
├── static/                   # Recursos del Frontend
│   ├── css/                  # Hojas de estilo personalizadas
│   ├── js/                   # Lógica de frontend (animaciones, formularios, juegos)
│   │   ├── main.js           # Animaciones y comportamiento general
│   │   ├── ejes.js           # Datos de los 13 ejes temáticos (título e imagen)
│   │   ├── orbita.js         # Galería en órbita de la portada
│   │   ├── eje.js            # Página de cada eje temático (/ejes/{id})
│   │   ├── citas.js          # Manejo del formulario de citas y Teams
│   │   └── puzzle.js         # Lógica de los juegos interactivos (rompecabezas)
│   ├── templates/            # Archivos HTML (index.html servido por FastAPI)
│   ├── gallery/              # Imágenes del acervo histórico
│   └── colecciones/          # Imágenes de colecciones destacadas
│
└── README.md                 # Documentación del proyecto
```

---

## ✨ Características Principales

### 1. Galería Fotográfica (13 Colecciones)
El usuario puede explorar el archivo dividido en 13 colecciones específicas (Fondo Moneda, Planeación e Instalación, Visitantes, Piezas Arqueológicas, etc.). Los 13 ejes temáticos giran en círculos sobre una órbita: al acercar el cursor a uno la órbita se detiene, y al hacer clic la imagen se expande y lleva a la página del eje (`/ejes/{id}`).

### 2. Cartelera de Eventos
Una sección dedicada a informar al usuario sobre las próximas conferencias, talleres y exposiciones temporales del archivo histórico.

### 3. Sistema de Citas y Asesoría Virtual
Un formulario conectado al backend que permite agendar citas presenciales para la consulta del archivo. Incluye una opción integrada para **solicitar asesoría virtual mediante Microsoft Teams**. Al confirmarse, el sistema devuelve un enlace dinámico para la videollamada.

### 4. Juegos Interactivos (Rompecabezas)
La página cuenta con una sección interactiva de rompecabezas deslizantes (`sliding puzzles` de 3x3). El usuario puede elegir entre 3 fotografías históricas y tratar de ordenarlas haciendo clic en las piezas.

---

## 🛠 Instalación y Ejecución Local

### Prerrequisitos
- Python 3.9+
- Entorno virtual (recomendado)

### Pasos para ejecutar

1. **Clonar o descargar el repositorio**.
2. **Navegar a la carpeta del backend**:
   ```bash
   cd archivo_fotografico/backend
   ```
3. **Activar el entorno virtual** (si se encuentra creado):
   - En Windows: `.venv\Scripts\activate`
   - En Mac/Linux: `source .venv/bin/activate`
4. **Instalar dependencias**:
   ```bash
   pip install -r requirements.txt
   ```
5. **Asegurarse de tener el archivo `.env` configurado**:
   ```env
   DATABASE_URL=sqlite:///./database.db
   ```
6. **Ejecutar el servidor**:
   ```bash
   python main.py
   # O también: uvicorn main:app --reload
   ```
7. **Acceder a la aplicación**:
   Abre tu navegador y entra a: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🔗 Endpoints de la API (Backend)

La API cuenta con documentación autogenerada por Swagger. Puedes acceder a ella visitando `http://127.0.0.1:8000/docs`.

### Rutas principales
- **`GET /`**: Sirve el archivo `index.html` (interfaz principal).
- **`GET /ejes/{id}`**: Sirve la página de un eje temático (`eje.html`), del 1 al 13.
- **`POST /citas/`**: Endpoint para crear y guardar una nueva cita en la base de datos.
- **`GET /citas/`**: Retorna el listado de las citas agendadas.
- **Montaje `/static`**: Expone de manera pública los recursos CSS, JS e imágenes requeridos por el frontend.
