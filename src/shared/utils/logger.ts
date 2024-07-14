import { Injectable } from '@nestjs/common';

@Injectable()
export class Logger {
    public async log(data: any) {
        let value = data;
        if (typeof data === "object" || Array.isArray(data)) {
            value = JSON.stringify(data);
        }

        console.log(value);
    }
}

