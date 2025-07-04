import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

export const sendRemainder = serve( async(context) =>{
    const {subscriptionId} = context.requestPayload;
});
