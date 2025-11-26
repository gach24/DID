# CONTEXT

Hasta ahora nuestro frontesta dividido en diferentes componentes a los que pasamos datos y funciones mediante sus props
El objetivo de este proyecto es la modificación de esto para simplifica nuestra aplicacion mediante el uso de useContext

## useContext

El uso de useContext evita pasar props por múltiples niveles. En lugar de pasar cart y funciones desde App → Header → CartItem, defines un Context y cualquier componente hijo puede acceder a esos valores directamente.