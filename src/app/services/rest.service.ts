import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = "http://localhost:8000/";

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController : LoadingController,
  ) { }

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
    console.info(this.apiUrl);
    return this.http.post<any>(this.apiUrl+"login",_data).subscribe(result =>{
      loading.dismiss();
      if(result.status == "200"){
          //guardar sesion y token
          // redirigir a home
          this.display_toast('Success',"success",result.message,'top',4000);
      }else if(result.status=="401"){
          this.display_toast('Error',"danger",result.message,'top',4000);
      }else{
          this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      }
    },(err) => {
      console.info(err);
      this.display_toast('Error',"danger","Error de comunicación, intente más tarde",'top',4000);
      loading.dismiss();
    });
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

}
