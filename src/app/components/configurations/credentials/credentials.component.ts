import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdaptflowService } from '../../../services/rest/adaptflow.service';

@Component({
  selector: 'credentials',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule, InputTextModule, MultiSelectModule, FormsModule, PasswordModule, DropdownModule, TableModule, ToastModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss'
})
export class CredentialsComponent implements OnInit {
  dialogVisible = false;
  credentialForm: FormGroup;

  providers = [];
  services = [];

  credentials = [];
  credential: any;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private adaptflowRestService:AdaptflowService) {
      this.providers = [
          {name: 'Open AI'},
          {name: 'Azure'},
          {name: 'Ollama'},
      ];
      this.services = [
        {name: 'Chat'},
        {name: 'Embedding'}
    ];
  }

  ngOnInit() {
    this.getCredentials()
    this.credentialForm = this.fb.group({});
    this.credentialForm.addControl(
      'name',
      this.fb.control('')
    );
    this.credentialForm.addControl(
      'provider',
      this.fb.control('')
    );
    this.credentialForm.addControl(
      'services',
      this.fb.control('')
    );
    this.credentialForm.addControl(
      'apiKey',
      this.fb.control('')
    );
  }

  getCredentials() {
    this.credentials = [
      {
        name: 'Open AI Key',
        provider: {
          name: 'OpenAI'
        },
        services: [
          {
            name: 'Embedding'
          },
          {
            name: 'Chat'
          }
        ]
      }
    ];
  }

  getServices(services) {
    if(services) {
      return services.map(service => service.name).join(', ');
    } else {
      return "";
    }
  }

  showDialog() {
    this.dialogVisible = true;
  }

  saveCredential() {
    this.credential = this.parseCredentialForm();
    if (this.credential.id) {
      // Update existing credential
      const index = this.credentials.findIndex(c => c.id === this.credential.id);
      this.credentials[index] = { ...this.credential };
    } else {
      // Add new credential
      this.credentials.push({ ...this.credential, id: Date.now() }); // Simple ID generation
    }
    this.dialogVisible = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Credentials saved' });
    this.resetCredential();
  }

  parseCredentialForm() {
    let formData = {};
    Object.keys(this.credentialForm.controls).forEach((key: string) => {
      formData[key] = this.credentialForm.get(key).value;
    });
    return formData;
  }

  editCredential(credential: any) {
    this.credential = { ...credential };
    this.dialogVisible = true;
  }

  deleteCredential(id: number) {
    this.credentials = this.credentials.filter(c => c.id !== id);
  }

  resetCredential() {
    this.credential = {};
  }
}
