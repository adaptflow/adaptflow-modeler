export const AF_URLS = {
    getUserDetailsUrl() {
        return '/api/auth/me';
    },
    getLoginUrl() {
        return '/api/auth/login';
    },
    getLogoutUrl() {
        return '/api/auth/logout';
    },
    getAllCredentialsUrl() {
        return '/api/credentials';
    },
    getAllProcessDefinitionsUrl() {
        return '/api/process';
    },
    getProcessDefinitionByIdUrl(processId: string) {
        return '/api/process/' + processId;
    },
    getProcessDefinitionSaveUrl() {
        return '/api/process/save';
    }
}