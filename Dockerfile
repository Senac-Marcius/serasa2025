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

# Copia dependências
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia código restante
COPY . .

# Expõe as portas necessárias
EXPOSE 19000 19001 19002

# Inicia o projeto com CLI local via npx
CMD ["npx", "expo", "start", "--tunnel"]