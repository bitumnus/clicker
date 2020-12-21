import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
export interface RequestUserInterface extends Request {
    user: any;
}

@Injectable()
export class TempAuthMiddleware implements NestMiddleware {
    public readonly AUTH_HEADER_NAME: string;
    public readonly sex: number;
    public readonly defaultAuthHeader: string;

    constructor(
        private readonly jwtService: JwtService,
        @Inject('AUTH_SERVICE') private readonly authService?: ClientProxy,
        private readonly configService?: ConfigService,
    ) {
        this.AUTH_HEADER_NAME = this.configService.get('AUTH_HEADER_NAME');
        this.sex = this.configService.get('SERVICE_SEX');
        this.defaultAuthHeader = 'authorization';
    }

    parseAuthHeader(hdrValue): any | null {
        const re = /(\S+)\s+(\S+)/;
        if (typeof hdrValue !== 'string') {
            return null;
        }
        const matches = hdrValue.match(re);
        return matches && { scheme: matches[1], value: matches[2] };
    }

    fromAuthHeaderAsBearerToken(request: RequestUserInterface) {
        let token: string = null;
        if (request.headers[this.defaultAuthHeader]) {
            const authParams = this.parseAuthHeader(request.headers[this.defaultAuthHeader]);
            if (authParams && 'bearer' === authParams.scheme.toLowerCase()) {
                token = authParams.value;
            }
        }
        return token;
    }

    async use(req: RequestUserInterface, res: Response, next: any): Promise<any> {
        const token = this.AUTH_HEADER_NAME ? req.headers[this.AUTH_HEADER_NAME] : this.fromAuthHeaderAsBearerToken(req);
        // const auth = await this.authService.send('AUTH_VALIDATE_TOKEN', {
        //     token,
        // }).toPromise().catch((err) => {
        //     return res.status(401).send({status: false, message: 'Auth Error', error: err});
        // });
        const auth = this.jwtService.verify(token as string);
        if (!auth.external_id) {
            return res.status(401).send({status: false, message: 'Auth Error'});
        }
        req.user = auth.data;

        next();
    }
}
