FROM node:22.11.0-alpine3.20 AS base

RUN npm install -g corepack@0.31.0

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# -------------->
FROM base AS installer

WORKDIR /home/node

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node prisma/schema.prisma ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

RUN pnpm prisma:generate

# -------------->
FROM base AS builder

USER node

WORKDIR /home/node

COPY --chown=node:node prisma/schema.prisma ./
COPY --chown=node:node package*.json tsconfig.json ./
COPY --chown=node:node src src/

RUN pnpm install

RUN pnpm prisma:generate

RUN pnpm run build

# -------------->
FROM base AS runner

RUN apk add dumb-init

ENV NODE_ENV='development'

USER node

WORKDIR /home/node

COPY --chown=node:node --from=installer /home/node/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/dist ./dist
COPY --chown=node:node prisma/migrations ./prisma/migrations
COPY --chown=node:node prisma/schema.prisma ./prisma
COPY --chown=node:node package.json ./

EXPOSE 3001

CMD ["dumb-init", "node", "dist/main.js"]