# Mi Aplicación Expo 📱

Esta es una aplicación móvil desarrollada con [Expo](https://expo.dev), creada utilizando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)

## ✨ Características

- Sistema de autenticación completo
- Gestión de perfil de usuario
- Información personal configurable
- Opciones de seguridad y login
- Sección legal (Términos y condiciones, Políticas de privacidad)
- Navegación mediante pestañas y stack
- Interfaz de usuario intuitiva

## 🔧 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI
- iOS Simulator o Android Emulator (opcional)

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL-del-repositorio]
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npx expo start
   ```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── (stack)/
│   │   ├── login/
│   │   └── profile/
│   ├── (tabs)/
│   └── _layout.tsx
├── components/
│   └── profile/
├── store/
│   └── authStore.ts
└── ...
```

## 💻 Uso

La aplicación se puede ejecutar en:
- Simulador iOS
- Emulador Android
- Dispositivo físico usando [Expo Go](https://expo.dev/go)
- Navegador web (modo desarrollo)

Para iniciar en cada plataforma:
- iOS: Presiona `i` en la terminal
- Android: Presiona `a` en la terminal
- Web: Presiona `w` en la terminal

## 🗺️ Rutas de la Aplicación

- `/login`: Pantalla de inicio de sesión
- `/profile`: Perfil principal del usuario
  - `/profile/personalInfo`: Información personal
  - `/profile/securityLogin`: Configuración de seguridad
  - `/profile/legal/terms`: Términos y condiciones
  - `/profile/legal/privacy`: Políticas de privacidad

## 🛠️ Tecnologías Utilizadas

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Expo Router](https://docs.expo.dev/router/introduction)

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios
4. Commit a tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE)

## 🤝 Soporte

Si tienes alguna pregunta o problema:
- Revisa la [documentación de Expo](https://docs.expo.dev)
- Únete a la [comunidad de Discord](https://chat.expo.dev)
- Abre un issue en el repositorio

---

Desarrollado con ❤️ usando Expo
