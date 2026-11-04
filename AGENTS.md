# AGENTS.md

## Проект

Next.js 14 (Pages Router) + TypeScript. Состояние на Redux Toolkit с динамически подключаемыми редьюсерами, стили на SCSS-модулях, HTTP-клиент на axios. Тексты интерфейса и комментарии в коде — на русском.

## Команды

- `yarn dev` — dev-сервер
- `yarn build` — production-сборка (используйте для проверки TypeScript и сборки)
- `yarn start` — запуск production-сервера
- `yarn lint` — ESLint (`next lint -- --dir .`)
- `yarn lint:fix` — ESLint с автоисправлением

Пакетный менеджер: yarn (`yarn.lock`). В CI используется Node `20.18.0`. Тестовый фреймворк не настроен.

## Архитектура

Слои в духе Feature-Sliced:

- `pages/` — маршруты Next.js; собирают виджеты/фичи и проверяют авторизацию/доступ.
- `widgets/` — композиция общего layout (`Layout`, `Header`).
- `features/` — пользовательские действия (Login, Signup, Catalog, ArticleEditor, SandboxWeb, ...).
- `entities/` — доменное состояние и UI (User, Articles, Notifications, Sandbox, Sessions, UserList, AIChat).
- `shared/` — переиспользуемый UI, хуки, хелперы, константы, типы, axios-клиент.
- `app/` — провайдеры, redux store/типы, глобальные стили.

Алиасы путей (см. `tsconfig.json`): `@app/*`, `@entities/*`, `@features/*`, `@providers/*`, `@shared/*`, `@widgets/*`, `@helpers/*`, `@lib/*`, `@utils/*`, `@styles/*`, `@customTypes/*`.

## Ключевые паттерны

### Публичный API слайса

У каждой фичи/сущности есть `index.ts`, который реэкспортирует её публичный API. Страницы и другие слои должны импортировать из корня алиаса, а не по глубоким путям:

```ts
export { AsyncMain as Catalog } from './ui/Main/Main.async'
export type { CatalogState } from './types'
```

### Асинхронные точки входа UI

Тяжёлые компоненты оборачиваются в `*.async.tsx` через `next/dynamic` с `ssr: false` и fallback `Loader`, а затем реэкспортируются из `index.ts`. Страницы импортируют только публичный async-экспорт.

### Динамические редьюсеры Redux

В `app/redux/Store/index.ts` зарегистрированы только `session` и `notification`. Редьюсеры фич/сущностей подключаются при монтировании и удаляются при размонтировании внутри верхнеуровневого `Main.tsx`:

```ts
const store = useStore() as ReduxStoreWithManager

useEffect(() => {
  store.reducerManager.add('catalog', catalogReducer)
  return () => store.reducerManager.remove('catalog')
}, [store])
```

При добавлении динамического слайса:

1. Создайте `modules/slice` (или `slice/`), экспортирующий `{ actions: xAction }` и `{ reducer: xReducer }`.
2. Добавьте необязательный ключ в `StateSchema` в `app/redux/types/index.ts`.
3. Подключайте/удаляйте его в `useEffect` компонента через `store.reducerManager`.

### Слайсы, thunks, селекторы

- Используйте `createSlice`; асинхронная работа — в `createAsyncThunk` с `rejectValue: string`, вызов из `useEffect`.
- Thunks используют `api` из `@shared/libs/axios` и возвращают `thunkApi.rejectWithValue(...)` при ошибке.
- Селекторы принимают `StateSchema` и безопасно обрабатывают отсутствующее динамическое состояние, например `state.catalog?.total || 0`.
- Используйте типизированные хуки из `@shared/hooks/redux` (`useAppDispatch`, `useAppSelector`).

### Стили

- Каждый UI-компонент хранится в отдельной папке: `Component/Component.tsx` и `Component/Component.module.scss`.
- Стили компонентов лежат рядом с компонентами как `*.module.scss`; импортируются как `cls`.
- Для условных классов используйте `classNames` из `@shared/helpers/classNames`.
- Глобальные стили и переменные: `app/styles/index.scss`, `app/styles/modules/*.scss`.
- В стилях используйте только цвета из CSS-переменных (`var(--color-*)`); не задавайте собственные цветовые значения.

### API и авторизация

- `shared/libs/axios/index.ts` создаёт общий экземпляр `api` с `NEXT_PUBLIC_HOST_API` и обрабатывает 401 через вызов `/session/refresh-token` с повторным запросом.
- Сессия живёт в `entities/User` (`getSessionData`, `sessionAction`, `getSession`). Страницы проверяют доступ по `isReady`/`isAuth`; страницы только для админов — по `userData?.roles?.includes('admin')`.
- Для потоковой работы на `fetch` используйте `@shared/hooks/useFetchWithAuth`.

## Стиль кода

Prettier: без точек с запятой, одинарные кавычки, отступ 2 пробела, ширина строки 100, `trailingComma: es5`, сортировка импортов через `@trivago/prettier-plugin-sort-imports` (см. `.prettierrc`).

Важное из ESLint (`.eslintrc.js`): неиспользуемые импорты — ошибка, `no-param-reassign` — ошибка, точки с запятой запрещены, одинарные кавычки, правила React hooks включены, `@next/next/no-img-element` отключено.

Не добавляйте комментарии без просьбы. Соблюдайте существующий русскоязычный стиль текстов интерфейса.

## Окружение и секреты

`.env` содержит `NEXT_PUBLIC_HOST_API` и сейчас отслеживается git. Не коммитьте новые секреты и не логируйте учётные данные. `next.config.js` пробрасывает только `NEXT_PUBLIC_HOST_API`.

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yaml`: SSH на сервер, `git pull`, `yarn install`, `yarn build`, затем `pm2 restart ecosystem.config.json`.
