import { mongoose } from '../../db/mongoose';
import { ApprovedProcessSchema } from './approved-process.schema';

export const ApprovedProcess = mongoose.model('ApprovedProcess', ApprovedProcessSchema);
