export const constants = {
    outFile: './out/api.ts',
    requestsLibrary: {
        name: 'axios',
        configKeys: {
            url: 'baseURL',
            queryParams: 'params',
            body: 'data',
        }
    },
    fetchTsLibrary: {
        name: 'fets',
        importNames: {
            response: 'OASOutput',
            params: 'OASRequestParams'
        }
    },
    oasType: {
        path: '../oas',
        name: 'OAS'
    },
    localStruct: {
        modulePaths: {
            utils: '../utils/oas',
        },
    },
    cgNames: {
        inputParamName: 'args',
        inputParamKeys: {
            path: 'params',
            query: 'query',
            body: 'json',
        },
        pathReplacer: 'pathReplacer'
    },
    api: {
        baseUrl: 'http://77.232.131.46:8055'
    }
}
