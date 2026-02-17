"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuth = void 0;
class JwtAuth {
    constructor() {
        this.name = 'jwtAuth';
        this.displayName = 'JWT Auth';
        this.documentationUrl = 'https://jwt.io';
        this.properties = [
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
}
exports.JwtAuth = JwtAuth;
