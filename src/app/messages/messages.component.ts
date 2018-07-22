import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // MessageService need to be public since it will be used in the template
  constructor(public messageService : MessageService) { }

  ngOnInit() {
  }

}
