import * as dns from 'node:dns';
import 'mongodb';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express, { Express, Request, Response } from 'express';
import { AppModule } from '../src/app.module';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const server: Express = express();
let isInitialized = false;

async function bootstrap(): Promise<Express> {
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
  await bootstrap();
  server(req, res);
}
