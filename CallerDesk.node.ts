import {
    INodeType,
    INodeTypeDescription,
    IExecuteFunctions,
    INodeExecutionData,
    NodeConnectionTypes,
    NodeApiError,
} from 'n8n-workflow';

export class CallerDesk implements INodeType {

    description: INodeTypeDescription = {
        displayName: 'CallerDesk',
        name: 'callerDesk',
        icon: 'file:callerdesk.svg',
        group: ['transform'],
        version: 1,
        description: 'CallerDesk API integration',
        defaults: { name: 'CallerDesk' },

        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],

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
                noDataExpression: true,
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                default: 'click_to_call_v2',
                noDataExpression: true,
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
                displayOptions: { show: { resource: ['contact'] } },
                default: 'save_contact',
                noDataExpression: true,
                options: [
                    { name: 'Create', value: 'save_contact', action: 'Create a contact' },
                    { name: 'Get All', value: 'contact_list', action: 'Get all contacts' },
                ],
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: { show: { resource: ['member'] } },
                default: 'add_member',
                noDataExpression: true,
                options: [
                    { name: 'Create', value: 'add_member', action: 'Create a team member' },
                ],
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: { show: { resource: ['reports'] } },
                default: 'app_call_list',
                noDataExpression: true,
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


    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('callerDeskApi');

        const authCode = credentials.authCode as string;
        const baseUrl = (credentials.baseUrl as string).replace(/\/$/, ''); // strip trailing slash

        for (let i = 0; i < items.length; i++) {

            try {

                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                let response: any;

                if (resource === 'call') {

                    if (operation === 'click_to_call_v2') {
                        response = await this.helpers.httpRequest({
                            method: 'GET',
                            url: `${baseUrl}/api/click_to_call_v2`,
                            qs: {
                                calling_party_a: this.getNodeParameter('calling_party_a', i),
                                calling_party_b: this.getNodeParameter('calling_party_b', i),
                                deskphone: this.getNodeParameter('deskphone', i),
                                call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                                authcode: authCode,
                            },
                        });
                    }

                    else if (operation === 'click_to_call_v3') {
                        response = await this.helpers.httpRequest({
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
                        });
                    }

                    else if (operation === 'click_to_call_v4') {
                        response = await this.helpers.httpRequest({
                            method: 'GET',
                            url: `${baseUrl}/api/click_to_call_v4`,
                            qs: {
                                calling_party_b: this.getNodeParameter('calling_party_b', i),
                                member_id: this.getNodeParameter('member_id', i),
                                deskphone: this.getNodeParameter('deskphone', i),
                                call_from_did: this.getNodeParameter('call_from_did', i) ? 1 : 0,
                                authcode: authCode,
                            },
                        });
                    }

                    else if (operation === 'singleleg') {
                        response = await this.helpers.httpRequest({
                            method: 'POST',
                            url: `${baseUrl}/api/singleleg-clicktocall`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({
                                authcode: authCode,
                                agent_number: this.getNodeParameter('agent_number', i) as string,
                                customer_number: this.getNodeParameter('customer_number', i) as string,
                                callerid: this.getNodeParameter('callerid', i) as string,
                            }).toString(),
                        });
                    }

                    else if (operation === 'live_call') {
                        response = await this.helpers.httpRequest({
                            method: 'GET',
                            url: `${baseUrl}/api/live_call_v2`,
                            qs: { authcode: authCode },
                        });
                    }
                }

                else if (resource === 'contact') {

                    if (operation === 'save_contact') {
                        response = await this.helpers.httpRequest({
                            method: 'POST',
                            url: `${baseUrl}/api/savecontact_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({
                                authcode: authCode,
                                contact_num: this.getNodeParameter('contact_num', i) as string,
                                contact_name: this.getNodeParameter('contact_name', i) as string,
                                contact_email: this.getNodeParameter('contact_email', i) as string,
                                contact_address: this.getNodeParameter('contact_address', i) as string,
                            }).toString(),
                        });
                    }

                    else if (operation === 'contact_list') {
                        response = await this.helpers.httpRequest({
                            method: 'POST',
                            url: `${baseUrl}/api/contact_list_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        });
                    }
                }

                else if (resource === 'member') {
                    response = await this.helpers.httpRequest({
                        method: 'POST',
                        url: `${baseUrl}/api/addmember_v2`,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            authcode: authCode,
                            member_name: this.getNodeParameter('member_name', i) as string,
                            member_num: this.getNodeParameter('member_num', i) as string,
                            access: this.getNodeParameter('access', i) as string,
                            active: this.getNodeParameter('active', i) as string,
                        }).toString(),
                    });
                }

                else if (resource === 'reports') {

                    if (operation === 'app_call_list') {
                        response = await this.helpers.httpRequest({
                            method: 'POST',
                            url: `${baseUrl}/api/app_call_list_v2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        });
                    }

                    else if (operation === 'routing_detail') {
                        response = await this.helpers.httpRequest({
                            method: 'POST',
                            url: `${baseUrl}/api/getroutingdetail_V2`,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ authcode: authCode }).toString(),
                        });
                    }
                }

                returnData.push({ json: response ?? {} });

            } catch (error) {

                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: (error as Error).message },
                    });
                    continue;
                }

                throw new NodeApiError(this.getNode(), error as any);
            }
        }

        return [returnData];
    }
}