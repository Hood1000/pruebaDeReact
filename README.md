# 🚀 Descripción del Proyecto
Este es un proyecto de evaluación técnica para desarrollador frontend que implementa un CRUD (Crear, Leer, Actualizar y Eliminar) de usuarios. La aplicación está construida con React, TypeScript, TailwindCSS y consume datos de una API simulada en MockAPI.io.

## 🛠️ Configuración e Instalación
Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

### 1. **Clonar el repositorio**
Abre tu terminal y ejecuta los siguientes comandos para clonar el proyecto desde GitHub:

### *Bash*
```git clone https://github.com/Hood1000/pruebaDeReact.git;``` 

```cd pruebaDeReact;```

### 2. **Instalación de dependencias**
Este proyecto fue creado con Vite y utiliza las siguientes tecnologías clave:

- React

- TypeScript

- TailwindCSS

- React Query (para la gestión de estados asíncronos)

- Axios (para las peticiones HTTP)

- React Icons (para los iconos de la interfaz)

Para instalar las dependencias necesarias, ejecuta el siguiente comando en la raíz del proyecto:

### *Bash*

`npm install`

### 3. **Configuración del Entorno Local**
Este proyecto consume una API de usuarios simulada en MockAPI.io. Para que la aplicación funcione, necesitas actualizar la URL de la API base en el código.

- Crea tu recurso en MockAPI.io:

  - Visita MockAPI.io y crea una cuenta.

  - Crea un nuevo proyecto con un recurso llamado `users` y asegúrate de que tenga los campos `fullName`, `email` y `status`.

- Actualiza la URL en el código:

  - Copia la URL base de tu API que te proporciona MockAPI.io.

  - Abre el archivo `src/services/http-client.ts` en tu proyecto.

  - Reemplaza el valor de la constante `API_BASE_URL` con tu URL personal.

*TypeScript*
```
// src/services/http-client.ts

const API_BASE_URL = 'https://68afa6eeb91dfcdd62bcc2c2.mockapi.io/api/v1/'; 

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default httpClient;                                     
```


### 4. **Ejecución en modo desarrollo**
Una vez que las dependencias estén instaladas y el archivo `http-client.ts` esté configurado, puedes ejecutar la aplicación en modo desarrollo con el siguiente comando:

*Bash*
```
npm run dev
```
La aplicación se abrirá automáticamente en tu navegador en http://localhost:5173/.