export class ChatMessageDto {
    command: string
    room_id: number
    message: string
    sender: number
    media: []
    constructor(data: any) {
        this.command = data.command;
        this.room_id = data.room_id;
        this.message = data.message;
        this.sender = data.sender;
        this.media = data.media;
    }
}