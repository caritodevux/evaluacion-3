# 1. Descripción del Proyecto
Aplicación SPA (Single Page Application) desarrollada en React para la gestión de cursos. Permite consumir datos simulados desde una API externa (JSONPlaceholder), buscar cursos, marcar favoritos con persistencia en LocalStorage y aplicar buenas prácticas de seguridad.

# 2. Explicación de los Componentes
- Header: Encabezado principal de la aplicación.
- SearchBar: Barra de búsqueda que permite filtrar los cursos ingresando texto, gestionando el estado en el componente principal.
- CourseList: Componente contenedor que itera sobre los cursos y los muestra dinámicamente.
- CourseCard: Tarjeta individual para cada curso que muestra la información y el botón para agregar/quitar de favoritos.

# 3. Desarrollo de los Desafíos
Se implementaron los desafíos propuestos en la guía para asegurar la funcionalidad y mejorar la aplicación:
- **Desafío 1 (Filtro por docente)**: Se integró un selector (select) que permite filtrar los cursos visualizados según el teacherId.
- **Desafío 2 (Contador de favoritos)**: Se agregó un contador dinámico que muestra la cantidad de cursos favoritos asociados a cada docente.
- **Desafío 3 (Modo oscuro)**: Se implementó un cambio de tema visual (claro/oscuro), guardando la preferencia del usuario en el LocalStorage para mantenerla tras recargar la página.
- **Nota técnica**: El Desafío 4 (Crear una versión alternativa usando Fetch) fue omitido intencionalmente siguiendo la instrucción directa del profesor en clases, quien indicó que realizar lo mismo que ya hace Axios ensuciaría el proyecto sin sumar valor.
<img width="1684" height="973" alt="App8" src="https://github.com/user-attachments/assets/3cca982d-7390-4fd2-8f6d-148c9c76f31c" />


# 4. Evidencias de Funcionamiento
- Uso de API y App funcionando:
<img width="1728" height="985" alt="App9" src="https://github.com/user-attachments/assets/ae036bb7-dd51-409b-8b93-dc0c9fc41b82" />
- Persistencia de datos:
<img width="1684" height="973" alt="App8" src="https://github.com/user-attachments/assets/3cca982d-7390-4fd2-8f6d-148c9c76f31c" />


# 5. Análisis de Calidad y Seguridad con SonarQube
Se realizó el análisis de código mediante SonarQube en un entorno local:
<img width="1709" height="987" alt="App5" src="https://github.com/user-attachments/assets/fb206378-228c-4d63-a8b6-759ee3c7e214" />
<img width="1220" height="966" alt="App10" src="https://github.com/user-attachments/assets/9aa9f812-2b9e-42de-a9c1-9321eeeeaf5e" />


# 6. Reflexión sobre el uso responsable de la IA
Durante el desarrollo de esta SPA, se utilizó Inteligencia Artificial (ChatGPT / GitHub Copilot) como herramienta de apoyo técnico bajo los siguientes contextos:
- **Aplicación de Estilos con Bootstrap**: Se le solicitó a la IA generar y adaptar las clases de Bootstrap a los componentes de React para lograr un diseño responsivo y moderno, asegurando que la interfaz se ajustara correctamente sin entorpecer la lógica de renderizado de React.
- **Configuración Local de SonarQube**: Debido a la complejidad de levantar el entorno, se le pidió ayuda a la IA para configurar correctamente los archivos docker-compose.yml y sonar-project.properties, además de guiar en la ejecución de los comandos de análisis (npx @sonar/scan) para que la comunicación con el servidor local en el puerto 9000 fuera exitosa.
- **Optimización del Coverage en SonarQube**: Tras el primer análisis de código, se le solicitó a GitHub Copilot asistencia para generar y mejorar los casos de prueba unitarios (tests). Gracias a sus sugerencias, se logró alcanzar un 89.0% de cobertura de código (Coverage), asegurando que las funciones principales estuvieran correctamente probadas sin alterar la lógica de la aplicación.
- **Conclusión**: La IA sirvió para agilizar tareas repetitivas (como el CSS) y de infraestructura (Docker), pero toda la lógica de validación, manejo del estado (useState, useEffect) y limpieza del código se verificó manualmente para cumplir con las buenas prácticas de seguridad (evitando dangerouslySetInnerHTML)
