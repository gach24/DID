# BACKEND


## INICIO

Comenzaremos con la generación del proyecto de backend, para hacer esto nos apoyaremos en [Nestjs](https://nestjs.com/)

## ¿Qué es NestJS?

NestJS es un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables. Está construido con TypeScript y combina elementos de la Programación Orientada a Objetos (OOP), Programación Funcional (FP) y Programación Reactiva Funcional (FRP).

## Características principales:

- **Arquitectura modular**: Organiza el código en módulos reutilizables
- **TypeScript**: Soporta TypeScript de forma nativa
- **Decoradores**: Utiliza decoradores para definir rutas, controladores y servicios
- **Inyección de dependencias**: Sistema robusto de DI inspirado en Angular
- **Soporte para múltiples plataformas**: Express o Fastify como servidor HTTP
- **CLI potente**: Herramienta de línea de comandos para generar código automáticamente

## CREACIÓN DEL PROYECTO DE BACKEND

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

5. Comprobamos en *postman* la petición **GET** contra la url *http://localhost:3000*

6. Habilitamos los cors para permitir peticiones desde otra aplicación. Dentro del fichero `main.ts` añadimos la siguiente línea

```ts
...
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitación de cors
  await app.listen(process.env.PORT ?? 3000);
}
...
```

## PERSISTENCIA

Pasos:
### CREACIÓN DEL RESOURCE
Aunque no sea directamente relacionado con la persistencia vamos a añadir un recurso a nuestro proyecto nestjs.
Para ello abrimos una terminal dentro del proyecto y ejecutamos el siguiente comando

```bash
nest g res Guitars --no-spec
# What transport layer do you use? REST API
# 
Would you like to generate CRUD entry points? Y
```

Este paso genera:
- Un controlador **guitar.controller.ts** para gestionar las peticiones http
- Un servicio **guitar.service.ts** para realizar las operaciones de negocio y/o persistencia
- Un entidad **guitar.entity.ts** encargado de representar el registro, documento, u otro medio de almacenaje
- Objetos Data Transfer Object para la transmisión de datos


## 2. CONFIGURACIÓN DE LA PERSISTENCIA. MONGO

Para utilizar mongo no vamos a instalar mongo directamente sino que lo haremos a través de docker

- Creamos el fichero *compose.yml*

```yml
services:
  db:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_DATABASE: ${MONGO_DB_NAME}
    volumes:
      - ./mongo:/data/db

volumes:
  mongo-data:
```

- Añadimos el fichero .env con las variables de entorno

```env
MONGO_DB_NAME=guitarsdb
```

- Creamos el contendedor de mongo

```bash
docker compose up -d
```

- Instalación de [mongo compass](https://www.mongodb.com/try/download/compass) y comprobamos la conexión

## 3. CONFIGURACIÓN DE MONGOOSE EN EL PROYECTO

- Instalamos las dependencias

```bash
npm i @nestjs/mongoose mongoose
```

- Configuración en el módulo principal **app.module.ts**

```ts 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/guitarsdb')],
})
export class AppModule {}

```
- Modificamos la entity

```ts
// guitar.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuitarDocument = HydratedDocument<Guitar>;

@Schema()

export class Guitar {
  @Prop({
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  name: string;

  @Prop({ required: true, minlength: 3, maxlength: 120 })
  image: string;

  @Prop({ default: 'N/D' })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const GuitarSchema = SchemaFactory.createForClass(Guitar);
```

- Modificación del módulo de guitarras

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GuitarsController } from './guitars.controller';
import { GuitarsService } from './guitars.service';
import { Guitar, GuitarSchema } from './entities/guitar.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guitar.name, schema: GuitarSchema }]),
  ],
  controllers: [GuitarsController],
  providers: [GuitarsService],
})
export class GuitarsModule {}
```

- Comprobamos en mongo compass que aparece la base de datos y dentro de la base de datos la colección

## 4. ANADIR LAS GUITARRAS

- Vamos a modificar el **create-guitar.dto**, ya que esta clase representa la información que se nos envía desde el frontend para la creación de una guitarra y que no tiene porque ser igual a la de la entidad

```ts
// create-guitar.dto.ts
export class CreateGuitarDto {
  name: string;
  image: string;
  description: string;
  price: number;
}
```

- Devolver todas las guitarras

```ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Guitar } from './entities/guitar.entity';

@Injectable()
export class GuitarsService {
  constructor(@InjectModel(Guitar.name) private guitarModel: Model<Guitar>) {}

  findAll() { return this.guitarModel.find(); }
}
```

```ts
// guitars.controller.ts
import { Controller, Get } from '@nestjs/common';
import { GuitarsService } from './guitars.service';

@Controller('guitars')
export class GuitarsController {
  @Get()
  findAll() { return this.guitarsService.findAll(); }
}
```



- Instalación de las dependencias de validación

```bash
npm i class-validator class-transformer
```
