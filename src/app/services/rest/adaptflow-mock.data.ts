export const LLM_PROVIDER = {
    "name": "LLM Provider",
    "category": "af.llm",
    "type": "af.llm.provider",
    "fields": [
        {
            "fieldId": "000001",
            "type": "input",
            "label": "Name",
            "value": "LLM Provider"
        },
        {
            "fieldId": "000002",
            "type": "selection",
            "label": "Provider",
            "options": [
                {
                    type: 'af.llm.openai',
                    name: 'Open AI'
                },
                {
                    type: 'af.llm.ollama',
                    name: 'Ollama'
                }
            ],
            "value": ""
        },
        {
            "fieldId": "000003",
            "type": "selection",
            "label": "Credentials",
            "options": [
                {
                    type: 'af.credential',
                    name: 'embeddings-openai'
                }
            ],
            "value": ""
        }
    ]
}

export const GENERATE_EMBEDDINGS = {
    "name": "Generate Embeddings",
    "category": "af.embeddings",
    "type": "af.embeddings.generate",
    "fields": [
        {
            "fieldId": "000001",
            "type": "input",
            "label": "Name",
            "value": "Generate Embeddings"
        },
        {
            "fieldId": "000002",
            "type": "selection",
            "label": "Provider",
            "options": [
                {
                    type: 'af.embeddings.openai',
                    name: 'Open AI'
                },
                {
                    type: 'af.embeddings.ollama',
                    name: 'Ollama'
                }
            ],
            "value": ""
        },
        {
            "fieldId": "000003",
            "type": "selection",
            "label": "Credentials",
            "options": [
                {
                    type: 'af.credential',
                    name: 'embeddings-openai'
                }
            ],
            "value": ""
        }
    ]
}

export const STORE_EMBEDDINGS = {
    "name": "Store Embeddings",
    "category": "af.embeddings",
    "type": "af.embeddings.store",
    "fields": [
        {
            "fieldId": "000001",
            "type": "input",
            "label": "Name",
            "value": "Store Embeddings"
        },
        {
            "fieldId": "000002",
            "type": "selection",
            "label": "Provider",
            "options": [
                {
                    type: 'af.embeddings.openai',
                    name: 'Open AI'
                },
                {
                    type: 'af.embeddings.ollama',
                    name: 'Ollama'
                }
            ],
            "value": ""
        },
        {
            "fieldId": "000003",
            "type": "selection",
            "label": "Credentials",
            "options": [
                {
                    type: 'af.credential',
                    name: 'embeddings-openai'
                }
            ],
            "value": ""
        }
    ]
}

export const CREDENTIAL_PROVIDERS = [
    {
        name: 'Open AI',
        id: '00001',
        services: [
            {
                name: 'Chat',
                type: 'af.llm'
            },
            {
                name: 'Embeddings',
                type: 'af.embedding'
            },
            {
                name: 'Vector Store',
                type: 'af.vector'
            }
        ]
    },
    {
        name: 'Azure',
        id: '00002',
        services: [
            {
                name: 'Chat',
                type: 'af.llm'
            },
            {
                name: 'Embeddings',
                type: 'af.embedding'
            }
        ]
    },
    {
        name: 'Ollama',
        id: '00003',
        services: [
            {
                name: 'Chat',
                type: 'af.llm'
            },
            {
                name: 'Embeddings',
                type: 'af.embedding'
            }
        ]
    }
]

export const GET_ALL_CREDENTIALS = [
    {
        name: 'Open AI Key',
        id: 'abcd',
        provider: {
            name: 'OpenAI',
            id: '00001'
        },
        services: [
            {
                name: 'Chat',
                type: 'af.llm'
            },
            {
                name: 'Embeddings',
                type: 'af.embedding'
            }
        ],
        apiKey: '***********'
    }
];