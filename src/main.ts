import * as dns from 'node:dns';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express, Request, Response } from 'express';
import { AppModule } from './app.module';

if (!process.env.VERCEL) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const server: Express = express();
let isInitialized = false;

async function createServer(): Promise<Express> {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    isInitialized = true;
  }
  return server;
}

export default async function handler(req: Request, res: Response) {
  await createServer();
  server(req, res);
}

async function bootstrap() {
  if (!process.env.VERCEL) {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3000);
  }
}
void bootstrap();

