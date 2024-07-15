import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
    public async encodeBase64(data: string) {
        return Buffer.from(data).toString('base64');
    }

    public async decodeBase64(data: string): Promise<string> {
        return Buffer.from(data, 'base64').toString('utf8');
    }
}