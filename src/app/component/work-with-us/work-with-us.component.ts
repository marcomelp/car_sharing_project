import { Component} from '@angular/core';

@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrls: ['./work-with-us.component.css']
})
export class WorkWithUsComponent
{
  scrollToCandidatura(valore:string): void {
    // Scorri verso la sezione "modulo-candidatura"
    const element = document.getElementById('modulo-candidatura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); 
      const selectElement = document.getElementById('posizione') as HTMLSelectElement;
        if (selectElement) {
            selectElement.value = valore;
        }
    }
  }
  
}
