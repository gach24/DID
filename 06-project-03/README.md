# TESTING

Las pruebas automáticas no son una perdida de tiempo, garantizan la calidad, detectan errores, facilitan el mantenimiento, aceleran desarrollo con integraciones continuas y despliegues seguros

## Tipos de pruebas

- Unitarias. Enfocadas en partes atómicas
- Integración. ¿Como reaccionan varias pruebas en conjunto?
- E2E - End to End. Ejecuta todo un flujo contínuo como si fuera el proceso que realiza un usuario

Principalmente debemos de enfocarnos en las pruebas unitarias, empezando por las piezas más pequeñas y desacopladas

## Características de las pruebas

- Fáciles de escribir
- Fáciles de leer
- Rápidas
- Flexibles

## Como organizar nuestras pruebas

Cada prueba se debe de organizar mediante lo que se conoce como triple "A"

- Arrange. Se hacen las importaciones necesarias y hacemos las inicializaciones
- Act. Aplicar estímulos, llamar a métodos y/o simular clicks
- Assert. Que debe haber sucedido

## Mitos

- Hacen que mi aplicación no tenga errores
- Las pruebas no pueden fallar
- Hacen más lenta mi aplicación
- Son una pérdida de tiempo
- Hay que probar todo

## Covertura
Tipos:
- Covertura de líneas. Porcentaje de líneas ejecutadas
- Covertura de ramas. Porcentaje de ramas de decisión probadas
- Covertura de funciones. Porcentaje de funciones/metodos invocados
- Covertura de condiciones. Porcentaje de condiciones evaluadas en ambos sentidos

# Pruebas sobre proyectos

Comenzaremos las pruebas creando un proyecto nuevo dentro de esta misma carpeta

```sh
npm create vite@latest counter-app
```

Después realizaremos pruebas sobre el proyecto guitars-ts-app para lo cual haremos un copia dentro de esta misma carpeta
