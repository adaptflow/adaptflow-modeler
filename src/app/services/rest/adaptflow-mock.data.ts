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
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://adaptflow.org/schema/1.0/bpmn" id="Definitions_1742840731168" targetNamespace="http://adaptflow.io/schema/bpmn" exporter="AdaptFlow Modeler">
  <bpmn:process id="Process_1" name="My Process">
    <bpmn:startEvent id="af-f17a07e3-f22f-4c99-8877-a7f6e783ab7b" name="Start">
      <bpmn:outgoing>af-d70088cf-efb7-4e33-8026-c2a1fdc78cd8</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="af-73680bd3-5ebd-4c95-8fa2-7f23dde8a195" name="End">
      <bpmn:incoming>af-b24fdb07-c560-45bc-b908-d3546a352b30</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="af-86e1e7aa-3773-45c7-9ce0-472b39109704" name="LLM Provider" activiti:class="com.adaptflow.af_serverj.features.llm.LLMProviderDelegate">
      <bpmn:extensionElements>
        <activiti:field name="credentialId">
          <activiti:string>&lt;![CDATA[openai-key-id]]&gt;</activiti:string>
        </activiti:field>
      </bpmn:extensionElements>
      <bpmn:incoming>af-d70088cf-efb7-4e33-8026-c2a1fdc78cd8</bpmn:incoming>
      <bpmn:outgoing>af-b24fdb07-c560-45bc-b908-d3546a352b30</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="af-d70088cf-efb7-4e33-8026-c2a1fdc78cd8" sourceRef="af-f17a07e3-f22f-4c99-8877-a7f6e783ab7b" targetRef="af-86e1e7aa-3773-45c7-9ce0-472b39109704" />
    <bpmn:sequenceFlow id="af-b24fdb07-c560-45bc-b908-d3546a352b30" sourceRef="af-86e1e7aa-3773-45c7-9ce0-472b39109704" targetRef="af-73680bd3-5ebd-4c95-8fa2-7f23dde8a195" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="BPMNShape_af-f17a07e3-f22f-4c99-8877-a7f6e783ab7b" bpmnElement="af-f17a07e3-f22f-4c99-8877-a7f6e783ab7b">
        <dc:Bounds x="20" y="367" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_af-73680bd3-5ebd-4c95-8fa2-7f23dde8a195" bpmnElement="af-73680bd3-5ebd-4c95-8fa2-7f23dde8a195">
        <dc:Bounds x="937" y="367" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_af-86e1e7aa-3773-45c7-9ce0-472b39109704" bpmnElement="af-86e1e7aa-3773-45c7-9ce0-472b39109704">
        <dc:Bounds x="436.47499084472656" y="331.4000015258789" width="150" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_af-d70088cf-efb7-4e33-8026-c2a1fdc78cd8" bpmnElement="af-d70088cf-efb7-4e33-8026-c2a1fdc78cd8">
        <di:waypoint x="70" y="392" />
        <di:waypoint x="436.47499084472656" y="356.4000015258789" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_af-b24fdb07-c560-45bc-b908-d3546a352b30" bpmnElement="af-b24fdb07-c560-45bc-b908-d3546a352b30">
        <di:waypoint x="586.4749908447266" y="356.4000015258789" />
        <di:waypoint x="937" y="392" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
}