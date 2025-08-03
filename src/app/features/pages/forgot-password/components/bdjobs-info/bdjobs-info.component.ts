import { Component, Input } from '@angular/core';
import { BdjobsInfo } from '../../../../../shared/interfaces/forgot-password.interface';

@Component({
  selector: 'app-bdjobs-info',
  standalone: true,
  imports: [],
  templateUrl: './bdjobs-info.component.html',
  styleUrl: './bdjobs-info.component.scss'
})
export class BdjobsInfoComponent {
  @Input() bdjobsInfo:BdjobsInfo = {title: "", content: []}
}
