# Imagen ligera de Node.js
FROM node:18-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY app/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la app
COPY app .

# Exponer el puerto de la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]