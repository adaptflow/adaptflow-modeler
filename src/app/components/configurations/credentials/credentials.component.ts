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
import { SelectedCredential } from '../../../interface/credential.interface';

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
  credentialProviders = [];

  allCredentials = [];
  selectedCredentials: SelectedCredential = {
    name: '',
    provider: null,
    services: [],
    apiKey: ''
  };

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private adaptflowRestService:AdaptflowService) {
    //   this.providers = [
    //       {name: 'Open AI'},
    //       {name: 'Azure'},
    //       {name: 'Ollama'},
    //   ];
    //   this.services = [
    //     {name: 'Chat'},
    //     {name: 'Embedding'}
    // ];
  }

  ngOnInit() {
    this.allCredentials = this.adaptflowRestService.getAllCredentials();
    this.credentialProviders = this.adaptflowRestService.getCredentialProviders();
    this.initializeForm();
  }

  initializeForm() {
    this.credentialForm = this.fb.group({});
    this.credentialForm.addControl(
      'name',
      this.fb.control(this.selectedCredentials.name)
    );
    this.credentialForm.addControl(
      'provider',
      this.fb.control(this.selectedCredentials.provider)
    );
    this.credentialForm.addControl(
      'services',
      this.fb.control(this.selectedCredentials.services)
    );
    this.credentialForm.addControl(
      'apiKey',
      this.fb.control(this.selectedCredentials.apiKey)
    );
    this.credentialForm.get('provider')?.valueChanges.subscribe(providerSelection => {
      const selectedProvider = this.credentialProviders.find(provider => provider.id === providerSelection.id);
      this.services = selectedProvider ? selectedProvider.services.map(service => ({ name: service.name, type: service.type })) : [];
      this.credentialForm.get('services')?.reset();
    });
  }

  getProviders() {
    return this.credentialProviders.map(provider => ({ name: provider.name, id: provider.id }));
  }

  // getServices() {
  //   return this.credentialProviders.map(provider => ({ name: provider.name, id: provider.id }));
  // }
  formattedServices(services) {
    if(services) {
      return services.map(service => service.name).join(', ');
    } else {
      return "";
    }
  }

  showDialog(resetData:boolean) {
    if(resetData) {
      this.selectedCredentials = {
        name: '',
        provider: null,
        services: [],
        apiKey: ''
      };
      this.services = [];
    }
    this.initializeForm();
    this.dialogVisible = true;
  }

  saveCredential() {
    this.parseCredentialFormToViewObject();
    if (this.selectedCredentials.id) {
      // Update existing credential
      const index = this.allCredentials.findIndex(c => c.id === this.selectedCredentials.id);
      this.allCredentials[index] = { ...this.selectedCredentials };
    } else {
      // Add new credential
      this.allCredentials.push({ ...this.selectedCredentials, id: Date.now() }); // Simple ID generation
    }
    this.dialogVisible = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Credentials saved' });
    this.resetCredential();
  }

  parseCredentialFormToViewObject() {
    // let formData = {};
    Object.keys(this.credentialForm.controls).forEach((key: string) => {
      this.selectedCredentials = {
        ...this.selectedCredentials,
        [key]: this.credentialForm.get(key).value
      };
      // formData[key] = this.credentialForm.get(key).value;
    });
    // formData['id'] = this.credential.id;
    // return formData;
  }

  editCredential(credential: any) {
    this.selectedCredentials = null;
    this.selectedCredentials = this.parseViewObjectToCredentialForm(credential);
    this.showDialog(false);
  }

  parseViewObjectToCredentialForm(credential: any) {
    this.selectedCredentials = this.allCredentials.find(credentialRow => credentialRow.id === credential.id);
    const provider = this.getProviders().find(provider => provider.id === this.selectedCredentials.provider.id);
    const selectedProvider = this.credentialProviders.find(provider => provider.id === this.selectedCredentials.provider.id);
    this.services = selectedProvider ? selectedProvider.services.map(service => ({ name: service.name, type: service.type })) : [];
    this.selectedCredentials['provider'] = provider;
    return  this.selectedCredentials;
  }

  deleteCredential(id: number) {
    this.allCredentials = this.allCredentials.filter(c => c.id !== id);
  }

  resetCredential() {
    this.selectedCredentials = null;
  }
}
