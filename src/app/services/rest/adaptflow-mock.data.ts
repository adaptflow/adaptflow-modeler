export const LLM_PROVIDER = {
    "name": "LLM Provider",
    "category": "af.llm",
    "type": "adaptflow.LLMProvider",
    "fields": [
        {
            "fieldId": "000001",
            "type": "input",
            "label": "Name",
            "value": "LLM Provider"
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
    "type": "adaptflow.GenerateEmbeddings",
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
    "type": "adaptflow.StoreEmbeddings",
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

export const PROCESS_DEFINITION = {
    bpmnXml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:adaptflow="http://adaptflow.org/schema/1.0/bpmn" xmlns:activiti="http://activiti.org/bpmn" id="Definitions_1742974848998" targetNamespace="http://adaptflow.io/schema/bpmn" exporter="AdaptFlow Modeler">
  <bpmn:process id="Process_1" name="My Process">
    <bpmn:startEvent id="af-8e360c1a-197a-45f3-bd6b-2b2c08043523" name="Start">
      <bpmn:outgoing>af-92d2e902-01b4-4298-82b5-67332dd38fdc</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="af-935f59d1-7e44-4c98-b9b8-51e86e97e490" name="End">
      <bpmn:incoming>af-a2255443-cab2-4f11-adee-21236435867c</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="af-66253cef-2cbe-48a4-ba07-bba2875c6c00" name="LLM Provider" activiti:class="com.adaptflow.af_serverj.features.llm.LLMProviderDelegate">
      <bpmn:extensionElements>
        <adaptflow:taskDefinition type="adaptflow.LLMProvider" />
        <activiti:field name="credentialId">
          <activiti:string>&lt;![CDATA[openai-key-id]]&gt;</activiti:string>
        </activiti:field>
      </bpmn:extensionElements>
      <bpmn:incoming>af-92d2e902-01b4-4298-82b5-67332dd38fdc</bpmn:incoming>
      <bpmn:outgoing>af-a2255443-cab2-4f11-adee-21236435867c</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="af-92d2e902-01b4-4298-82b5-67332dd38fdc" sourceRef="af-8e360c1a-197a-45f3-bd6b-2b2c08043523" targetRef="af-66253cef-2cbe-48a4-ba07-bba2875c6c00" />
    <bpmn:sequenceFlow id="af-a2255443-cab2-4f11-adee-21236435867c" sourceRef="af-66253cef-2cbe-48a4-ba07-bba2875c6c00" targetRef="af-935f59d1-7e44-4c98-b9b8-51e86e97e490" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="BPMNShape_af-8e360c1a-197a-45f3-bd6b-2b2c08043523" bpmnElement="af-8e360c1a-197a-45f3-bd6b-2b2c08043523">
        <dc:Bounds x="20" y="367" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_af-935f59d1-7e44-4c98-b9b8-51e86e97e490" bpmnElement="af-935f59d1-7e44-4c98-b9b8-51e86e97e490">
        <dc:Bounds x="1192" y="367" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_af-66253cef-2cbe-48a4-ba07-bba2875c6c00" bpmnElement="af-66253cef-2cbe-48a4-ba07-bba2875c6c00">
        <dc:Bounds x="561" y="68" width="150" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_af-92d2e902-01b4-4298-82b5-67332dd38fdc" bpmnElement="af-92d2e902-01b4-4298-82b5-67332dd38fdc">
        <di:waypoint x="70" y="392" />
        <di:waypoint x="561" y="93" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_af-a2255443-cab2-4f11-adee-21236435867c" bpmnElement="af-a2255443-cab2-4f11-adee-21236435867c">
        <di:waypoint x="711" y="93" />
        <di:waypoint x="1192" y="392" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`,
    fields: {
        "af-66253cef-2cbe-48a4-ba07-bba2875c6c00": {
            "name": "LLM Provider",
            "category": "af.llm",
            "type": "adaptflow.LLMProvider",
            "fields": [
                {
                    "fieldId": "000001",
                    "type": "input",
                    "label": "Name",
                    "value": "LLM Provider"
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
                    "value": {
                        type: 'af.credential',
                        name: 'embeddings-openai'
                    }
                }
            ]
        }
    },
    generalProperties: [
        {
            id: 'processName',
            name: 'Process Name',
            type: 'text',
            required: true,
            minLength: 3,
            value: 'Sample RAG',
        }
    ]
}