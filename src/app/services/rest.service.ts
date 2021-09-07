import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = "http://localhost:8000/";

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
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
