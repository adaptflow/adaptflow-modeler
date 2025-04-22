export interface GeneralProperty {
    id: string;
    name: string;
    type: 'text' | 'radio' | 'select';
    options?: string[]; // For radio and select types
    value?: any; // Initial value
    required?: boolean;
}