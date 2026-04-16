# Button Component

## Descripción

Componente atómico de botón que soporta múltiples variantes visuales, renderizado como botón nativo o como enlace (`<a>`), y configuración de internacionalización automática para rutas con locale.

---

## Importación

```tsx
import { Button } from '@/src/components/atoms/button';
```

---

## Props

### Props Base

| Prop        | Tipo            | Requerido | Default     | Descripción                               |
| ----------- | --------------- | --------- | ----------- | ----------------------------------------- |
| `children`  | `ReactNode`     | ✅        | -           | Contenido del botón (texto, iconos, etc.) |
| `variant`   | `ButtonVariant` | ❌        | `'primary'` | Variante visual del botón                 |
| `className` | `string`        | ❌        | -           | Clases CSS adicionales (Tailwind)         |

### Props de Enlace

| Prop        | Tipo      | Requerido | Default | Descripción                                     |
| ----------- | --------- | --------- | ------- | ----------------------------------------------- |
| `href`      | `string`  | ❌        | -       | URL. Si se proporciona, renderiza como `<Link>` |
| `showArrow` | `boolean` | ❌        | `true`  | Muestra flecha `→` (solo en variante `link`)    |

### Props de `<button>`

| Prop       | Tipo                              | Requerido | Default    | Descripción              |
| ---------- | --------------------------------- | --------- | ---------- | ------------------------ |
| `type`     | `'button' \| 'submit' \| 'reset'` | ❌        | `'button'` | Tipo de botón HTML       |
| `onClick`  | `React.MouseEventHandler`         | ❌        | -          | Handler del evento click |
| `disabled` | `boolean`                         | ❌        | -          | Deshabilita el botón     |
| `disabled` | `boolean`                         | ❌        | -          | Deshabilita el botón     |

### Props heredadas

El componente extiende `React.ButtonHTMLAttributes<HTMLButtonElement>`, por lo que acepta cualquier prop estándar de un `<button>` HTML como: `aria-label`, `id`, `name`, `value`, `form`, `autofocus`, etc.

---

## Variantes

### `primary` (default)

Botón sólido con fondo oscuro. Ideal para CTAs principales.

```tsx
<Button>Click me</Button>
<Button variant="primary">Primary Action</Button>
```

**Apariencia:**

- Fondo: `bg-pg0` (color principal de página)
- Texto: `text-tx` (color de texto)
- Hover: fondo al 90% de opacidad
- Padding: `px-10 py-4`
- Alineación: centrado

---

### `secondary`

Botón con borde outline. Para acciones secundarias.

```tsx
<Button variant="secondary">Learn more</Button>
```

**Apariencia:**

- Borde: `1px solid border-pg0/30`
- Texto: `text-pg0`
- Hover: fondo `pg0/10`
- Padding: `px-10 py-4`
- Alineación: centrado

---

### `link`

Botón estilo enlace con flecha. Para navegación dentro del contenido.

```tsx
<Button variant="link">Read more</Button>
<Button variant="link" showArrow={false}>Sin flecha</Button>
```

**Apariencia:**

- Borde inferior: `border-b border-tx/20`
- Texto: color de texto
- Hover: aumenta el gap entre texto y flecha
- Incluye flecha `FaArrowRightLong` (14px)

---

### `dark`

Botón invertido (fondo claro, texto oscuro). Para contraste.

```tsx
<Button variant="dark">Dark Button</Button>
```

**Apariencia:**

- Fondo: `bg-tx` (color de texto)
- Texto: `text-pg0` (color de página)
- Hover: fondo al 90% de opacidad
- Padding: `px-10 py-4`
- Alineación: centrado

---

## Formas de Uso

### 1. Botón Simple (sin href)

```tsx
// Default (primary)
<Button>Submit</Button>

// Con variant
<Button variant="secondary">Cancel</Button>

// Con onClick
<Button onClick={() => console.log('clicked')}>Click me</Button>

// Deshabilitado
<Button disabled>Disabled</Button>

// Con tipo submit
<Button type="submit">Enviar formulario</Button>

// Con clases adicionales
<Button className="w-full mt-4">Full width</Button>

// Con aria-label (accesibilidad)
<Button aria-label="Cerrar modal">✕</Button>
```

---

### 2. Botón como Enlace Interno (href)

```tsx
// Ruta simple (automáticamente prepende /)
<Button href="about">About us</Button>     // → /about
<Button href="contact">Contact</Button>   // → /contact

// Ruta absoluta
<Button href="/products">Ver productos</Button>  // → /products

// Con locale ya incluido
<Button href="/en/about">About (EN)</Button>    // → /en/about
<Button href="/es/contacto">Contacto (ES)</Button>  // → /es/contacto
```

> **Nota:** El componente automáticamente prepende `/` si la ruta no empieza con `/`, no es externa, no es un anchor, y no tiene locale.

---

### 3. Botón como Enlace Externo

```tsx
// Con http
<Button href="https://google.com">Google</Button>

// Con www
<Button href="www.github.com">GitHub</Button>
```

> **Nota:** Los enlaces externos se renderizan tal cual sin modificación del path.

---

### 4. Botón como Ancla (Anchor)

```tsx
<Button href="#features">Jump to features</Button>
<Button href="#contact-form">Go to form</Button>
```

---

### 5. Botón Link con Flecha

```tsx
<Button variant="link">Continue reading</Button>

// Sin flecha
<Button variant="link" showArrow={false}>No arrow</Button>
```

---

### 6. Botón con Contenido Compuesto

```tsx
// Con icono
<Button>
  <Icon name="download" />
  Download
</Button>

// Con múltiples elementos
<Button>
  <span>Precio</span>
  <strong>$99</strong>
</Button>

// Combinación con variante link
<Button variant="link" showArrow>
  Ver todos los productos
  <ChevronRight size={14} />
</Button>
```

---

### 7. Formularios

```tsx
// Submit button
<form onSubmit={handleSubmit}>
  <Button type="submit">Enviar</Button>
</form>

// Reset button
<Button type="reset">Limpiar</Button>

// Con name y value
<Button type="submit" name="action" value="save">
  Guardar
</Button>
<Button type="submit" name="action" value="delete">
  Eliminar
</Button>
```

---

### 8. Combinación de Props

```tsx
// Botón deshabilitado con onClick (no se ejecuta)
<Button disabled onClick={() => handleSomething()}>
  Disabled with handler
</Button>

// Enlace con clases personalizadas
<Button href="/page" className="mt-8 hover:scale-105">
  Enlace estilizado
</Button>

// Variante link sin flecha pero con href
<Button variant="link" href="/page" showArrow={false}>
  Simple link style
</Button>

// Variante link con href (renderiza como Link, no como button)
<Button variant="link" href="/blog">
  Read article
</Button>
```

---

## Comportamiento de Href

### Lógica de Detección

```tsx
const isExternal = href.startsWith('http') || href.startsWith('www');
const isAnchor = href.startsWith('#');
const isLocalePath = routing.locales.some(
  (l: string) => href === `/${l}` || href.startsWith(`/${l}/`)
);
```

### Transformaciones de Href

| Tipo       | Ejemplo input   | Ejemplo output                |
| ---------- | --------------- | ----------------------------- |
| Simple     | `'about'`       | `'/about'`                    |
| Con slash  | `'/contact'`    | `'/contact'` (sin cambios)    |
| Con locale | `'/en/about'`   | `'/en/about'` (sin cambios)   |
| Externo    | `'https://...'` | `'https://...'` (sin cambios) |
| Ancla      | `'#section'`    | `'#section'` (sin cambios)    |

---

## Estilos Base

Todos los botones incluyen:

```css
inline-flex           /* Display inline-flex */
items-center          /* Centrar verticalmente */
gap-2                 /* Espacio entre elementos hijos */
text-xs              /* Tamaño de fuente pequeño */
font-medium          /* Peso de fuente medio */
tracking-[0.2em]     /* Espaciado entre letras expandido */
uppercase            /* Texto en mayúsculas */
transition-colors    /* Transición suave de colores */
```

---

## Accesibilidad

### Prácticas Incluidas

- Soporte para `disabled` attribute
- Compatible con `aria-label`
- Renderizado semántico (`<button>` o `<a>` según props)
- Tipo de botón explícito (`type` prop)

### Recomendaciones

```tsx
// Usar aria-label para botones solo con icono
<Button aria-label="Menú de navegación">
  <MenuIcon />
</Button>

// Usar type correcto en formularios
<form>
  <Button type="submit">Enviar</Button>
  <Button type="reset">Cancelar</Button>
</form>
```

---

## Dependencias

```tsx
import { cn } from '@/src/lib/cn'; // Utility para unir clases
import { cva, type VariantProps } from 'class-variance-authority'; // Sistema de variantes
import { Link } from '@/src/i18n/navigation'; // Navegación con i18n
import { routing } from '@/src/i18n/routing'; // Config de locales
import { useLocale } from 'next-intl'; // Hook de locale actual
import { FaArrowRightLong } from 'react-icons/fa6'; // Icono de flecha
```

---

## Tokens de Diseño

| Token | Uso                     | Valor esperado            |
| ----- | ----------------------- | ------------------------- |
| `pg0` | Fondo principal, bordes | Color de página principal |
| `tx`  | Texto, fondos oscuros   | Color de texto/foreground |

---

## Ejemplos Completos

### Página de Landing

```tsx
export default function Landing() {
  return (
    <section className="py-20">
      <h1>Bienvenido</h1>
      <p>La mejor plataforma para tus proyectos</p>

      <div className="flex gap-4">
        <Button href="/signup">Comenzar gratis</Button>
        <Button variant="secondary" href="/demo">
          Ver demo
        </Button>
      </div>

      <Button variant="link" href="/learn-more">
        Conoce más sobre nosotros
      </Button>
    </section>
  );
}
```

### Formulario de Contacto

```tsx
export default function ContactForm() {
  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <input type="text" name="email" placeholder="Email" />

      <div className="flex gap-4 mt-6">
        <Button type="submit">Enviar mensaje</Button>
        <Button type="reset">Limpiar</Button>
      </div>
    </form>
  );
}
```

### Card de Producto

```tsx
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-6">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div className="mt-4">
        <Button href={`/products/${product.id}`}>Ver detalles</Button>
      </div>
    </div>
  );
}
```
