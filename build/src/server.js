"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const port = process.env.PORT || 8001;
app_1.server.listen(port, () => console.log(`Auth Service is running at http://localhost:${port}`));
//# sourceMappingURL=server.js.map