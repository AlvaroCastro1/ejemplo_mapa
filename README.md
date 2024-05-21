## Mapa Seguimiento

Para iniciar el servicio se necesita crear una imagen basada en el `Dockerfile` e iniciar el servicio

```bash
docker build -t real-time-taxi .

docker run -p 4000:4000 real-time-taxi
```