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
                placeholder: '286dff4b98f8b5054f95d860329553e7',
                description: 'Your CallerDesk API authentication code',
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
