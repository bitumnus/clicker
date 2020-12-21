import {Test, TestingModule} from '@nestjs/testing';
import {OnlineController} from './online.controller';
import {OnlineModule} from "./online.module";
import {ConfigService} from "@nestjs/config";
import {BodyInterface, RequestInterface} from "./interfaces/online.interface";
import {OnlineService} from "./online.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Inject, Injectable, MiddlewareConsumer, NestModule} from "@nestjs/common";
import {AuthMiddleware} from "./middlewares/auth.middleware";
require('iconv-lite').encodingExists('utf8mb4');

describe('OnlineController', () => {
    let onlineController: OnlineController;
    let configService: ConfigService;
    const man_external_id = 1580829743;
    const man_external_id_array = ['1580829743'];
    const woman_external_id = 1580829741;
    const woman_external_id_array = ['1580829741'];

    class TestOnlineModule implements OnlineModule {
        configure(consumer: MiddlewareConsumer): any {
            consumer
                .apply(AuthMiddleware)
                .forRoutes('*');
        }
    }



    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [ConfigService, TestOnlineModule, ClientsModule.register([
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
                },ConfigService
            ],
        }).compile();

        onlineController = app.get<OnlineController>(OnlineController);
        configService = app.get<ConfigService>(ConfigService);
    });

    //controller
    it('onlineController => should be defined', () => {
        expect(onlineController).toBeDefined();
    });

    /**
     *  @Get('/man/:external_id')
     *  defined
     */
    it('onlineController.getSingleOnlineMan => should be defined', () => {
        expect(onlineController.getSingleOnlineMan(
            <RequestInterface>{params: {external_id: man_external_id}})
        ).toBeDefined();
    });

    /**
     * @Get('/woman/:external_id')
     * defined
     */
    it('onlineController.getSingleOnlineWoman => should be defined', () => {
        expect(onlineController.getSingleOnlineWoman(
            <RequestInterface>{params: {external_id: woman_external_id}})
        ).toBeDefined();
    });

    /**
     * @Get('/man')
     * defined
     */
    it('onlineController.getOnlineManList => should be defined', () => {
        expect(onlineController.getOnlineManList()).toBeDefined();
    });
    /**
     * @Get('/woman')
     * defined
     */
    it('onlineController.getOnlineWomanList => should be defined', () => {
        expect(onlineController.getOnlineWomanList()).toBeDefined();
    });

    /**
     * @Post('/man/:external_id')
     * defined
     */
    it('onlineController.setSingleOnlineMan => should be defined', () => {
        expect(onlineController.setSingleOnlineMan(
            <RequestInterface>{params: {external_id: man_external_id}},
            configService.get('MAN_SEX'))
        ).toBeDefined();
    });

    /**
     * @Post('/woman/:external_id')
     * defined
     */
    it('onlineController.setSingleOnlineWoman => should be defined', () => {
        expect(onlineController.setSingleOnlineWoman(
            <RequestInterface>{params: {external_id: woman_external_id}},
            configService.get('WOMAN_SEX'))
        ).toBeDefined();
    });

    /**
     * @Delete('/man/:external_id')
     * defined
     */
    it('onlineController.setSingleOfflineMan => should be defined', () => {
        expect(onlineController.setSingleOfflineMan(
            <RequestInterface>{params: {external_id: man_external_id}},
            configService.get('MAN_SEX'))
        ).toBeDefined();
    });

    /**
     * @Delete('/woman/:external_id')
     * defined
     */
    it('onlineController.setSingleOfflineWoman => should be defined', () => {
        expect(onlineController.setSingleOfflineWoman(
            <RequestInterface>{params: {external_id: woman_external_id}},
            configService.get('WOMAN_SEX'))
        ).toBeDefined();
    });


    /**
     * @Post('/man_list')
     * defined
     */
    it('onlineController.getOnlineManListByExternalID => should be defined', () => {
        expect(onlineController.getOnlineManListByExternalID(
            <BodyInterface><unknown>{external_id: man_external_id_array},// TODO fix issue with <unknown> type.
            configService.get('MAN_SEX'))
        ).toBeDefined();
    });

    /**
     * @Post('/woman_list')
     * defined
     */
    it('onlineController.getOnlineWomanListByExternalID => should be defined', () => {
        expect(onlineController.getOnlineWomanListByExternalID(
            <BodyInterface><unknown>{external_id: woman_external_id_array},// TODO fix issue with <unknown> type.
            configService.get('WOMAN_SEX'))
        ).toBeDefined();
    });

});
