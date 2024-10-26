
export interface ElementInstance {
    type: string;
    name: string;
    category: string;
    fields: Array<Field>;
}

export interface Field {
    type: string;
    label: string;
    value: string;
    options?: Array<SelectionOption>; 
}

export interface SelectionOption {
    name: string;
    type: string;
}