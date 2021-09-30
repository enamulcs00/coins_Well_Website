import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { MessagesService } from 'src/app/_services/messages.service';
import { urls } from 'src/app/_services/urls';

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
	constructor(private _message: MessagesService, private _common: CommonService) { }
	ngOnInit(): void {
		// this._common.post(urls.send_message,
		// 	{
		// 		content: "hi tgstrg",
		// 		message_media: [],
		// 		recipient: "121"
		// 	}).subscribe(data => {
		// 		this._message.chatWithId = '1';
		// 		this._message.openWebSocket();
		// 		this.onRecieveMessage();

		// 		setTimeout(() => {
		// 			this._message.sendMessage({
		// 				name: "Hello"
		// 			})
		// 		}, 5000);
		// 	})
		// this._message.chatWithId = '1';
		// this._message.openWebSocket();
		// this.onRecieveMessage();

		// setTimeout(() => {
		// 	this._message.sendMessage({
		// 		name: "Hello"
		// 	})
		// }, 5000);
	}

	ngAfterViewInit() {
		// this.scrollable.scrollTo({ bottom: 0 });
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
