# Checklist de Kendal

## Por cada Pull Request

- [ ] Destino `develop`
- [ ] Rama actualizada
- [ ] Solo modifica su subsistema
- [ ] Commits con formato `tipo(subsistema): mensaje`
- [ ] Controller no usa Prisma
- [ ] Repository no usa `req` ni `res`
- [ ] Service contiene validaciones
- [ ] Endpoint probado
- [ ] No incluye `.env`

## Integración final

- [ ] Login funciona
- [ ] Usuarios CRUD funciona
- [ ] Equipos CRUD funciona
- [ ] Tareas CRUD funciona
- [ ] Comentarios funcionan
- [ ] Reporte funciona
- [ ] 401 sin token
- [ ] 403 para rol incorrecto
- [ ] Alejandro aprobó `develop -> main`
