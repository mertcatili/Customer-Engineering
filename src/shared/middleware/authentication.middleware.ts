import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { pathToRegexp } from "path-to-regexp";
import { Logger } from "../utils/logger";

const jwt = require('jsonwebtoken');

const publicPaths = ["/", "/auth/register", "/auth/login"];

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly logger: Logger,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-access-token"] || req.headers["X-ACCESS-TOKEN"] || req.headers["X-Access-Token"] || req.headers["token"];
        const ipHeader = req.headers["x-forwarded-for"] || req.headers["X-FORWARDED-FOR"] || req.headers["X-Forwarded-For"] || "";
        const ipAddress = ipHeader.toString();

        const logObj = {
            url: req.baseUrl,
            body: req.body,
            ip: ipAddress,
            token,
            headers: req.headers,
        };
        this.logger.log(logObj);


        if (publicPaths.includes(req.originalUrl)) {
            this.logger.log("Public path, skipping authentication");
            console.log("ahmet");
            next();
            return;
        }

        if (token) {
            const tz = req.headers.timezone || req.headers.TIMEZONE || req.headers.Timezone || 3;
            const timezone = parseInt(tz.toString());

            const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    throw new Error("INVALID_TOKEN");
                }
                return {
                    message: decoded
                };
            });

            if (req.body) {
                req.body.user = decoded.message.data;
                req.body.timezone = timezone;
                req.body.ipAddress = ipAddress;
            } else {
                req.body = {
                    user: decoded,
                    timezone,
                    ipAddress,
                };
            }

            next();
        } else {
            this.logger.log(`Authentication error: Empty token!, ${token} `);
            throw new Error("AUTHORIZATION_ERROR");
        }
    }
}
