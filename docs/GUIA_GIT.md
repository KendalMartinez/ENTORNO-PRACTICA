# Simulacro Git: SprintBoard API

## Equipo

- Kendal: líder del proyecto. Controla `shared`, Prisma, rutas globales e integración a `develop`.
- Alejandro: jefe de TI. Revisa y aprueba el paso de `develop` a `main`.
- Angie: autenticación, rama `feature/auth`.
- Brayan: usuarios, rama `feature/usuarios`.
- Shirley: equipos, rama `feature/equipos`.
- Angelin: tareas, rama `feature/tareas`.
- Alex: comentarios, rama `feature/comentarios`.
- Lisetj: reportes, rama `feature/reportes`.

## Regla principal

Cada developer modifica únicamente su carpeta en `src/subsistemas`. Kendal integra `src/routes/index.js`, `prisma/schema.prisma`, `prisma/seed.js`, `src/shared`, `src/app.js`, `src/server.js` y `package.json`.

## Objetivo verificable

Todos deben completar un cambio pequeño en su subsistema, crear al menos 2 commits, abrir un Pull Request hacia `develop`, recibir revisión de Kendal y eliminar la rama después del merge. Alejandro aprobará `develop -> main` cuando todos los endpoints funcionen.

## 1. Preparación de Kendal

```bash
cd sprintboard-git-simulacro
git init
git add .
git commit -m "chore(base): crear SprintBoard API"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
git switch -c develop
git push -u origin develop
```

En GitHub, proteger `main` y `develop`: Pull Request obligatorio, 1 aprobación, conversaciones resueltas y bloqueo de force push.

## 2. Preparación de cada developer

```bash
git clone URL_DEL_REPOSITORIO
cd sprintboard-git-simulacro
git switch develop
git pull origin develop
cp .env.example .env
npm install
npx prisma generate
```

Ajustar `DATABASE_URL` y preparar MySQL:

```sql
CREATE DATABASE sprintboard_git CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Luego:

```bash
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

## 3. Ramas y misión de cada developer

### Angie

```bash
git switch develop
git pull origin develop
git switch -c feature/auth
```

Misión: agregar el campo `expiraEn` a la respuesta del login, calculado como texto informativo, sin modificar el token.

```bash
git add src/subsistemas/auth
git commit -m "feat(auth): informar vencimiento de sesión"
git push -u origin feature/auth
```

### Brayan

```bash
git switch -c feature/usuarios develop
```

Misión: agregar filtro opcional `?activo=true` al listado de usuarios.

```bash
git add src/subsistemas/usuarios
git commit -m "feat(usuarios): filtrar usuarios por estado activo"
git push -u origin feature/usuarios
```

### Shirley

```bash
git switch -c feature/equipos develop
```

Misión: agregar ruta `GET /equipos/:id/resumen` con cantidad de usuarios y tareas.

```bash
git add src/subsistemas/equipos
git commit -m "feat(equipos): agregar resumen del equipo"
git push -u origin feature/equipos
```

### Angelin

```bash
git switch -c feature/tareas develop
```

Misión: agregar filtro opcional `?estado=PENDIENTE` al listado de tareas.

```bash
git add src/subsistemas/tareas
git commit -m "feat(tareas): filtrar tareas por estado"
git push -u origin feature/tareas
```

### Alex

```bash
git switch -c feature/comentarios develop
```

Misión: impedir comentarios con más de 500 caracteres desde el service.

```bash
git add src/subsistemas/comentarios
git commit -m "fix(comentarios): limitar contenido a 500 caracteres"
git push -u origin feature/comentarios
```

### Lisetj

```bash
git switch -c feature/reportes develop
```

Misión: agregar al resumen el porcentaje de tareas completadas.

```bash
git add src/subsistemas/reportes
git commit -m "feat(reportes): calcular porcentaje completado"
git push -u origin feature/reportes
```

## 4. Antes del Pull Request

```bash
git status
git switch develop
git pull origin develop
git switch feature/NOMBRE
git merge develop
npm install
npx prisma generate
npm run dev
```

Probar `GET http://localhost:3000/api/v1/health`. Después:

```bash
git push
```

## 5. Pull Request

Dirección obligatoria: `feature/nombre -> develop`.

Descripción:

```markdown
## Developer
NOMBRE

## Subsistema
NOMBRE DEL SUBSISTEMA

## Cambio
- Descripción concreta

## Archivos modificados
- Lista exacta

## Pruebas
- Endpoint probado
- Resultado esperado

## Confirmación
- [ ] No modifiqué archivos de otro subsistema
- [ ] No subí .env
- [ ] El servidor inicia
- [ ] Actualicé mi rama con develop
```

Kendal revisa arquitectura y funcionamiento. El developer corrige en la misma rama y hace `git push`. Kendal realiza el merge a `develop`.

## 6. Eliminar rama ya integrada

```bash
git switch develop
git pull origin develop
git branch -d feature/NOMBRE
git push origin --delete feature/NOMBRE
```

## 7. Simulacro de conflicto controlado

Solo Kendal y Alejandro harán esta práctica en `docs/ESTADO.md`, nunca en código productivo.

Kendal crea el archivo en una rama:

```bash
git switch develop
git switch -c chore/estado-kendal
echo "Estado: integración técnica" > docs/ESTADO.md
git add docs/ESTADO.md
git commit -m "docs(estado): registrar integración técnica"
git push -u origin chore/estado-kendal
```

Alejandro crea desde `develop` otra rama y escribe en la misma línea:

```bash
git switch develop
git switch -c chore/estado-alejandro
echo "Estado: revisión del jefe de TI" > docs/ESTADO.md
git add docs/ESTADO.md
git commit -m "docs(estado): registrar revisión de TI"
git push -u origin chore/estado-alejandro
```

Después de integrar la primera rama, la segunda deberá hacer:

```bash
git switch chore/estado-alejandro
git fetch origin
git merge origin/develop
```

Resolver conservando:

```text
Estado: integración técnica completada; revisión del jefe de TI pendiente.
```

Finalizar:

```bash
git add docs/ESTADO.md
git commit -m "merge(estado): resolver conflicto de seguimiento"
git push
```

## 8. Cierre del ejercicio

Kendal prueba todos los endpoints del archivo `http/sprintboard.http`. Luego crea el Pull Request `develop -> main`. Alejandro revisa y aprueba. Tras el merge:

```bash
git switch main
git pull origin main
git tag -a v1.0.0 -m "Simulacro Git completado"
git push origin v1.0.0
```

## Criterios de éxito

- 6 ramas feature integradas.
- 12 o más commits de developers.
- 6 Pull Requests hacia `develop`.
- Ningún developer modificó archivos centrales.
- 1 conflicto controlado resuelto.
- Login, CRUD y reporte funcionan.
- `develop -> main` aprobado por Alejandro.
