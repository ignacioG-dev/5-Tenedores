
# Sistema de Restaurante 

5-Tenedores es una aplicación móvil que permite a los usuarios agregar restaurantes y recibir calificaciones de otros usuarios.




## Tecnologias Utilizadas

`React Native`: Para el desarrollo de la aplicación móvil en Android.


> [!WARNING]\
> **5-Tenedores** es una aplicación diseñada exclusivamente para dispositivos Android y no es compatible con iOS. Debido a las diferencias en las tecnologías utilizadas, la aplicación solo está disponible en la plataforma Android.

`FireBase`: Para la autenticación de usuarios, almacenamiento de datos y notificaciones en tiempo real.
## Despliegue

To deploy this project run

```bash
  npm run deploy
```

Para desplegar la aplicación en 5-Tenedores, se deben seguir los siguientes pasos:

1. **Configurar Firebase**

Para configurar Firebase, se debe crear un proyecto en la consola de Firebase. Una vez creado el proyecto, se deben habilitar los siguientes servicios:

 `FireStore` + `Authentication` +  `Hosting`

2. **Generar los archivos de configuración de Firebase**

Para generar los archivos de configuración de Firebase, debes seguir los siguientes procedimientos:

- En la consola de Firebase, ve a la pestaña Servicios.
- Haz clic en el botón + Añadir servicio.
- Selecciona Firebase App Distribution.
- Sigue las instrucciones en pantalla.
  
 Una vez generado el archivo, cópialo en la carpeta `android/app/src/main/` del proyecto.

3. **Crear una build de producción**

Para crear una build de producción, debes ejecutar el siguiente comando:

npx react-native build-app --profile --configuration production
Este comando creará una carpeta build en la raíz del proyecto.

4. **Crear una build de producción**

Para crear una build de producción, se debe ejecutar el siguiente comando:

```bash
npx react-native build-app --profile --configuration production
```

Este comando creará una carpeta `build` en la raíz del proyecto.

5. **Publicar la aplicación en Firebase Hosting**

Para publicar la aplicación en Firebase Hosting, se debe ejecutar el siguiente comando:

```
firebase deploy
```

Este comando publicará la aplicación en la dirección `https://5-Tenedores.firebaseapp.com`.

6. **Configurar la autenticación**

Para configurar la autenticación, se debe crear un usuario en la consola de Firebase. Una vez creado el usuario, se debe actualizar el archivo `App.js` para que utilice la autenticación de Firebase.

```javascript
import React, { useState, useEffect } from "react";
import { FirebaseAuth, firebase } from "firebase";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (user) {
    return <h1>Bienvenido, {user.displayName}</h1>;
  } else {
    return <button onClick={() => auth.signInAnonymously()}>Iniciar sesión</button>;
  }
};

export default App;
```

7. **Probar la aplicación**

Para probar la aplicación, se debe abrir el navegador en la dirección `https://5-Tenedores.firebaseapp.com`.

**Notas:**


> [!NOTE]\
> Para obtener más información sobre cómo desplegar una aplicación de React Native en Firebase, se puede consultar la documentación oficial: https://firebase.google.com/docs/hosting/quickstart.

> [!NOTE]\
> Para obtener más información sobre cómo configurar la autenticación de Firebase, se puede consultar la documentación oficial: https://firebase.google.com/docs/auth/web/start.

## Contribución

¡Agradecemos las contribuciones! Si deseas contribuir al proyecto, sigue estos pasos:

- Haz un fork del repositorio.

- Clona el repositorio forked en tu entorno de desarrollo local.

- Crea una nueva rama para tu contribución.

- Realiza tus cambios y asegúrate de que las pruebas pasen.

- Envia una solicitud de extracción (Pull Request) a la rama principal.

## Autor

- [@ignacioG-dev](https://github.com/ignacioG-dev)

