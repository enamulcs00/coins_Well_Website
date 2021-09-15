import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Notify } from 'notiflix';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
	selector: 'app-chat-icon',
	templateUrl: './chat-icon.component.html',
	styleUrls: ['./chat-icon.component.scss']
})
export class ChatIconComponent implements OnInit, AfterViewInit {
	hideChatBox: boolean = false;
	onMessageIns: any;
	message: string = '';
	@ViewChild('scrollable') scrollable: NgScrollbar;
	constructor(private _message: MessagesService) { }
	ngOnInit(): void {
		this._message.openWebSocket();
		this.onRecieveMessage();
	}

	ngAfterViewInit() {
		this.scrollable.scrollTo({ bottom: 0 });
	}

	sendMessage() {
		if (this.message != '' && this.message != null) {
			this._message.sendMessage({
				command: "string",
				room_id: 500,
				message: 'string',
				sender: 4512,
				media: []
			})
		} else {
			Notify.failure("Please enter message.");
		}
	}

	onRecieveMessage() {
		this.onMessageIns = this._message
	}

	showChat() {
		this.hideChatBox = !this.hideChatBox;
		setTimeout(() => {
			this.scrollable.scrollTo({ bottom: 0 });
		}, 200);
	}

}
