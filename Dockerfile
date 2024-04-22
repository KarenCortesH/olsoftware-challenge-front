# Usa una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo del contenedor
COPY . .


# Construye la aplicación React para producción
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Define el comando de inicio para ejecutar la aplicación React
CMD ["npm", "start"]
