"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallerDeskApi = void 0;
class CallerDeskApi {
    constructor() {
        this.name = 'callerDeskApi';
        this.displayName = 'CallerDesk API';
        this.documentationUrl = 'https://app.callerdesk.io';
        this.properties = [
            {
                displayName: 'Auth Code',
                name: 'authCode',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                placeholder: 'Enter your CallerDesk API auth code',
                description: 'Authentication code provided by CallerDesk',
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://app.callerdesk.io',
                required: true,
                placeholder: 'https://app.callerdesk.io',
                description: 'CallerDesk API base URL (do not include /api)',
            },
        ];
    }
}
exports.CallerDeskApi = CallerDeskApi;
