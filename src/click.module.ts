import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { 
    ConfigModule,
    ConfigService,
} from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthMiddleware } from "@mrlee133/auth-middleware";
import { ClickController } from "./click.controller";
import { ClickService } from "./click.service";
import {JwtModule} from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from "./models/click.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ConfigService,
        ClientsModule.register([
          {
              name: 'AUTH_SERVICE',
              transport: Transport.RMQ,
              options: {
                  urls: [process.env.RMQ_URL],
                  queue: 'QUEUE_SYNC_SERVICE_AUTH',
                  queueOptions: {
                      durable: false
                  },
              },
          }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>("MONGO_URL"),
                useFindAndModify: false
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeatureAsync([
            { 
                name: Click.name,
                useFactory: () => {
                    const schema = ClickSchema;
                    schema.pre("save", () => console.log("Hello from pre save"));
                    return schema;
                }
            },
        ]),
    ],
    controllers: [ClickController],
    providers: [ClickService],
  })
export class ClickModule  implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('*');
    }
}
