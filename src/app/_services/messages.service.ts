import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from 'src/app/_model/chatMessagesDto';
@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    chatMessages: Subject<any> = new Subject();
    websocket: WebSocket;
    chatId: Subject<boolean> = new Subject();
    chatWithId: any;

    constructor() {
        this.chatId.subscribe(chat_id => {
            this.chatWithId = chat_id;
        })
    }

    public openWebSocket() {
        if (this.chatWithId == undefined || this.chatWithId == null) {
            return false;
        }
        this.websocket = new WebSocket(environment.socketUrl + this.chatWithId + '/');

        this.websocket.onopen = (event) => {
            // console.log('open', event);
        }

        this.websocket.onmessage = (event) => {
            const chatMessageDto = JSON.parse(event.data);
            this.chatMessages.next(chatMessageDto);
        }

        this.websocket.onclose = (event) => {
            // console.log("Close", event);
        }
    }

    public sendMessage(chatMessageDto: ChatMessageDto) {
        this.websocket.send(JSON.stringify(chatMessageDto));
    }

    public closeWebSocket() {
        if (this.chatWithId == undefined || this.chatWithId == null) {
            return false;
        }
        this.websocket.close();
    }

}