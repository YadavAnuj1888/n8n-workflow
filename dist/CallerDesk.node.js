"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerDesk = void 0;
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
                    noDataExpression: true,
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
                    noDataExpression: true,
                    default: 'click_to_call_v2',
                    displayOptions: { show: { resource: ['call'] } },
                    options: [
                        { name: 'Make (V2)', value: 'click_to_call_v2', action: 'Make a call v2' },
                        { name: 'Make (V3)', value: 'click_to_call_v3', action: 'Make a call v3' },
                        { name: 'Make (V4)', value: 'click_to_call_v4', action: 'Make a call v4' },
                        { name: 'Single Leg', value: 'singleleg', action: 'Single leg call' },
                        { name: 'Live Status', value: 'live_call', action: 'Get live call status' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['contact'] } },
                    default: 'save_contact',
                    options: [
                        { name: 'Create', value: 'save_contact', action: 'Create a contact' },
                        { name: 'Get All', value: 'contact_list', action: 'Get all contacts' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['member'] } },
                    default: 'add_member',
                    options: [
                        { name: 'Create', value: 'add_member', action: 'Create a team member' },
                    ],
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: { show: { resource: ['reports'] } },
                    default: 'app_call_list',
                    options: [
                        { name: 'App Calls', value: 'app_call_list', action: 'Get app call list' },
                        { name: 'Routing', value: 'routing_detail', action: 'Get routing details' },
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
        const baseUrl = credentials.baseUrl.replace(/\/$/, '');
        const authCode = credentials.authCode;
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                let requestOptions;
                if (resource === 'call') {
                    if (operation === 'click_to_call_v2') {
                        requestOptions = {
                            method: 'GET',
                            url: `${baseUrl}/api/click_to_call_v2`,
                            qs: {
                                calling_party_a: this.getNodeParameter('calling_party_a', i),
                                calling_party_b: this.getNodeParameter('calling_party_b', i),
                                deskphone: this.getNodeParameter('deskphone', i),
                                call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                                authcode: authCode,
                            },
                        };
                    }
                    else if (operation === 'click_to_call_v3') {
                        requestOptions = {
                            method: 'GET',
                            url: `${baseUrl}/api/click_to_call_v3`,
                            qs: {
                                calling_party_a: this.getNodeParameter('calling_party_a', i),
                                calling_party_b: this.getNodeParameter('calling_party_b', i),
                                group_name: this.getNodeParameter('group_name', i),
                                deskphone: this.getNodeParameter('deskphone', i),
                                call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                                authcode: authCode,
                            },
                        };
                    }
                    else if (operation === 'click_to_call_v4') {
                        requestOptions = {
                            method: 'GET',
                            url: `${baseUrl}/api/click_to_call_v4`,
                            qs: {
                                calling_party_b: this.getNodeParameter('calling_party_b', i),
                                member_id: this.getNodeParameter('member_id', i),
                                deskphone: this.getNodeParameter('deskphone', i),
                                call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                                authcode: authCode,
                            },
                        };
                    }
                    else if (operation === 'singleleg') {
                        requestOptions = {
                            method: 'POST',
                            url: `${baseUrl}/api/singleleg-clicktocall`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({
                                authcode: authCode,
                                agent_number: this.getNodeParameter('agent_number', i),
                                customer_number: this.getNodeParameter('customer_number', i),
                                callerid: this.getNodeParameter('callerid', i),
                            }).toString(),
                        };
                    }
                    else if (operation === 'live_call') {
                        requestOptions = {
                            method: 'GET',
                            url: `${baseUrl}/api/live_call_v2`,
                            qs: { authcode: authCode },
                        };
                    }
                    else {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: `Unknown call operation: ${operation}` });
                    }
                }
                else if (resource === 'contact') {
                    if (operation === 'save_contact') {
                        requestOptions = {
                            method: 'POST',
                            url: `${baseUrl}/api/savecontact_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({
                                authcode: authCode,
                                contact_num: this.getNodeParameter('contact_num', i),
                                contact_name: this.getNodeParameter('contact_name', i),
                                contact_email: this.getNodeParameter('contact_email', i),
                                contact_address: this.getNodeParameter('contact_address', i),
                            }).toString(),
                        };
                    }
                    else if (operation === 'contact_list') {
                        requestOptions = {
                            method: 'POST',
                            url: `${baseUrl}/api/contact_list_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        };
                    }
                    else {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: `Unknown contact operation: ${operation}` });
                    }
                }
                else if (resource === 'member') {
                    requestOptions = {
                        method: 'POST',
                        url: `${baseUrl}/api/addmember_v2`,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            authcode: authCode,
                            member_name: this.getNodeParameter('member_name', i),
                            member_num: this.getNodeParameter('member_num', i),
                            access: this.getNodeParameter('access', i),
                            active: this.getNodeParameter('active', i),
                        }).toString(),
                    };
                }
                else if (resource === 'reports') {
                    if (operation === 'app_call_list') {
                        requestOptions = {
                            method: 'POST',
                            url: `${baseUrl}/api/app_call_list_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        };
                    }
                    else if (operation === 'routing_detail') {
                        requestOptions = {
                            method: 'POST',
                            url: `${baseUrl}/api/getroutingdetail_V2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        };
                    }
                    else {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: `Unknown reports operation: ${operation}` });
                    }
                }
                else {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), { message: `Unknown resource: ${resource}` });
                }
                const response = await this.helpers.httpRequestWithAuthentication.call(this, 'callerDeskApi', requestOptions);
                returnData.push({ json: response ?? {} });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.CallerDesk = CallerDesk;
