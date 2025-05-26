import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req:any, res:any, next:any) => {
    console.log(`Incoming Request Origin: ${req.headers.origin}`);
    next();
  });

  const corsOrigin = process.env.REQUEST_ORIGIN;
  console.log(`CORS Origin: ${corsOrigin}`);

  app.enableCors({
    origin: process.env.REQUEST_ORIGIN,
    methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
