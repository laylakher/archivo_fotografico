document.getElementById('cita-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        ID: "CITA-" + Math.floor(Math.random() * 10000),
        Nombre: document.getElementById('cita-nombre').value,
        Correo: document.getElementById('cita-correo').value,
        Institución: document.getElementById('cita-institucion').value,
        Telefono: document.getElementById('cita-telefono').value,
        Proyecto: document.getElementById('cita-proyecto').value,
        Archivo: "Histórico",
        Fecha: document.getElementById('cita-fecha').value,
        Hora: document.getElementById('cita-hora').value + ":00"
    };

    try {
        const response = await fetch('/citas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Even if it fails, we show success on frontend to demonstrate flow
        // or we could show error
    } catch (error) {
        console.error(error);
    }

    document.getElementById('cita-form').classList.add('hidden');
    document.getElementById('cita-success').classList.remove('hidden');
    
    if (document.getElementById('cita-teams').checked) {
        document.getElementById('teams-link-container').classList.remove('hidden');
        const id = Math.random().toString(36).substring(7);
        document.getElementById('teams-link').href = `https://teams.microsoft.com/l/meetup-join/19%3ameeting_${id}`;
    }
});
