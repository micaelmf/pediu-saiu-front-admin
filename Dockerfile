# Use a imagem oficial do Node.js baseada em Alpine Linux
FROM node:20-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o servidor irá rodar
EXPOSE 3002

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]
