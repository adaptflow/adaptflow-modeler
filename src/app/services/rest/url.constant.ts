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
    getProcessDefinitionUrl(processId: string) {
        return '/api/process/' + processId;
    },
    getFieldListByProcessIdUrl(processId: string) {
        return '/api/process/fields' + processId;
    }
}