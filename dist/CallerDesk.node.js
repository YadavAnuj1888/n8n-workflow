"use strict";
// import {
//     INodeType,
//     INodeTypeDescription,
//     IExecuteFunctions,
//     INodeExecutionData,
//     NodeConnectionTypes,
//     NodeApiError,
// } from 'n8n-workflow';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerDesk = void 0;
// export class CallerDesk implements INodeType {
//     description: INodeTypeDescription = {
//         displayName: 'CallerDesk',
//         name: 'callerDesk',
//         icon: 'file:callerdesk.svg',
//         group: ['transform'],
//         version: 1,
//         description: 'CallerDesk API integration',
//         defaults: { name: 'CallerDesk' },
//         inputs: [NodeConnectionTypes.Main],
//         outputs: [NodeConnectionTypes.Main],
//         credentials: [{ name: 'callerDeskApi', required: true }],
//         properties: [
//             {
//                 displayName: 'Resource',
//                 name: 'resource',
//                 type: 'options',
//                 options: [
//                     { name: 'Calling', value: 'call' },
//                     { name: 'Contacts', value: 'contact' },
//                     { name: 'Team Members', value: 'member' },
//                     { name: 'Reports', value: 'reports' },
//                 ],
//                 default: 'call',
//             },
//             {
//                 displayName: 'Operation',
//                 name: 'operation',
//                 type: 'options',
//                 default: 'click_to_call_v2',
//                 displayOptions: {
//                     show: {
//                         resource: ['call'],
//                     },
//                 },
//                 options: [
//                     { name: 'Make (V2)', value: 'click_to_call_v2' },
//                     { name: 'Make (V3)', value: 'click_to_call_v3' },
//                     { name: 'Make (V4)', value: 'click_to_call_v4' },
//                     { name: 'Single Leg', value: 'singleleg' },
//                     { name: 'Live Status', value: 'live_call' },
//                 ],
//             },
//             {
//                 displayName: 'Operation',
//                 name: 'operation',
//                 type: 'options',
//                 displayOptions: {
//                     show: {
//                         resource: ['contact'],
//                     },
//                 },
//                 default: 'save_contact',
//                 options: [
//                     { name: 'Create', value: 'save_contact' },
//                     { name: 'Get All', value: 'contact_list' },
//                 ],
//             },
//             {
//                 displayName: 'Operation',
//                 name: 'operation',
//                 type: 'options',
//                 displayOptions: {
//                     show: {
//                         resource: ['member'],
//                     },
//                 },
//                 default: 'add_member',
//                 options: [
//                     { name: 'Create', value: 'add_member' },
//                 ],
//             },
//             {
//                 displayName: 'Operation',
//                 name: 'operation',
//                 type: 'options',
//                 displayOptions: {
//                     show: {
//                         resource: ['reports'],
//                     },
//                 },
//                 default: 'app_call_list',
//                 options: [
//                     { name: 'App Calls', value: 'app_call_list' },
//                     { name: 'Routing', value: 'routing_detail' },
//                 ],
//             },
//             {
//                 displayName: 'Calling Party A',
//                 name: 'calling_party_a',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Calling Party B',
//                 name: 'calling_party_b',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Deskphone',
//                 name: 'deskphone',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Member ID',
//                 name: 'member_id',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Group Name',
//                 name: 'group_name',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Call From DID',
//                 name: 'call_from_did',
//                 type: 'boolean',
//                 default: true,
//                 displayOptions: {
//                     show: { resource: ['call'] },
//                 },
//             },
//             {
//                 displayName: 'Agent Number',
//                 name: 'agent_number',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: {
//                         operation: ['singleleg'],
//                     },
//                 },
//             },
//             {
//                 displayName: 'Customer Number',
//                 name: 'customer_number',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: {
//                         operation: ['singleleg'],
//                     },
//                 },
//             },
//             {
//                 displayName: 'Caller ID',
//                 name: 'callerid',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: {
//                         operation: ['singleleg'],
//                     },
//                 },
//             },
//             {
//                 displayName: 'Contact Number',
//                 name: 'contact_num',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['contact'] },
//                 },
//             },
//             {
//                 displayName: 'Contact Name',
//                 name: 'contact_name',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['contact'] },
//                 },
//             },
//             {
//                 displayName: 'Contact Email',
//                 name: 'contact_email',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['contact'] },
//                 },
//             },
//             {
//                 displayName: 'Contact Address',
//                 name: 'contact_address',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['contact'] },
//                 },
//             },
//             {
//                 displayName: 'Member Name',
//                 name: 'member_name',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['member'] },
//                 },
//             },
//             {
//                 displayName: 'Member Number',
//                 name: 'member_num',
//                 type: 'string',
//                 default: '',
//                 displayOptions: {
//                     show: { resource: ['member'] },
//                 },
//             },
//             {
//                 displayName: 'Access',
//                 name: 'access',
//                 type: 'string',
//                 default: '2',
//                 displayOptions: {
//                     show: { resource: ['member'] },
//                 },
//             },
//             {
//                 displayName: 'Active',
//                 name: 'active',
//                 type: 'string',
//                 default: '1',
//                 displayOptions: {
//                     show: { resource: ['member'] },
//                 },
//             },
//         ],
//     };
//     async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
//         const items = this.getInputData();
//         const returnData: INodeExecutionData[] = [];
//         const resource = this.getNodeParameter('resource', 0) as string;
//         const operation = this.getNodeParameter('operation', 0) as string;
//         const credentials = await this.getCredentials('callerDeskApi');
//         const authCode = credentials.authCode as string;
//         const baseUrl = credentials.baseUrl as string;
//         for (let i = 0; i < items.length; i++) {
//             try {
//                 let response: any;
//                 const requestOptions: any = { json: true };
//                 if (resource === 'call') {
//                     if (operation === 'click_to_call_v2') {
//                         requestOptions.method = 'GET';
//                         requestOptions.url = `${baseUrl}/api/click_to_call_v2`;
//                         requestOptions.qs = {
//                             calling_party_a: this.getNodeParameter('calling_party_a', i),
//                             calling_party_b: this.getNodeParameter('calling_party_b', i),
//                             deskphone: this.getNodeParameter('deskphone', i),
//                             call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
//                             authcode: authCode,
//                         };
//                     }
//                     else if (operation === 'click_to_call_v3') {
//                         requestOptions.method = 'GET';
//                         requestOptions.url = `${baseUrl}/api/click_to_call_v3`;
//                         requestOptions.qs = {
//                             calling_party_a: this.getNodeParameter('calling_party_a', i),
//                             calling_party_b: this.getNodeParameter('calling_party_b', i),
//                             group_name: this.getNodeParameter('group_name', i),
//                             deskphone: this.getNodeParameter('deskphone', i),
//                             call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
//                             authcode: authCode,
//                         };
//                     }
//                     else if (operation === 'click_to_call_v4') {
//                         requestOptions.method = 'GET';
//                         requestOptions.url = `${baseUrl}/api/click_to_call_v4`;
//                         requestOptions.qs = {
//                             calling_party_b: this.getNodeParameter('calling_party_b', i),
//                             member_id: this.getNodeParameter('member_id', i),
//                             deskphone: this.getNodeParameter('deskphone', i),
//                             call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
//                             authcode: authCode,
//                         };
//                     }
//                     else if (operation === 'singleleg') {
//                         requestOptions.method = 'POST';
//                         requestOptions.url = `${baseUrl}/api/singleleg-clicktocall`;
//                         requestOptions.form = {
//                             authcode: authCode,
//                             agent_number: this.getNodeParameter('agent_number', i),
//                             customer_number: this.getNodeParameter('customer_number', i),
//                             callerid: this.getNodeParameter('callerid', i),
//                         };
//                     }
//                     else if (operation === 'live_call') {
//                         requestOptions.method = 'GET';
//                         requestOptions.url = `${baseUrl}/api/live_call_v2`;
//                         requestOptions.qs = { authcode: authCode };
//                     }
//                 }
//                 if (resource === 'contact') {
//                     if (operation === 'save_contact') {
//                         requestOptions.method = 'POST';
//                         requestOptions.url = `${baseUrl}/api/savecontact_v2`;
//                         requestOptions.form = {
//                             authcode: authCode,
//                             contact_num: this.getNodeParameter('contact_num', i),
//                             contact_name: this.getNodeParameter('contact_name', i),
//                             contact_email: this.getNodeParameter('contact_email', i),
//                             contact_address: this.getNodeParameter('contact_address', i),
//                         };
//                     }
//                     else if (operation === 'contact_list') {
//                         requestOptions.method = 'POST';
//                         requestOptions.url = `${baseUrl}/api/contact_list_v2`;
//                         requestOptions.form = { authcode: authCode };
//                     }
//                 }
//                 if (resource === 'member') {
//                     requestOptions.method = 'POST';
//                     requestOptions.url = `${baseUrl}/api/addmember_v2`;
//                     requestOptions.form = {
//                         authcode: authCode,
//                         member_name: this.getNodeParameter('member_name', i),
//                         member_num: this.getNodeParameter('member_num', i),
//                         access: this.getNodeParameter('access', i),
//                         active: this.getNodeParameter('active', i),
//                     };
//                 }
//                 if (resource === 'reports') {
//                     if (operation === 'app_call_list') {
//                         requestOptions.method = 'POST';
//                         requestOptions.url = `${baseUrl}/api/app_call_list_v2`;
//                         requestOptions.form = { authcode: authCode };
//                     }
//                     else if (operation === 'routing_detail') {
//                         requestOptions.method = 'POST';
//                         requestOptions.url = `${baseUrl}/api/getroutingdetail_V2`;
//                         requestOptions.form = { authcode: authCode };
//                     }
//                 }
//                 response = await this.helpers.request(requestOptions);
//                 returnData.push({
//                     json: response ?? {},
//                 });
//             } catch (error) {
//                 if (this.continueOnFail()) {
//                     returnData.push({
//                         json: { error: (error as Error).message },
//                     });
//                     continue;
//                 }
//                 throw new NodeApiError(this.getNode(), error as any);
//             }
//         }
//         return [returnData];
//     }
// }
const n8n_workflow_1 = require("n8n-workflow");
class CallerDesk {
    constructor() {
        this.description = {
            displayName: 'CallerDesk',
            name: 'callerDesk',
            icon: 'file:callerdesk.svg',
            group: ['transform'],
            version: 1,
            description: 'CallerDesk API integration',
            defaults: { name: 'CallerDesk' },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [{ name: 'callerDeskApi', required: true }],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [
                        { name: 'Calling', value: 'call' },
                        { name: 'Contacts', value: 'contact' },
                        { name: 'Team Members', value: 'member' },
                        { name: 'Reports', value: 'reports' },
                    ],
                    default: 'call',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    default: 'click_to_call_v2',
                    displayOptions: { show: { resource: ['call'] } },
                    options: [
                        { name: 'Make (V2)', value: 'click_to_call_v2' },
                        { name: 'Make (V3)', value: 'click_to_call_v3' },
                        { name: 'Make (V4)', value: 'click_to_call_v4' },
                        { name: 'Single Leg', value: 'singleleg' },
                        { name: 'Live Status', value: 'live_call' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: { show: { resource: ['contact'] } },
                    default: 'save_contact',
                    options: [
                        { name: 'Create', value: 'save_contact' },
                        { name: 'Get All', value: 'contact_list' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: { show: { resource: ['member'] } },
                    default: 'add_member',
                    options: [
                        { name: 'Create', value: 'add_member' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: { show: { resource: ['reports'] } },
                    default: 'app_call_list',
                    options: [
                        { name: 'App Calls', value: 'app_call_list' },
                        { name: 'Routing', value: 'routing_detail' },
                    ],
                },
                { displayName: 'Calling Party A', name: 'calling_party_a', type: 'string', default: '', displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Calling Party B', name: 'calling_party_b', type: 'string', default: '', displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Deskphone', name: 'deskphone', type: 'string', default: '', displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Member ID', name: 'member_id', type: 'string', default: '', displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Group Name', name: 'group_name', type: 'string', default: '', displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Call From DID', name: 'call_from_did', type: 'boolean', default: true, displayOptions: { show: { resource: ['call'] } } },
                { displayName: 'Agent Number', name: 'agent_number', type: 'string', default: '', displayOptions: { show: { operation: ['singleleg'] } } },
                { displayName: 'Customer Number', name: 'customer_number', type: 'string', default: '', displayOptions: { show: { operation: ['singleleg'] } } },
                { displayName: 'Caller ID', name: 'callerid', type: 'string', default: '', displayOptions: { show: { operation: ['singleleg'] } } },
                { displayName: 'Contact Number', name: 'contact_num', type: 'string', default: '', displayOptions: { show: { resource: ['contact'] } } },
                { displayName: 'Contact Name', name: 'contact_name', type: 'string', default: '', displayOptions: { show: { resource: ['contact'] } } },
                { displayName: 'Contact Email', name: 'contact_email', type: 'string', default: '', displayOptions: { show: { resource: ['contact'] } } },
                { displayName: 'Contact Address', name: 'contact_address', type: 'string', default: '', displayOptions: { show: { resource: ['contact'] } } },
                { displayName: 'Member Name', name: 'member_name', type: 'string', default: '', displayOptions: { show: { resource: ['member'] } } },
                { displayName: 'Member Number', name: 'member_num', type: 'string', default: '', displayOptions: { show: { resource: ['member'] } } },
                { displayName: 'Access', name: 'access', type: 'string', default: '2', displayOptions: { show: { resource: ['member'] } } },
                { displayName: 'Active', name: 'active', type: 'string', default: '1', displayOptions: { show: { resource: ['member'] } } },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('callerDeskApi');
        const authCode = credentials.authCode;
        const baseUrl = credentials.baseUrl;
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                let response;
                const requestOptions = {}; // FIXED (removed json:true)
                if (resource === 'call') {
                    if (operation === 'click_to_call_v2') {
                        requestOptions.method = 'GET';
                        requestOptions.url = `${baseUrl}/api/click_to_call_v2`;
                        requestOptions.qs = {
                            calling_party_a: this.getNodeParameter('calling_party_a', i),
                            calling_party_b: this.getNodeParameter('calling_party_b', i),
                            deskphone: this.getNodeParameter('deskphone', i),
                            call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                            authcode: authCode,
                        };
                    }
                    else if (operation === 'click_to_call_v3') {
                        requestOptions.method = 'GET';
                        requestOptions.url = `${baseUrl}/api/click_to_call_v3`;
                        requestOptions.qs = {
                            calling_party_a: this.getNodeParameter('calling_party_a', i),
                            calling_party_b: this.getNodeParameter('calling_party_b', i),
                            group_name: this.getNodeParameter('group_name', i),
                            deskphone: this.getNodeParameter('deskphone', i),
                            call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                            authcode: authCode,
                        };
                    }
                    else if (operation === 'click_to_call_v4') {
                        requestOptions.method = 'GET';
                        requestOptions.url = `${baseUrl}/api/click_to_call_v4`;
                        requestOptions.qs = {
                            calling_party_b: this.getNodeParameter('calling_party_b', i),
                            member_id: this.getNodeParameter('member_id', i),
                            deskphone: this.getNodeParameter('deskphone', i),
                            call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                            authcode: authCode,
                        };
                    }
                    else if (operation === 'singleleg') {
                        requestOptions.method = 'POST';
                        requestOptions.url = `${baseUrl}/api/singleleg-clicktocall`;
                        requestOptions.form = {
                            authcode: authCode,
                            agent_number: this.getNodeParameter('agent_number', i),
                            customer_number: this.getNodeParameter('customer_number', i),
                            callerid: this.getNodeParameter('callerid', i),
                        };
                    }
                    else if (operation === 'live_call') {
                        requestOptions.method = 'GET';
                        requestOptions.url = `${baseUrl}/api/live_call_v2`;
                        requestOptions.qs = { authcode: authCode };
                    }
                }
                if (resource === 'contact') {
                    if (operation === 'save_contact') {
                        requestOptions.method = 'POST';
                        requestOptions.url = `${baseUrl}/api/savecontact_v2`;
                        requestOptions.formData = {
                            authcode: authCode,
                            contact_num: this.getNodeParameter('contact_num', i),
                            contact_name: this.getNodeParameter('contact_name', i),
                            contact_email: this.getNodeParameter('contact_email', i),
                            contact_address: this.getNodeParameter('contact_address', i),
                        };
                    }
                    else if (operation === 'contact_list') {
                        requestOptions.method = 'POST';
                        requestOptions.url = `${baseUrl}/api/contact_list_v2`;
                        requestOptions.form = { authcode: authCode };
                    }
                }
                if (resource === 'member') {
                    requestOptions.method = 'POST';
                    requestOptions.url = `${baseUrl}/api/addmember_v2`;
                    requestOptions.form = {
                        authcode: authCode,
                        member_name: this.getNodeParameter('member_name', i),
                        member_num: this.getNodeParameter('member_num', i),
                        access: this.getNodeParameter('access', i),
                        active: this.getNodeParameter('active', i),
                    };
                }
                if (resource === 'reports') {
                    if (operation === 'app_call_list') {
                        requestOptions.method = 'POST';
                        requestOptions.url = `${baseUrl}/api/app_call_list_v2`;
                        requestOptions.form = { authcode: authCode };
                    }
                    else if (operation === 'routing_detail') {
                        requestOptions.method = 'POST';
                        requestOptions.url = `${baseUrl}/api/getroutingdetail_V2`;
                        requestOptions.form = { authcode: authCode };
                    }
                }
                response = await this.helpers.request({
                    ...requestOptions,
                    json: true,
                });
                returnData.push({ json: response ?? {} });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                    });
                    continue;
                }
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.CallerDesk = CallerDesk;
