import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  clear(): void {
    this.messageService.clear();
  }

}
