import { Component } from '@angular/core';
import { YoutubeDlService } from './youtube-dl.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'youtube-dl',
    templateUrl: './youtube-dl.component.html',
    providers: [ YoutubeDlService, ]
})

export class YoutubeDlComponent {

    public myForm: FormGroup;

    constructor(private service: YoutubeDlService, private router: Router) {
        let group: any = {};
        group.youtube_url = new FormControl('', Validators.required);
        this.myForm = new FormGroup(group);
    }

    public keyDownFunction(event) {
      if (event.keyCode == 13)
      {
          this.downloadYoutubeUrl();
      }
    }

    public downloadYoutubeUrl() {
        let body = JSON.stringify({
            url: this.myForm.controls['youtube_url'].value,
        });
        console.log('youtube-dl.component url:', this.myForm.controls['youtube_url'].value);
        this.service.downloadYoutubeUrl(body).subscribe((data) => {
            this.router.navigate(['/'])
        });
    }
}
