
/** @author Ofir G.
 */

import { Router } from 'express';
import * as _ from 'lodash';
import { ApprovedProcess } from '../models'

class AppRoutes {

    public routes: Router;

    constructor() {
        this.routes = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.routes
            .get('/approved-processes', async (req, res) => {
                console.log('GET: //approved-processes');
                try {
                    const approvedProcessesData = await ApprovedProcess.find({});
                    return res.status(200).send({ data: approvedProcessesData });
                } catch (error) {
                    return res.status(400).send(error);
                }
            })

            .get('/approved-processes/suppliers/', async (req, res) => {
                console.log('GET: /approved-processes/suppliers/');
                const { query } = req
                const pickedQuery: { [key :string]: string } =
                _.pick(_.pickBy(query, value => value != undefined), ['processName', 'standardName']);
                try {
                    const suppliersAggregate = await ApprovedProcess.aggregate([
                        { $match: pickedQuery },
                        { $group: { _id: { supplierName: '$supplierName', supplierNumber: '$supplierNumber' } } },
                    ]);
                    const suppliers = suppliersAggregate.map((doc => doc._id));
                    return res.status(200).send({ data: suppliers });
                } catch (error) {
                    return res.status(400).send(error);
                }
            })

            .post('/insert-approved-processes', async (req, res) => {
                console.log('POST : /insert-approved-processes')
                const approvedProcesses: any[] = req.body.processes;
                // console.log(approvedProcesses);
                try {
                    await ApprovedProcess.insertMany(approvedProcesses)
                    return res.status(200).send();
                } catch (error) {
                    return res.status(400).send(error);
                }
            })
    }
}

const appRoutes = new AppRoutes().routes;

export { appRoutes }

