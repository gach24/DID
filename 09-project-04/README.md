# BACKEND

## INICIO

Comenzaremos con la generación del proyecto de backend, para hacer esto nos apoyaremos en [Nestjs](https://nestjs.com/)

### ¿Qué es NestJS?

NestJS es un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables. Está construido con TypeScript y combina elementos de la Programación Orientada a Objetos (OOP), Programación Funcional (FP) y Programación Reactiva Funcional (FRP).

#### Características principales:

- **Arquitectura modular**: Organiza el código en módulos reutilizables
- **TypeScript**: Soporta TypeScript de forma nativa
- **Decoradores**: Utiliza decoradores para definir rutas, controladores y servicios
- **Inyección de dependencias**: Sistema robusto de DI inspirado en Angular
- **Soporte para múltiples plataformas**: Express o Fastify como servidor HTTP
- **CLI potente**: Herramienta de línea de comandos para generar código automáticamente

## CREACIÓN DEL PROYECTO

Para la creación del proyecto nestjs nos apoyaremos en su [página de documentación](https://docs.nestjs.com/first-steps)

### PASOS

1. Situarnos en la carpeta *09-proyect*
2. Creación y arranque del proyecto.

```bash
# nest new project-name
nest new backend-guitars-app
cd backend-guitars-app
npm run start:dev
```

3. Copiar las guitarras
  - Copiamos la carpeta *data* del proyecto *guitars-ts-app* y la pegamos en la carpeta *src* de nuestro proyecto
  - Copiamos también el fichero de tipos *types.d.ts*

4. Modificamos el controlador y el servicio, *app.controller.ts* y *app.service.ts*

```ts
// app.service.ts
@Injectable()
export class AppService {
  getGuitars(): Guitar[] {
    return db;
  }
}
```

```ts
// app.controller.ts
@Controller()
export class AppController {
  ...
  @Get()
  getGuitars(): Guitar[] {
    return this.appService.getGuitars();
  }
}
```