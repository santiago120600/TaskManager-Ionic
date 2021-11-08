import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {BehaviorSubject} from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = "http://127.0.0.1:8000/";
  public authState =  new BehaviorSubject(false);
  private httpClientFiles: HttpClient;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController : LoadingController,
    private storage : Storage,
    private handler : HttpBackend,
    private platform : Platform,
    private modalController: ModalController,
  ) { 
    this.storage.create();
     this.platform.ready().then(()=>{
        this.isLoggedIn();
        this.httpClientFiles = new HttpClient(this.handler);
      });
  }

  post_method(_uri : string,_data : any){
    return this.http.post<any>(this.apiUrl+_uri,_data);
  }

  put_method(_uri : string, _data : any){
    return this.http.put<any>(this.apiUrl+_uri,_data);
  }

  get_method( _uri : string,_params : any){
    return this.http.get<any>(this.apiUrl+_uri,{params: _params});
  }

  delete_method( _uri : string,_params : any){
    return this.http.delete<any>(this.apiUrl+_uri,{params: _params});
  }

 async login(_data : any){
    const loading = await this.loadingController.create({
      message: 'Autenticando...'
    });
    await loading.present();
    return this.http.post<any>(this.apiUrl+"login",_data).subscribe(result =>{
      loading.dismiss();
      if(result.status == "200"){
          this.storage.set('session',result.data);
          localStorage.setItem('token',result.token);
          // redirigir a home
          this.authState.next(true);
          //this.display_toast('Success',"success",result.message,'top',4000);
      }else if(result.status=="401"){
          this.display_toast('Error',"danger",result.message,'top',4000);
      }else{
          this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      }
    },(err) => {
      this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      loading.dismiss();
    });
  }

  async register(_data : any){
    const loading = await this.loadingController.create({
      message: 'Verificando...'
    });
    await loading.present();
    return this.http.post<any>(this.apiUrl+"register",_data).subscribe(result =>{
      loading.dismiss();
      if(result.status == "201"){
          this.storage.set('session',result.data);
          localStorage.setItem('token',result.token);
          this.authState.next(true);
          this.modalController.dismiss({dismissed: true});
      }else if(result.status=="400"){
        console.log(result);
        if(result.validations.email && result.validations.email[0] == "Este campo debe ser único."){
          this.display_toast('Error',"warning","Este email ya existe",'top',4000);
        }else if(result.validations.username && result.validations.username[0] == "Ya existe un usuario con este nombre."){
          this.display_toast('Error',"warning","Este nombre de usuario ya fue tomado",'top',4000);
        }
      }else{
          this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      }
    },(err) => {
      this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      loading.dismiss();
    });
  }

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...'
    });
    await loading.present();
    await this.storage.remove('session');
    localStorage.removeItem('token');
    loading.dismiss();
    this.authState.next(false);
  }

  async display_toast(_title,_type,_message,_position,_duration){
    const toast = await this.toastController.create({
      header: _title,
      message: _message,
      position: _position,
      color : _type,
      duration:  _duration,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

 isLoggedIn(){
    this.storage.get('session').then((response) => {
      if(response){
        this.authState.next(true);
      }
    });
  }

 isAuthenticacated(){
    return this.authState.value;
  }

  authUserData(){
    return this.storage.get('session');
  }

}
