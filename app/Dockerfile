# 1. Usar una imagen base ligera
FROM node:18-alpine

# 2. Definir directorio de trabajo
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar las librerías necesarias
RUN npm install

# 5. Copiar todo el código fuente
COPY . .

# 6. Exponer el puerto donde corre Node
EXPOSE 3000

# 7. Comando para arrancar la app
CMD ["node", "index.js"]