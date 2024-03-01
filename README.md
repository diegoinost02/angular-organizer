# Organizer

La mejor aplicación para organizarte.

Landing demo: https://organizer-eta.vercel.app/

## Características

- Autenticación basada en JWT.
- Implementación de Refresh Token.
- Encriptado de datos sensibles, garantizando la seguridad.
- Implementación de Guards, garantizando la seguridad y una mejor experiencia de usuario.
- Signals para la reactividad.
- Edición y validaciones de datos de usuario.
- Creación de carpetas y notas/tareas personalizables.
- Diseño responsive.
- Futuras actualizaciones.

## Requerimientos

Para la base de datos, se necesita tener MySQL instalado.

Para el backend, es necesario tener instalado una versión de JDK mayor o igual que 21 y Spring Tools.

Para el frontend, es necesario tener Angular 17 y una versión de Node mayor que 18.

## ¿Cómo usar?

1. Crea una base de datos MySQL con el siguiente script:

- https://github.com/diegoinost02/database-organizer/blob/main/organizer-database.sql


2. Clona los repositorios de manera local:

```bash
git clone https://github.com/diegoinost02/springboot-organizer.git
```

```bash
git clone https://github.com/diegoinost02/angular-organizer.git
```

## Configuracion Backend

Se debe onfigurar el usuario y contraseña de tu MySQL local en el archivo application.properties.

```code
spring.datasource.url=jdbc:mysql://localhost:3306/db_organizer
spring.datasource.username=root
spring.datasource.password=admin
```
> [!IMPORTANT]  
> Si ha cambiado el nombre de la base de datos, asegúrese de actualizarlo también en el archivo application.properties: (spring.datasource.url=jdbc:mysql://localhost:3306/database_name).


## Ejecución

#### Backend
Ejecutar la app en el puerto 8080 (Puerto por defecto de Spring).

#### Frontend
Instalar las dependencias y ejecutar la app en el puerto 4200 (Puerto por defecto de Angular).

```bash
  npm install
```
```bash
  npm run start
```

> [!IMPORTANT]  
> Si se ejecuta el servidor del frontend en un puerto distinto, se debe cambiar la configuración de CORS en el archivo SecurityConfig.java. Si ejecutas el servidor del backend en un puerto distinto, se debe cambiar la API_URL en el archivo environments.ts.

## Author

- [@diegoinost02](https://github.com/diegoinost02)
