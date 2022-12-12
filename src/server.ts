import {server} from "./config/app";

const port = process.env.PORT || 8001;
// tslint:disable-next-line:no-console
server.listen(port, () => console.log(`Auth Service is running at http://localhost:${port}`));