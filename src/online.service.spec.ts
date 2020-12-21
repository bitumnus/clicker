import {Test, TestingModule} from '@nestjs/testing';
import {OnlineController} from './online.controller';
import {OnlineService} from './online.service';
import {OnlineModule} from "./online.module";
import {ConfigService} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
require('iconv-lite').encodingExists('utf8mb4');
describe('OnlineService', () => {
    let onlineController: OnlineController;
    let onlineService: OnlineService;
    let configService: ConfigService;
    const man_external_id = 1580829743;
    const man_external_id_array = ['1580829743'];
    const woman_external_id = 1580829741;
    const woman_external_id_array = ['1580829741'];

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [OnlineModule, ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'QUEUE_SYNC_SERVICE_AUTH',
                        queueOptions: {
                            durable: false
                        },
                    },
                }
            ])],
            controllers: [OnlineController],
            providers: [
                {
                    provide: OnlineService,
                    useValue: {},
                },
            ],
        }).compile();

        onlineController = app.get<OnlineController>(OnlineController);
        onlineService = app.get<OnlineService>(OnlineService);
        configService = app.get<ConfigService>(ConfigService);
    });


    //service
    it('onlineService should be defined', () => {
        expect(onlineService).toBeDefined();
    });


    it('onlineService.getSingleOnline => should be defined', () => {
        expect(onlineService.getSingleOnline(configService.get('MAN_SEX'), man_external_id)).toBeDefined();
    });

    it('onlineService.getListOnline => should be defined', () => {
        expect(onlineService.getListOnline(configService.get('MAN_SEX'))).toBeDefined();
    });


    it('onlineService.setSingleOnline => should be defined', () => {
        expect(onlineService.setSingleOnline(configService.get('MAN_SEX'), man_external_id)).toBeDefined();
    });

    it('onlineService.setSingleOffline => should be defined', () => {
        expect(onlineService.setSingleOffline(configService.get('MAN_SEX'), man_external_id)).toBeDefined();
    });


    it('onlineService.getOnlineList => should be defined', () => {
        expect(onlineService.getOnlineList(configService.get('MAN_SEX'), man_external_id_array)).toBeDefined();
    });



    it('onlineService.getSingleOnline => should return value as object', async () => {
        const object = await onlineService.getSingleOnline(configService.get('MAN_SEX'), man_external_id);
        expect(typeof object).toBe('object');
    });



    it('onlineService.getSingleOnline => should return', async () => {
        onlineService.getSingleOnline(configService.get('MAN_SEX'), man_external_id).then(result => {
            if (result === null){
                expect(result).toBeNull();
            }else{
                expect(typeof result).toBe('object');
            }
        });
    });



    it('onlineService.getListOnline => should return value as object', () => {
        const object = onlineService.getListOnline(configService.get('MAN_SEX'));
        expect(typeof object).toBe('object');
    });


    it('onlineService.setSingleOnline => should return value as object', async () => {
        const object = await onlineService.setSingleOnline(configService.get('MAN_SEX'), man_external_id);
        expect(typeof object).toBe('object');
    });



    it('onlineService.setSingleOffline => should return value as object', async () => {
        const object = await onlineService.setSingleOffline(configService.get('MAN_SEX'), man_external_id);
        expect(typeof object).toBe('object');
    });



    it('onlineService.getOnlineList => should return value as object', async () => {
        const object = await onlineService.getOnlineList(configService.get('MAN_SEX'), man_external_id_array);
        expect(typeof object).toBe('object');
    });

    it('onlineService.getOnlineList => should return object', async () => {
        const result = await onlineService.getOnlineList(configService.get('MAN_SEX'), man_external_id_array);
        if (result === null){
            expect(result).toBeNull();
        }else{
            expect(typeof result).toBe('object');
        }
    });

});
