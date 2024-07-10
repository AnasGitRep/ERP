import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/services/AuthServices.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  username: string | null = null;
  imageUrl: string | null = null;
  IsUser:boolean
  IsAdmin:boolean

  showFiller = false;

  constructor(public dialog: MatDialog, private Authservice:AuthServicesService) {}
  ngOnInit(): void {
    if(this.Authservice.hasRole('Admin')){
      this.IsAdmin=true
    }
    if(this.Authservice.hasRole('User')){
      this.IsUser=true
    }

      this.imageUrl=this.Authservice.getUserUri()
      this.username=this.Authservice.getUserName()
  }

  Logout(){
    this.Authservice.LogOut()
  }
}
