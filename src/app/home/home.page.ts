import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  session;

  notesList = [];

  today : number = Date.now();

  constructor(
    private restService : RestService,
  ) {
   this.restService.authUserData().then(result=>{
        this.session = result;
    });

    this.load_notes();
  }

 ngOnInit() {
  }

  close_sess(){
      this.restService.logout();
  }

  async load_notes(){
    var user = await this.restService.authUserData();
    this.restService.get_method(`task?user_id=${user['id_user']}`,'').subscribe(result =>{
      this.notesList = result.data;
    });
  }

}
