# IMPORTANTE : LA DCUMENTACION DE LA API SE ENCUENTRA EN:
- **api.http**:  Recomiendo esta ya que se peude impementar todos los metodos directamente con la extencion de : REST Client v0.25.1 Huachao Mao
- **swagger.yaml**


# 1. Para correr la aplicacion:

```bash
npm start
```


# 2. Para correr los test:

```bash
npm test
```


# Configuración de entorno para una aplicación Node.js

En esta aplicación Node.js, se utilizan variables de entorno para configurar aspectos como el puerto del servidor y la conexión a la base de datos MongoDB. Esto proporciona flexibilidad y seguridad al separar la configuración sensible del código fuente.

## Variables de entorno utilizadas:

- **PORT**: Define el puerto en el que el servidor escuchará las solicitudes HTTP. Por defecto, se establece en 4500 en entorno de producción.
- **MONGODB_USERNAME**: Nombre de usuario para la autenticación en la base de datos MongoDB.
- **MONGODB_PASSWORD**: Contraseña para la autenticación en la base de datos MongoDB.
- **MONGODB_CLUSTER**: Nombre del clúster de MongoDB al que se conectará la aplicación.
- **MONGODB_DBNAME**: Nombre de la base de datos MongoDB que la aplicación utilizará.
- **MONGODB_HOST**: Host de MongoDB al que se conectará la aplicación.

Estas variables de entorno se configuran en un archivo `.env` en el directorio raíz del proyecto. Cada vez que la aplicación se inicia, estas variables se cargan desde el archivo `.env` y están disponibles para su uso en el código.

## Entornos de desarrollo

### Desarrollo:

En el entorno de desarrollo, se utiliza una configuración diferente para el servidor y la base de datos MongoDB:

- **Puerto del servidor**: 3500
- **Dominio del servidor**: localhost:3500
- **Puerto de MongoDB**: 27017
- **Host de MongoDB**: localhost

Esta configuración se utiliza para facilitar el desarrollo local y la depuración de la aplicación.

```javascript
const config = {
    server: {
      port: 3500,
      domain: 'localhost:3500',
    },
    mongodb: {
      port: 27017,
      host: 'localhost'
    },
    email: {}, // Configuración del servidor de correo electrónico
    logger: 'dev' // Configuración del registro de eventos
};

export default config;
```
