# Ejercicios: `fetch` + Promesas + `async/await` + métodos de arrays

## 1) Filtra y transforma posts

**Enunciado:** Descarga los posts y quédate solo con los de
`userId = 1`. Devuelve un array de títulos en mayúsculas.

``` js
async function getUppercaseTitlesByUser(userId = 1) {
  // 1) fetch posts
  // 2) json
  // 3) filter por userId
  // 4) map a títulos en mayúsculas
}
```

------------------------------------------------------------------------

## 2) Suma de precios (reduce)

**Enunciado:** Descarga los productos de Fake Store API y calcula el
**precio total** de los productos con `category = 'electronics'`.

``` js
async function totalElectronics() {
  // GET https://fakestoreapi.com/products
  // filter por category === 'electronics'
  // reduce sumando price
}
```

------------------------------------------------------------------------

## 3) Combinación con `Promise.all`

**Enunciado:** Descarga **usuarios** y **posts** en paralelo. Devuelve
una lista de objetos `{ userName, postsCount }`, ordenada
descendentemente por `postsCount`.

``` js
async function usersWithPostCount() {
  // Promise.all([fetch users, fetch posts])
  // Para cada usuario, cuenta cuántos posts tiene
  // Devuelve [{ userName, postsCount }] ordenado por postsCount desc
}
```

## 4) Pipeline: buscar, filtrar, normalizar, ordenar

**Enunciado:** De JSONPlaceholder, toma **comments**, filtra los que
contengan la palabra `'qui'` en `body`, normaliza `email` a minúsculas,
y ordénalos por `postId` asc y después por `email` asc.

``` js
async function cleanComments() {
  // GET /comments
  // filter body includes 'qui' (case-insensitive)
  // map: email a minúsculas
  // sort por postId, luego email
}
```
