let historialConversacion = [];

export async function responderIA(mensaje, esPrimerMensaje = false) {
  const apiKey = "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";

  if (esPrimerMensaje) {
    historialConversacion = [];
  }

  historialConversacion.push({ role: "user", content: mensaje });

  let messages = [
    {
      role: "system",
      content: `
Eres **InnovVentas AI**, el asistente virtual de *InnovVentas*.
- **Respuestas breves, directas, cálidas y con emojis** (máximo 2 oraciones).
- **Solo responde sobre tecnología y productos de la tienda**.
- **No saludar dos veces**: Si el usuario ya saludó, responde directamente a su pregunta.
- **Guía de compra**:
  - Si el usuario pregunta por comprar, pide: "¿Qué modelo, color y capacidad prefieres? Revisaré stock y métodos de pago."
  - Si el usuario ya dio algunos detalles (ej: "laptop x1 negro"), pide solo lo que falta (ej: "¿Qué capacidad prefieres?").
- **Corrige errores tipográficos** (ej: "negor" -> "negro").
- **Ejemplo de tono**:
  - Si el usuario pregunta "¿Qué iPhone me recomiendas?", responde: "El iPhone 15 es excelente. ¿Quieres saber sobre características, precios o stock?"
  - Si el usuario pregunta "Hola", responde: "¡Hola! ¿Qué equipo tecnológico buscas hoy?"
  - Si el usuario pregunta por algo fuera de tecnología, responde: "Solo puedo ayudarte con productos tecnológicos de InnovVentas."
`
    }
  ];

  messages = messages.concat(historialConversacion);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 80,
      temperature: 0.5
    })
  });

  const data = await response.json();
  if (data.error) {
    console.error("Error en la API de IA:", data.error);
    return "Lo siento, hubo un error al procesar tu solicitud. Intenta nuevamente.";
  }

  const respuesta = data.choices?.[0]?.message?.content || "No tengo información sobre eso. ¿Puedo ayudarte con otro producto tecnológico?";
  historialConversacion.push({ role: "assistant", content: respuesta });

  return respuesta;
}
