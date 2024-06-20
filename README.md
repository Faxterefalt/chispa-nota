# chispa-nota
Repositorio remoto para el proyecto de programación web
## descripción
Compartido y privado 
## Nombre del equipo 
Los magios
## Integrantes
Azuga Fernandez Marcelo Fabian

Rojas Patiño Josue Pedro
# Cómo arrancar:
Dede la raíz, instalar yarn con npm:
npm install yarn
## arranque-frontend:

-> instalar vite desde la ruta de chispa-nota_Frontend
- yarn install
- yarn add vite
ojo: es posible que tengas que actualizar node js por una versión superior a la 20

## arranque-backend(node-js y laravel):
---> Arrancar el node-js
-> Añadir nodemon desde la ruta de chispa-nota_Backend
yarn add nodemon
(el servidor correrá en el puerto 5000)

Para Backend y Frontend, inicias con:
yarn dev

---> Para arrancar laravel<br>
-> Es necesario tener descargado el composer y una version de php mayor o igual a 7.4<br>
-> Una vez instalado nos situamos en la ruta chispa-nota_Backend<br>
composer install<br>
-> Luego el siguiente paso es crear un archivo .env en la carpeta chispa-nota_Backend y copiar<br>
-> dentro del archivo el contenido del archivo envText.txt que esta chispa-nota_Backend<br>
-> luego modificara este campo en el .env DB_DATABASE= /*nombre de base creada en su maquina*/<br>
-> luego ejecutamos los siguientes comandos<br>
php artisan migrate<br>
Para iniciar Backend laravel (usa en el puerto 8000):<br>
php artisan serve<br>
# Resumen (incluyendo laravel)
-> ruta frontend: yarn dev
-> ruta backend: yarn dev (servidor de pizarra)

-> ruta backend: php artisan serve (servidor de los usuarios)
Es necesario tener corriendo los 3 comandos en una terminal diferente