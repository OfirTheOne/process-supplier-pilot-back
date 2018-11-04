import { mongoose } from '../../db/mongoose';
import * as validator from 'validator';

export const ApprovedProcessSchema = new mongoose.Schema({
    supplierName:       { type: String, required: true },
    standardName:       { type: String, default: '' },
    processName:        { type: String, required: true },
    elop:               { type: Boolean, default: false},
    comments:           { type: String, default: '' },
    supplierNumber:     { type: String, default: '' },   /* supplierId */ 
    NADCAP:             { type: Boolean, required: true, default: false },
    AS9100:             { type: Boolean, required: true, default: false },
    aircraft:           { type: Boolean, required: true, default: false },
    land:               { type: Boolean, required: true, default: false },
    drone:              { type: Boolean, required: true, default: false },
    elisra:             { type: Boolean, required: true, default: false },
    kinetics:           { type: Boolean, required: true, default: false },
});
