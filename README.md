# Organizer

La mejor aplicación para organizarte.

## Características

- Autenticación basada en JWT.
- Implementación de Refresh Token para una mejor experiencia de usuario.
- Encriptado de datos sensibles, garantizando la seguridad.
- Implementación de Guards, garantizando la seguridad y una mejor experiencia de usuario.
- Creación de carpetas y notas/tares personalizables.
- Edición y validaciones de datos de usuario.
- Diseño responsive.
- Futuras actualizaciones.

## Requerimientos

Para la base de datos, se necesita tener MySQL instalado.

Para el backend, se necesita tener instalado una versión de JDK igual o mayor que 21 y Spring Tools.

Para el frontend, se necesita tener Angular 17 y una versión de Node mayor que 18.

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

Configurar el usuario y contraseña de tu local MySQL en el archivo application.properties.

```code
spring.datasource.url=jdbc:mysql://localhost:3306/db_organizer
spring.datasource.username=root
spring.datasource.password=admin
```
> [!IMPORTANT]  
> Si ha cambiado el nombre de la base de datos, asegúrate de actualizarlo también en el archivo application.properties: (spring.datasource.url=jdbc:mysql://localhost:3306/database_name).


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
> Si ejecutas el servidor del frontend en un puerto distinto, deberás cambiar la configuración de CORS en el archivo SecurityConfig.java. Si ejecutas el servidor del backend en un puerto distinto, deberás cambiar la API_URL en el archivo environments.ts.

## Author

- [@diegoinost02](https://github.com/diegoinost02)
