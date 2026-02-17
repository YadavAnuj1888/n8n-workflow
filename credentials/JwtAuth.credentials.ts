import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class JwtAuth implements ICredentialType {

    name = 'jwtAuth';
    displayName = 'JWT Auth';

    documentationUrl = 'https://jwt.io';

    properties: INodeProperties[] = [

        {
            displayName: 'Secret',
            name: 'secret',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Secret key used to sign the JWT token',
        },

        {
            displayName: 'Algorithm',
            name: 'algorithm',
            type: 'options',
            options: [
                { name: 'HS256', value: 'HS256' },
                { name: 'HS384', value: 'HS384' },
                { name: 'HS512', value: 'HS512' },
            ],
            default: 'HS256',
            description: 'JWT signing algorithm',
        },

    ];
}
