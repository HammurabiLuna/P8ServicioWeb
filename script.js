document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "0585ea1eaadbd254a10e013d4ae6bcfc";
    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`;
    const datalist = document.getElementById("currencies");
    const form = document.getElementById("currency-form");
    const resultDisplay = document.getElementById("result");

    // Función para llenar las opciones de divisas en el datalist
    async function loadCurrencies() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                datalist.appendChild(option);
            });
        } catch (error) {
            console.error("Error al cargar las divisas:", error);
            resultDisplay.textContent = "Error al cargar las divisas. Inténtalo de nuevo.";
        }
    }

    // Función para manejar la conversión de divisas
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const base = document.getElementById("base").value.toUpperCase();
        const target = document.getElementById("target").value.toUpperCase();
        const amount = parseFloat(document.getElementById("amount").value);

        if (isNaN(amount) || amount <= 0) {
            resultDisplay.textContent = "Por favor, ingresa una cantidad válida.";
            return;
        }

        try {
            const response = await fetch(`${url}&base=${base}`);
            const data = await response.json();
            const rate = data.rates[target];

            if (rate) {
                const result = rate * amount;
                resultDisplay.textContent = `Resultado: ${result.toFixed(4)} ${target}`;
            } else {
                resultDisplay.textContent = "La divisa objetivo no está disponible.";
            }
        } catch (error) {
            console.error("Error al convertir la divisa:", error);
            resultDisplay.textContent = "Error al convertir la divisa. Inténtalo de nuevo.";
        }
    });

    // Llamar a la función para cargar las divisas cuando cargue la página
    loadCurrencies();
});
