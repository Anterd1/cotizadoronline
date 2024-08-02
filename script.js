// Definir los valores de las escuelas
const valoresEscuelas = {
    'tecMonterrey': 1300000,
    'anahuac': 1200000,
    'udla': 1000000,
    'uvm': 900000
};

document.getElementById('cotizadorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const escuelaSeleccionada = document.getElementById('escuela').value;
    const costoActual = valoresEscuelas[escuelaSeleccionada];

    // Verifica si la edad es un número válido
    if (isNaN(edad) || edad <= 0) {
        alert("Por favor, ingresa un valor válido para la edad.");
        return;
    }

    const incrementoAnual = 0.07;
    const anioActual = new Date().getFullYear();
    const aniosHasta18 = 18 - edad;

    // Calcular el costo futuro
    const costoFuturo = costoActual * Math.pow(1 + incrementoAnual, aniosHasta18);
    console.log("Costo Futuro Calculado:", costoFuturo.toFixed(3));

    // Determinar el plan recomendado (10 o 15 años)
    const planAhorro = edad <= 4 ? 15 : 10;
    console.log("plan recomendado", planAhorro.toFixed(3))

    // Calcular el primer ahorro siguiendo la lógica de la hoja de cálculo
    const multiplicador = planAhorro === 15 ? 0.65 : 0.75;
    const primerAhorro = planAhorro === 15 
        ? costoFuturo * 0.65 * 0.75 
        : costoFuturo * 0.75 * 0.75;
    console.log("Primer Ahorro Calculado:", primerAhorro.toFixed(3));

    // Calcular ahorro anual y mensual
    const ahorroAnual = costoFuturo / planAhorro;
    const ahorroMensual = ahorroAnual / 12;
    console.log("Ahorro Anual Calculado:", ahorroAnual.toFixed(3));
    console.log("Ahorro Mensual Calculado:", ahorroMensual.toFixed(3));

    let resultadoHTML = `<h2 class="text-xl font-bold mb-4">Plan de Ahorro para ${nombre}</h2>`;
    resultadoHTML += `<p>La universidad de tu hijo(a) costará aproximadamente: $${formatNumber(costoFuturo.toFixed(2))}</p>`;
    resultadoHTML += `<p>Te recomendamos un plan de ahorro de ${planAhorro} años.</p>`;
    resultadoHTML += `<p>El primer año de tu plan debes ahorrar: $${formatNumber(primerAhorro.toFixed(2))}</p>`;

    resultadoHTML += `
        <table class="w-full caption-bottom text-sm">
            <thead class="[&_tr]:border-b">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th class="py-2 border-b">Año</th>
                    <th class="py-2 border-b">Ahorro Anual Estimado</th>
                    <th class="py-2 border-b">Ahorro Mensual</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < planAhorro; i++) {
        let anio = anioActual + i;
        resultadoHTML += `
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-center">${anio}</td>
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center">$${formatNumber(ahorroAnual.toFixed(2))}</td>
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center">$${formatNumber(ahorroMensual.toFixed(2))}</td>
            </tr>
        `;
    }

    resultadoHTML += `
            </tbody>
        </table>
        <h3 class="text-lg font-semibold mt-4">Total a Ahorrar Anualmente: $${formatNumber(ahorroAnual.toFixed(2))}</h3>
        <h3 class="text-lg font-semibold mt-2">Total a Ahorrar Mensualmente: $${formatNumber(ahorroMensual.toFixed(2))}</h3>
        <h3 class="text-lg font-semibold mt-2">Monto Final Ahorrado: $${formatNumber(costoFuturo.toFixed(2))}</h3>
    `;
    document.getElementById('resultado').innerHTML = resultadoHTML;

    // Mostrar el botón para agendar con el agente
    document.getElementById('calendarioBtn').classList.remove('hidden');

    // Hacer scroll hacia el resultado
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('calendarioBtn').addEventListener('click', function() {
    window.location.href = 'https://calendario-agente.com'; // Cambia esta URL por la de tu agente.
});

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}