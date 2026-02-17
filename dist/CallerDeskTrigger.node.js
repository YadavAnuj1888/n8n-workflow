"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerDeskTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class CallerDeskTrigger {
    constructor() {
        this.description = {
            displayName: 'CallerDesk Webhook',
            name: 'callerDeskWebhook',
            icon: 'file:callerdesk.svg',
            group: ['trigger'],
            version: 1,
            description: 'Multi-tenant CallerDesk webhook trigger',
            defaults: {
                name: 'CallerDesk Webhook',
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: '={{$parameter["httpMethod"]}}',
                    responseMode: '={{$parameter["responseMode"]}}',
                    path: '={{$parameter["accountId"] + "/" + $parameter["path"]}}',
                    authentication: '={{$parameter["authentication"]}}',
                },
            ],
            properties: [
                {
                    displayName: 'HTTP Method',
                    name: 'httpMethod',
                    type: 'options',
                    options: [
                        { name: 'GET', value: 'GET' },
                        { name: 'POST', value: 'POST' },
                    ],
                    default: 'GET',
                },
                {
                    displayName: 'Account ID',
                    name: 'accountId',
                    type: 'string',
                    required: true,
                    default: '',
                },
                {
                    displayName: 'Path',
                    name: 'path',
                    type: 'string',
                    required: true,
                    default: 'incoming-call',
                },
                {
                    displayName: 'Authentication',
                    name: 'authentication',
                    type: 'options',
                    options: [
                        { name: 'None', value: 'none' },
                        { name: 'Basic Auth', value: 'basicAuth' },
                        { name: 'Header Auth', value: 'headerAuth' },
                        { name: 'JWT Auth', value: 'jwtAuth' },
                    ],
                    default: 'none',
                },
                {
                    displayName: 'Respond',
                    name: 'responseMode',
                    type: 'options',
                    options: [
                        { name: 'Immediately', value: 'onReceived' },
                        { name: 'When Last Node Finishes', value: 'lastNode' },
                        { name: "Using 'Respond to Webhook' Node", value: 'responseNode' },
                        { name: 'Streaming', value: 'stream' },
                    ],
                    default: 'onReceived',
                },
                {
                    displayName: 'Trigger Only If Status',
                    name: 'statusFilter',
                    type: 'options',
                    options: [
                        { name: 'All', value: 'all' },
                        { name: 'Answered', value: 'ANSWER' },
                        { name: 'Missed', value: 'MISSED' },
                        { name: 'Failed', value: 'FAILED' },
                    ],
                    default: 'all',
                },
                {
                    displayName: 'Require Source Number',
                    name: 'requireSource',
                    type: 'boolean',
                    default: false,
                },
                {
                    displayName: 'Normalize Output',
                    name: 'normalizeOutput',
                    type: 'boolean',
                    default: true,
                },
            ],
        };
    }
    async webhook() {
        try {
            const query = this.getQueryData();
            const body = this.getBodyData();
            const rawData = Object.keys(query).length > 0 ? query : body;
            const accountId = this.getNodeParameter('accountId', 0);
            const statusFilter = this.getNodeParameter('statusFilter', 0);
            const requireSource = this.getNodeParameter('requireSource', 0);
            const normalizeOutput = this.getNodeParameter('normalizeOutput', 0);
            const responseMode = this.getNodeParameter('responseMode', 0);
            if (!rawData.CallSid) {
                return { workflowData: [] };
            }
            const incomingAccount = rawData.account_id ?? rawData.accountId ?? '';
            if (String(incomingAccount) !== accountId) {
                return { workflowData: [] };
            }
            if (requireSource && !rawData.SourceNumber) {
                return { workflowData: [] };
            }
            const incomingStatus = String(rawData.Status || rawData.callstatus || '').toUpperCase();
            if (statusFilter !== 'all' && incomingStatus !== statusFilter) {
                return { workflowData: [] };
            }
            let output = rawData;
            if (normalizeOutput) {
                output = {
                    type: rawData.type ?? null,
                    sourceNumber: rawData.SourceNumber ?? null,
                    destinationNumber: rawData.DestinationNumber ?? null,
                    status: incomingStatus,
                    callDuration: rawData.CallDuration
                        ? Number(rawData.CallDuration)
                        : 0,
                    talkDuration: rawData.TalkDuration
                        ? Number(rawData.TalkDuration)
                        : 0,
                    startTime: rawData.StartTime
                        ? new Date(String(rawData.StartTime)).toISOString()
                        : null,
                    endTime: rawData.EndTime
                        ? new Date(String(rawData.EndTime)).toISOString()
                        : null,
                    callSid: rawData.CallSid ?? null,
                    recordingUrl: rawData.CallRecordingUrl ?? null,
                    accountId: accountId,
                    raw: rawData,
                };
            }
            if (responseMode === 'onReceived') {
                return {
                    webhookResponse: {
                        body: {
                            success: true,
                            message: 'Webhook received',
                        },
                    },
                    workflowData: [[{ json: output }]],
                };
            }
            return {
                workflowData: [[{ json: output }]],
            };
        }
        catch (error) {
            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
        }
    }
}
exports.CallerDeskTrigger = CallerDeskTrigger;
