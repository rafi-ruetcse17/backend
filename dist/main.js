"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
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
//# sourceMappingURL=main.js.map