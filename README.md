# SprintBoard API

Mini proyecto funcional para practicar Git y GitHub con un equipo de 8 personas.

## Stack

- Node.js + Express
- Prisma ORM 6
- MySQL
- JWT
- MVC con Repository, Service, Controller y Routes
- Subsistemas y carpeta `shared`

## Inicio rápido

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

Usuario inicial:

```text
admin@sprintboard.com
Admin12345
```

API: `http://localhost:3000/api/v1`

La guía completa está en `docs/GUIA_GIT.md` y las peticiones en `http/sprintboard.http`.
