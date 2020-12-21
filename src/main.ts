import { NestFactory } from '@nestjs/core';
import { Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { ClickModule } from './click.module';

async function bootstrap() {
  const app = await NestFactory.create(ClickModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
          urls: [configService.get("RMQ_URL")],
          queue: "QUEUE_SYNC_SERVICE_CLICK",
          queueOptions: {
              durable: false
          }
      }
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3002);
}
bootstrap();
