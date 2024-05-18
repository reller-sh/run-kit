import type { OASOutput, OASRequestParams } from 'fets';
import axios from 'axios';

import { pathReplacer } from '../utils/oas';

import type { OAS } from '../oas';

export const api = {
    permissions: {
        me: {
            get: async () => (await axios.get<OASOutput<OAS, '/permissions/me', 'get'>>('/permissions/me', {
                baseURL: 'http://77.232.131.46:8055'
            })).data
        },
        id: {
            get: async (args: OASRequestParams<OAS, '/permissions/{id}', 'get', false>) => (await axios.get<OASOutput<OAS, '/permissions/{id}', 'get'>>(pathReplacer('/permissions/{id}', args.params as Record<string, string>), {
                baseURL: 'http://77.232.131.46:8055',
                params: args.query
            })).data,
            patch: async (args: OASRequestParams<OAS, '/permissions/{id}', 'patch', false>) => (await axios.patch<OASOutput<OAS, '/permissions/{id}', 'patch'>>(pathReplacer('/permissions/{id}', args.params as Record<string, string>), {
                baseURL: 'http://77.232.131.46:8055',
                params: args.query,
                data: args.json
            })).data,
            delete: async (args: OASRequestParams<OAS, '/permissions/{id}', 'delete', false>) => (await axios.delete<OASOutput<OAS, '/permissions/{id}', 'delete'>>(pathReplacer('/permissions/{id}', args.params as Record<string, string>), {
                baseURL: 'http://77.232.131.46:8055'
            })).data
        },
        get: async (args: OASRequestParams<OAS, '/permissions', 'get', false>) => (await axios.get<OASOutput<OAS, '/permissions', 'get'>>('/permissions', {
            baseURL: 'http://77.232.131.46:8055',
            params: args.query
        })).data,
        post: async (args: OASRequestParams<OAS, '/permissions', 'post', false>) => (await axios.post<OASOutput<OAS, '/permissions', 'post'>>('/permissions', {
            baseURL: 'http://77.232.131.46:8055',
            params: args.query,
            data: args.json
        })).data,
        patch: async (args: OASRequestParams<OAS, '/permissions', 'patch', false>) => (await axios.patch<OASOutput<OAS, '/permissions', 'patch'>>('/permissions', {
            baseURL: 'http://77.232.131.46:8055',
            params: args.query,
            data: args.json
        })).data,
        delete: async () => (await axios.delete<OASOutput<OAS, '/permissions', 'delete'>>('/permissions', {
            baseURL: 'http://77.232.131.46:8055'
        })).data
    }
};
