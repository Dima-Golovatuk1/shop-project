# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 80




#РОЗРОБКА 
FROM node:22.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
