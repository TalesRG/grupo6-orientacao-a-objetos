FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos necessários primeiro (melhora cache do Docker)
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Agora copia o restante dos arquivos, incluindo tsconfig.json e src/
COPY . .

# Compila a aplicação NestJS
RUN npm run build

# Expõe a porta do NestJS
EXPOSE 3000

# Comando de execução
CMD ["npm", "run", "start:prod"]