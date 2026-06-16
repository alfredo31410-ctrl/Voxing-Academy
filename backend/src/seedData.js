export const courses = [
  ['english-starter-desde-cero', 'English Starter desde Cero', 'Fase 1', 'Principiantes absolutos que quieren perder el miedo.', 'Ya puedo presentarme, saludar y crear frases simples con seguridad.'],
  ['pronunciacion-y-listening-basico', 'Pronunciación y Listening Básico', 'Fase 2', 'Personas que leen algo de inglés pero no entienden cuando escuchan.', 'Ya reconozco sonidos, entiendo frases comunes y pronuncio con más confianza.'],
  ['gramatica-facil-para-hablar', 'Gramática Fácil para Hablar', 'Fase 2', 'Alumnos que quieren entender la estructura sin memorizar reglas eternas.', 'Ya puedo construir frases afirmativas, negativas y preguntas simples.'],
  ['vocabulario-de-vida-diaria', 'Vocabulario de Vida Diaria', 'Fase 3', 'Personas que quieren usar inglés en situaciones reales.', 'Ya puedo hablar de casa, trabajo, compras, comida y actividades cotidianas.'],
  ['conversacion-con-confianza', 'Conversación con Confianza', 'Fase 3', 'Alumnos que quieren dejar de traducir mentalmente y empezar a responder.', 'Ya puedo sostener conversaciones cortas con preguntas y respuestas naturales.'],
  ['english-for-work', 'English for Work', 'Fase 4', 'Profesionales, asistentes, vendedores o empleados que necesitan inglés laboral.', 'Ya puedo usar inglés en correos, juntas, mensajes y situaciones de trabajo.'],
  ['travel-english', 'Travel English', 'Fase 4', 'Personas que quieren viajar con más seguridad.', 'Ya puedo resolver situaciones de aeropuerto, hotel, restaurante y compras.'],
  ['ingles-para-ninos-y-familias', 'Inglés para Niños y Familias', 'Fase 4', 'Papás, mamás o niños que quieren aprender con actividades sencillas.', 'Ya tengo juegos, canciones, rutinas y actividades para aprender juntos.'],
  ['writing-y-correos-en-ingles', 'Writing y Correos en Inglés', 'Fase 5', 'Personas que necesitan escribir mensajes, tareas o correos claros.', 'Ya puedo redactar mensajes, correos y textos cortos con estructura y buen tono.'],
  ['preparacion-a1-a2', 'Preparación A1-A2', 'Fase 5', 'Alumnos que buscan una ruta clara hacia certificación o medición de nivel.', 'Ya entiendo los temas base de A1-A2 y puedo medir mi avance.'],
  ['english-with-ai-tools', 'English with AI Tools', 'Fase 6', 'Alumnos que quieren usar tecnología para practicar mejor.', 'Ya puedo usar IA como tutor de práctica, conversación y corrección.'],
  ['fluency-lab-proyecto-final', 'Fluency Lab: Proyecto Final', 'Fase 6', 'Alumnos que ya avanzaron y quieren integrar lo aprendido.', 'Ya puedo presentar, conversar y resolver situaciones reales con más fluidez.']
].map(([slug, title, phase, audience, transformation]) => ({
  slug,
  title,
  phase,
  audience,
  transformation,
  price: '$497 MXN',
  format: '4 a 6 horas de contenido grabado, sesión de bienvenida en vivo y sesión de dudas en Speaking Lab Voxing.'
}));
