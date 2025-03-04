# Usar Node.js como base
FROM node:18

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de definición de paquetes
COPY package.json package-lock.json ./

# Eliminar node_modules si existe localmente (para evitar copiar binarios incompatibles)
# Instalar dependencias dentro del contenedor Docker
RUN npm ci

# Copiar el resto del código
COPY . .

# Reconstruir bcrypt específicamente para la arquitectura del contenedor
RUN npm rebuild bcrypt --build-from-source

# Generar el cliente de Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "dist/server.js"]