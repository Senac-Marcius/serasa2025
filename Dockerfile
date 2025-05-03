FROM node:20

# Dependências básicas
RUN apt-get update && apt-get install -y \
  git \
  curl \
  watchman \
  && rm -rf /var/lib/apt/lists/*

# Atualiza npm
RUN npm install -g npm@11.3.0

# Cria diretório da app
WORKDIR /app

# Copia apenas o package.json para cache do Docker
COPY package.json ./

# Instala dependências via NPM
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expo Web + Metro + DevTools
EXPOSE 19000 19001 19002

# Inicia projeto com Expo (modo túnel, ideal para acesso externo)
CMD ["npx", "expo", "start", "--tunnel"]