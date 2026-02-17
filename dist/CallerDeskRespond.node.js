"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerDeskRespond = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CallerDeskRespond {
    constructor() {
        this.description = {
            displayName: 'CallerDesk Respond to Webhook',
            name: 'callerDeskRespond',
            icon: 'file:callerdesk.svg',
            group: ['output'],
            version: 1,
            description: 'Return data to CallerDesk webhook',
            defaults: {
                name: 'CallerDesk Respond',
            },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [],
            credentials: [
                {
                    name: 'jwtAuth',
                    required: true,
                    displayOptions: {
                        show: {
                            respondWith: ['jwt'],
                        },
                    },
                },
            ],
            properties: [
                {
                    displayName: 'Respond With',
                    name: 'respondWith',
                    type: 'options',
                    options: [
                        { name: 'First Incoming Item', value: 'firstItem' },
                        { name: 'All Incoming Items', value: 'allItems' },
                        { name: 'JSON', value: 'json' },
                        { name: 'Text', value: 'text' },
                        { name: 'Binary File', value: 'binary' },
                        { name: 'JWT Token', value: 'jwt' },
                        { name: 'Redirect', value: 'redirect' },
                        { name: 'No Data', value: 'noData' },
                    ],
                    default: 'firstItem',
                },
                {
                    displayName: 'Response Body',
                    name: 'responseBody',
                    type: 'json',
                    displayOptions: {
                        show: { respondWith: ['json'] },
                    },
                    default: '{}',
                },
                {
                    displayName: 'Text',
                    name: 'textBody',
                    type: 'string',
                    displayOptions: {
                        show: { respondWith: ['text'] },
                    },
                    default: '',
                },
                {
                    displayName: 'Binary Property',
                    name: 'binaryProperty',
                    type: 'string',
                    displayOptions: {
                        show: { respondWith: ['binary'] },
                    },
                    default: 'data',
                },
                {
                    displayName: 'Redirect URL',
                    name: 'redirectUrl',
                    type: 'string',
                    displayOptions: {
                        show: { respondWith: ['redirect'] },
                    },
                    default: '',
                },
                {
                    displayName: 'JWT Payload',
                    name: 'jwtPayload',
                    type: 'json',
                    displayOptions: {
                        show: { respondWith: ['jwt'] },
                    },
                    default: '{}',
                },
            ],
        };
    }
    async execute() {
        try {
            const respondWith = this.getNodeParameter('respondWith', 0);
            const items = this.getInputData();
            let responseBody = {};
            let responseCode = 200;
            if (!items.length && respondWith !== 'noData') {
                throw new Error('No input data received.');
            }
            // ================= NO DATA =================
            if (respondWith === 'noData') {
                responseBody = {};
            }
            // ================= FIRST ITEM =================
            else if (respondWith === 'firstItem') {
                responseBody = items[0]?.json ?? {};
            }
            // ================= ALL ITEMS =================
            else if (respondWith === 'allItems') {
                responseBody = items.map(i => i.json ?? {});
            }
            // ================= JSON =================
            else if (respondWith === 'json') {
                responseBody = this.getNodeParameter('responseBody', 0, {});
            }
            // ================= TEXT =================
            else if (respondWith === 'text') {
                const text = this.getNodeParameter('textBody', 0);
                await this.sendResponse({
                    body: text,
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    responseCode: 200,
                });
                return [[]];
            }
            // ================= BINARY =================
            else if (respondWith === 'binary') {
                const property = this.getNodeParameter('binaryProperty', 0);
                const binaryData = items[0]?.binary?.[property];
                if (!binaryData) {
                    throw new Error(`Binary property "${property}" not found.`);
                }
                await this.sendResponse({
                    binary: {
                        [property]: binaryData,
                    },
                    responseCode: 200,
                });
                return [[]];
            }
            // ================= REDIRECT =================
            else if (respondWith === 'redirect') {
                const url = this.getNodeParameter('redirectUrl', 0);
                await this.sendResponse({
                    headers: {
                        Location: url,
                    },
                    responseCode: 302,
                });
                return [[]];
            }
            // ================= JWT =================
            else if (respondWith === 'jwt') {
                const payload = this.getNodeParameter('jwtPayload', 0);
                const credentials = await this.getCredentials('jwtAuth');
                const secret = credentials.secret;
                const algorithm = credentials.algorithm || 'HS256';
                const token = jsonwebtoken_1.default.sign(payload, secret, { algorithm });
                responseBody = { token };
            }
            // ================= SEND RESPONSE =================
            await this.sendResponse({
                body: responseBody,
                responseCode,
            });
            return [[]];
        }
        catch (error) {
            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
        }
    }
}
exports.CallerDeskRespond = CallerDeskRespond;
