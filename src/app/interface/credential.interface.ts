
export interface SelectedCredential {
    id?: string;
    name: string;
    services: Array<{
        name:string;
    }>;
    provider: {
        name: string;
        id: string;
    }
    apiKey: string;
}