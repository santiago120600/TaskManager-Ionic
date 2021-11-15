import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { RestService } from '../../services/rest.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';

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
  @ViewChild('inputfile', {read: ElementRef}) private inputfile: ElementRef;

  constructor(
    private modalController: ModalController,
    private restService : RestService,
    private sanitizer: DomSanitizer,
  ) { }

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

  removeImg(){
    this.imgPreview = null;
    this.selectedFile = null;
    this.inputfile.nativeElement.value = null;
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    //return this.sanitizer.bypassSecurityTrustHtml(oldURL);
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event:any) => {
      this.imgPreview = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    //let fileList: FileList = event.target.files;  
    //let file: File = fileList[0];
  }

  onUpload(){
    const formData:FormData = new FormData();
    formData.append('file',this.selectedFile,this.selectedFile.name);
    formData.append('task',this.id_task);
    //this.restService.post_method('file',{'file':formData.get('file'),'task':this.id_task}).subscribe(result =>{
      //this.load_files();
    //});
    //this.restService.post_method('file',formData).subscribe(result =>{
      //this.load_files();
    //});
  }

}
