/** @author Ofir G.
 */

import * as express from "express";
import * as bodyParser from "body-parser";
import './config/config.ts';
import { appRoutes } from './routes/app.routes';


const whiteOrgins = JSON.parse(process.env.WHITE_ORGINS) as string[];
const PORT = 3000;

class ExpressApp {

    public app: express.Application;

    constructor() {
        this.app = express();
        this._init();
    }

    private _init(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        if(process.env.NODE_ENV !== 'test') {
            console.log('in');

            this.enableCrossOrgine();
        }
    }

    private enableCrossOrgine() {
        this.app.use((req, res, next) => {
            const origin = req.headers.origin as string;
            // console.log(~whiteOrgins.indexOf(origin.trim()));
            if(origin && ~whiteOrgins.indexOf(origin.trim())){
                console.log(origin);
                res.setHeader('Access-Control-Allow-Origin', origin);
                // res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            }
            // res.setHeader('Access-Control-Request-Headers', 'x-auth , x-provider')
            next();
        });
    }
}

const app = new ExpressApp().app;

app.use(appRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(`server running on port ${process.env.PORT || PORT}`);
})

export { app } // export for testing
