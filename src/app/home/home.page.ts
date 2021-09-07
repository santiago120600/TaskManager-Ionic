import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private restService : RestService,
  ) {}

 ngOnInit() {
    this.restService.get_method('task','').subscribe(result=>{
      console.log(result.data);
    });
  }

}
