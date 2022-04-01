import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { MessageInfo, NebularChat } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit {
  socket: Socket;
  messages: NebularChat[] = [];
  currentUser: User;
  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { 
   this.currentUser = this.userService.getUser();
  }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.getMessagesAPICall();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: MessageInfo) => {
      if (data) {
        this.setMessageInView(data.user.name, data.messageContent, false);
      }
    });
  }

  sendMessage(event: any) {
    const messageInfo: MessageInfo = { user: this.currentUser, messageContent: event.message };
    this.socket.emit('message', messageInfo);
    this.setMessageInView(this.currentUser.name, event.message, true);
  }

  getMessagesAPICall() {
    this.messageService.getAllMessages().subscribe(result => {
      result.data.map(message => {
        const reply = this.currentUser.id == message.user.id ? true : false;
        this.setMessageInView(message.user.name, message.messageContent, reply);
      })
    })
  }

  setMessageInView(userName: string, message: string, reply: boolean) {
    this.messages.push({
      text: message,
      type: 'text',
      reply: reply,
      user: {
        name: userName
      },
    });
  }
}
