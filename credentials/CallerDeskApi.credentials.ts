import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CallerDeskApi implements ICredentialType {

	name = 'callerDeskApi';
	displayName = 'CallerDesk API';
	documentationUrl = 'https://app.callerdesk.io';

	properties: INodeProperties[] = [
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

	// ✅ ADDED: tells n8n how to inject the auth code into every request
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				authcode: '={{$credentials.authCode}}',
			},
		},
	};

	// ✅ ADDED: required credential test — uses the user-supplied baseUrl
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/extension/list',
		},
	};
}