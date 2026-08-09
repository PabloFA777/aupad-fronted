# Reglas y Estándares de Desarrollo Frontend (Angular 21)

Este documento define las directrices, arquitecturas, buenas prácticas y estándares de programación que la Inteligencia Artificial (y cualquier desarrollador) debe seguir rigurosamente al generar o modificar código en el proyecto Frontend.

---

## 1. Directrices Generales y Filosofía
- **Stack Tecnológico Principal**: Angular 21, TypeScript 5.x, HTML5 semántico, CSS3 / SCSS moderno, RxJS 7+, Signals API.
- **Principios Clave**:
  - **Component-Driven Architecture**: Componentes reutilizables, desacoplados y con responsabilidad única.
  - **Signals First**: Reactividad moderna orientada al estado con Angular Signals.
  - **OnPush Change Detection**: Rendimiento optimizado por defecto en todos los componentes.
  - **Strict Type System**: Prohibido el uso del tipo `any`. Tipado estricto habilitado en `tsconfig.json`.
- **Formato del Código**: Código en inglés para nombres de clases, propiedades, métodos, tipos e interfaces. Documentación y comunicación con el usuario en español.

---

## 2. Arquitectura de Archivos y Carpetas (Feature-Sliced)

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/              # Servicios singleton, interceptores HTTP, guards, modelos globales
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── shared/            # Componentes UI reutilizables, directives, pipes utilitarios
│   │   │   ├── components/    # (ej. botones, módales, tablas genéricas)
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── features/          # Módulos/Funcionalidades de negocio
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   └── auth.routes.ts
│   │   │   └── dashboard/
│   │   ├── app.config.ts      # Configuración de proveedores (ProvideRouter, ProvideHttpClient, etc.)
│   │   ├── app.routes.ts      # Rutas principales con Carga Perezosa (Lazy Loading)
│   │   └── app.component.ts   # Componente raíz
│   ├── assets/                # Imágenes, i18n, fuentes
│   └── styles/                # Variables SCSS globales, temas, resets
```

---

## 3. Estándares de Angular 21 y Reactividad

### A. Standalone Architecture (Prohibido NgModules)
- Todos los componentes, directivas y pipes deben ser **Standalone** (`standalone: true` por defecto en Angular 21).
- Las dependencias se importan directamente en el array `imports: [...]` de cada componente.

### B. Angular Signals (Manejo del Estado)
- Utilizar **Signals** como mecanismo primario para el estado local y compartido:
  - `signal()` para valores mutables.
  - `computed()` para derivados reactivos de solo lectura.
  - `linkedSignal()` para estados reactivos dependientes con capacidad de reseteo.
  - `resource()` o `rxResource()` para la carga asíncrona de datos reactivos.
- **Inputs & Outputs Modernos**:
  - Entradas: `input.required<T>()` o `input<T>(defaultValue)`.
  - Salidas: `output<T>()` en lugar del decorador heredado `@Output()`.
  - Binding Bidireccional: `model<T>()` en lugar de `@Input()/@Output()` emparejados.

```typescript
// Ejemplo de componente moderno en Angular 21
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  // Inputs fuertemente tipados con Signals
  userId = input.required<string>();
  userRole = input<string>('Guest');

  // Outputs modernos
  userSelected = output<string>();

  // Estado y computados
  isVIP = computed(() => this.userRole() === 'Admin');
}
```

### C. Nueva Sintaxis de Control Flow (`@if`, `@for`, `@switch`, `@defer`)
- **Prohibido** usar directivas estructurales obsoletas (`*ngIf`, `*ngFor`, `*ngSwitch`).
- Usar bloques nativos de control de flujo:
  - `@if (condition) { ... } @else { ... }`
  - `@for (item of items(); track item.id) { ... } @empty { <p>No data</p> }` (La cláusula `track` es **obligatoria**).
  - `@switch (status()) { @case ('active') { ... } @default { ... } }`
- **Vistas Aplazables (`@defer`)**:
  - Usar `@defer` para lazy loading de componentes pesados en plantilla con triggers adecuados (`on viewport`, `on interaction`, `on idle`, `on hover`).
  - Acompañar siempre con `@placeholder` y opcionalmente `@loading`.

### D. Inyección de Dependencias
- Utilizar la función `inject()` en lugar de parámetros en el constructor para inyectar servicios, HttpClient, Router, etc.
  ```typescript
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  ```

---

## 4. Comunicación HTTP, Interceptores y Servicios

- **HttpClient Configurativo**:
  - Configurar en `app.config.ts` mediante `provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))`.
- **Interceptores Funcionales**:
  - Definir interceptores como funciones de tipo `HttpInterceptorFn`.
  - Agregar token JWT dinámicamente y gestionar errores HTTP de forma centralizada.
- **Tipado Fuerte de Modelos**:
  - Definir interfaces TypeScript estrictas para los DTOs de petición y respuesta que coincidan exactamente con la API backend (.NET 9).
- **Manejo de Desuscripciones / Fugas de Memoria**:
  - Al suscribirse a un Observable RxJS manualmente en el contexto de inyección, usar `takeUntilDestroyed()`.
  - Preferir convertir Observables a Signals con `toSignal()` para su renderizado directo en la plantilla sin gestionar suscripciones manuales.

---

## 5. Formularios Reactivos (Typed Forms)

- Usar **Reactive Forms** fuertemente tipados. Evitar formularios basados en plantillas (`Template-driven forms`) para casos complejos.
- Encapsular validaciones personalizadas en funciones puras y reutilizables.
- Mostrar errores de validación mediante componentes compartidos que reaccionen al estado del control (`touched`, `dirty`, `invalid`).

---

## 6. Rendimiento y Optimización UX

- **Estrategia OnPush**: `changeDetection: ChangeDetectionStrategy.OnPush` en el 100% de los componentes.
- **NgOptimizedImage**: Utilizar la directiva `NgOptimizedImage` (`ngSrc`) para imágenes prioritarias o con lazy loading.
- **Carga Perezosa de Rutas (Lazy Loading)**:
  - Definir rutas usando `loadComponent: () => import('./path').then(m => m.FeatureComponent)`.

---

## 7. Estilo CSS/SCSS y A11y (Accesibilidad)

- Estilos encapsulados por componente. Evitar el uso de `encapsulation: ViewEncapsulation.None` a menos que sea un componente base global.
- Usar **Variables CSS (CSS Custom Properties)** para colores, espaciados y tipografía, facilitando soporte de temas (Dark/Light Mode).
- **Accesibilidad**:
  - Uso correcto de etiquetas HTML5 semánticas (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`).
  - Atributos `aria-label`, `aria-expanded`, `role` en elementos interactivos no nativos.
  - Navegación por teclado y foco visible habilitado.

---

## 8. Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
| :--- | :--- | :--- |
| Archivos de Componente | `kebab-case.component.ts` | `user-profile.component.ts` |
| Clases de Componente | PascalCase + Component | `UserProfileComponent` |
| Archivos de Servicio | `kebab-case.service.ts` | `auth-token.service.ts` |
| Archivos de Modelo/Interfaz | `kebab-case.model.ts` | `order-detail.model.ts` |
| Propiedades y Métodos | camelCase | `getUserData()`, `isPending` |
| Signals | camelCase | `currentUser = signal<User | null>(null)` |
| Constantes | UPPER_SNAKE_CASE | `API_TIMEOUT_MS` |

---

## 9. Instrucciones para la IA / Asistente de Código

Al escribir código para este frontend, la IA **DEBE**:
1. Utilizar **únicamente** sintaxis moderna de Angular 21 (Standalone components, Signals, `@if`, `@for` con `track`, `@defer`, `inject()`).
2. **Prohibir estrictamente** el uso de NgModules, `*ngIf`, `*ngFor`, decoradores `@Input()`/`@Output()` heredados, o el tipo `any`.
3. Especificar siempre `changeDetection: ChangeDetectionStrategy.OnPush` en componentes.
4. Escribir código TypeScript completo y sin omisiones (`// ... resto del código`).
5. Asegurar el tipado estricto en interfaces y modelos DTOs compartidos con el backend.
6. Aplicar la función `track` en cada iteración `@for`.