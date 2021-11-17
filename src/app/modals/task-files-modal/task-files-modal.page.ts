import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-task-files-modal',
  templateUrl: './task-files-modal.page.html',
  styleUrls: ['./task-files-modal.page.scss'],
})
export class TaskFilesModalPage implements OnInit {
  @Input() id_task;
  files = [];
  selectedFile: File = null;
  imgPreview = null;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private restService : RestService,
    private sanitizer: DomSanitizer,
    private httpClient_d: HttpClient,
    private handler : HttpBackend,
    private platform : Platform,
  ) { 
     this.platform.ready().then(()=>{
        this.httpClient_d = new HttpClient(this.handler);
      });
  }

  ngOnInit() {
    this.load_files();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  load_files(){
    this.restService.get_method(`task/${this.id_task}`,'').subscribe(result =>{
      this.files = result.data.files;
    });
  }

  async delete_file(id){
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: 'Está a punto de eliminar el archivo',
      message: '¿Continuar?',
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (i) => {}
        }, 
        {
          text: 'OK',
          handler: () => {
            console.log(id);
            this.restService.delete_method(`file/${id}`,'').subscribe(result =>{
              this.restService.display_toast('Correcto','success','Eliminado correctamente','bottom',4000);
              this.load_files();
            });  
          }
        }
      ]
    });
    await alert.present();
  }

  removeImg(){
    this.imgPreview = null;
    this.selectedFile = null;
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgPreview = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  onUpload(){
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('task',this.id_task);
    this.post_method_files('http://127.0.0.1:8000/file',formData).subscribe(result =>{
      this.load_files();
      this.removeImg();
    });

  }

  post_method_files(_uri : string, data : any,): Observable<any>{
     const token =  localStorage.getItem('token');  
      const options = {
          headers: {
              'Authorization': `token ${token}`,
          }
      };
     return this.httpClient_d.post<any>(_uri,data,options);
   }

}
