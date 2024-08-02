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
    const planAhorro = edad <=3 ? 15 : 10;

    // Calcular el primer ahorro siguiendo la nueva fórmula
    const multiplicadorPlan = planAhorro === 15 ? 0.65 : 0.68;
    const multiplicadorSegundoPlan = planAhorro === 10 ? 0.7 : 0.6;
    const primerAhorro = ((costoFuturo * multiplicadorPlan) / planAhorro) * multiplicadorSegundoPlan;
    console.log("Primer Ahorro Calculado:", primerAhorro.toFixed(3));

    // Calcular ahorro anual y mensual
    const ahorroAnual = primerAhorro;
    const ahorroMensual = ahorroAnual / 12;
    console.log("Ahorro Anual Calculado:", ahorroAnual.toFixed(3));
    console.log("Ahorro Mensual Calculado:", ahorroMensual.toFixed(3));

    let resultadoHTML = `<div class="container mx-auto px-8 py-8 md:px-6 lg:py-16">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
    <div class="flex flex-col items-start gap-4 rounded-lg border border-input bg-background p-6 shadow-sm transition-colors hover:border-primary">
      <div class="bg-neutral-100 rounded-md p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-primary"
        >
          <path d="M14 22v-4a2 2 0 1 0-4 0v4"></path>
          <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"></path>
          <path d="M18 5v17"></path>
          <path d="m4 6 8-4 8 4"></path>
          <path d="M6 5v17"></path>
          <circle cx="12" cy="9" r="2"></circle>
        </svg>
      </div>
      <h3 class="text-xl font-medium">El Costo de la Universidad sera de $${formatNumber(costoFuturo.toFixed(0))} </h3>
    </div>
    <div class="flex flex-col items-start gap-4 rounded-lg border border-input bg-background p-6 shadow-sm transition-colors hover:border-primary">
      <div class="bg-neutral-100 rounded-md p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-primary"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-medium">Te recomendamos un plan de ahorro de ${planAhorro} años</h3>
    </div>
    <div class="flex flex-col items-start gap-4 rounded-lg border border-input bg-background p-6 shadow-sm transition-colors hover:border-primary">
      <div class="bg-neutral-100 rounded-md p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-primary"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
      </div>
      <h3 class="text-xl font-medium">El primer año de tu plan debes ahorrar: $${formatNumber(primerAhorro.toFixed(0))}</h3>
    </div>
    <div class="flex flex-col items-center justify-center gap-4 rounded-lg border border-input bg-sky-600 p-6 shadow-sm transition-colors hover:border-primary">
          <a href="https://calendar.app.google/WrTffmPBvj5SfMbUA" class="text-center">
            <h3 class="text-xl font-medium text-white ">Da click para agendar con un asesor</h3>
          </a>
        </div>
  </div>
</div>`;

    document.getElementById('resultado').innerHTML = resultadoHTML;
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });


    // Mostrar el botón para agendar con el agente
    document.getElementById('calendarioBtn').classList.remove('hidden');

    // Hacer scroll hacia el resultado
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('calendarioBtn').addEventListener('click', function() {
    window.location.href = 'https://calendar.app.google/WrTffmPBvj5SfMbUA'; // Cambia esta URL por la de tu agente.
});


function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}