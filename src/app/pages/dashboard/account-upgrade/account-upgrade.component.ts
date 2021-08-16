import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { forkJoin } from 'rxjs';
import { loadImage } from 'src/app/_helpers/common.helper';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-account-upgrade',
	templateUrl: './account-upgrade.component.html',
	styleUrls: ['./account-upgrade.component.scss']
})
export class AccountUpgradeComponent implements OnInit {
	facialVerificationImage: any;
	facialVerificationImageUrl: any;
	documents: any[] = [
		{
			type: 'driving',
			title: 'Driving License',
			image: null,
			base64: null
		}
	];
	selfieType :  string = 'img';
	userInfo  =  JSON.parse(localStorage.getItem(environment.storageKey));
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
	}

	previewVerification(files) {
		if (files.length === 0)
			return;
		loadImage(files[0]).then(image => {
			this.facialVerificationImage = files[0]
			this.facialVerificationImageUrl = image;
		})
	}

	preview(files, index: string) {
		if (files.length === 0)
			return;
		loadImage(files[0]).then(image => {
			this.documents[index]['image'] = files[0]
			this.documents[index]['base64'] = image;
		})
	}

	getCamera() {
		let nav : any = navigator;
		var video : any = document.querySelector('video.camera_stream');
		nav.getUserMedia(
			// Options
			{
				video: true
			},
			// Success Callback
			(stream) => {
		
				// Create an object URL for the video stream and
				// set it as src of our HTLM video element.
				video.src = window.URL.createObjectURL(stream);
		
				// // Play the video element to show the stream to the user.
				video.play();
				this.selfieType = 'video';
			},
			// Error Callback
			(err) => {
		
				// Most common errors are PermissionDenied and DevicesNotFound.
				// console.error(err);
				Notify.failure("Unable to get camera.");
			}
		);
	}

	takeSnapshot(){
		var hidden_canvas = document.querySelector('canvas'),
		video : any = document.querySelector('video.camera_stream'),
		// image = document.querySelector('img.photo'),
			// Get the exact size of the video element.
			width = video.videoWidth,
			height = video.videoHeight,
	
			// Context object for working with the canvas.
			context = hidden_canvas.getContext('2d');
	
		// Set the canvas to the same dimensions as the video.
		hidden_canvas.width = width;
		hidden_canvas.height = height;
	
		// Draw a copy of the current frame from the video on the canvas.
		context.drawImage(video, 0, 0, width, height);
	
		// Get an image dataURL from the canvas.
		var imageDataURL = hidden_canvas.toDataURL('image/png');
	
		// Set the dataURL as source of an image element, showing the captured photo.
		this.facialVerificationImageUrl = imageDataURL;
		this.selfieType = 'img';
	
	}

	goToNext() {
		if (!this.facialVerificationImageUrl) {
			Notify.failure('Please upload your selfie first.');
			return false;
		}
		let document = this.documents.find(x => x.image != null);
		if (document != undefined) {
			this.uploadDocuments();
		} else {
			Notify.failure('At least one document is required.')
		}
	}

	uploadDocuments() {
		Block.circle('#submit-documents');
		const formData: FormData = new FormData();
		formData.append('media', this.facialVerificationImage, this.facialVerificationImage.name);
		// return this._common.uploadMedia(formData);
		forkJoin({
			facialVerification: this._common.uploadMedia(formData),
			documents: forkJoin(this.documents.filter(x => (x.image != null)).map(document => {
				const formData: FormData = new FormData();
				formData.append('media', document.image, document.image.name);
				return this._common.uploadMedia(formData);
			}))
		}).subscribe((imagesUpload) => {
			const images = [];
			imagesUpload.documents.forEach(image => {
				images.push({
					document: image.data[0]['id']
				});
			});
			let facial = imagesUpload.facialVerification.data[0]['id'];
			this.submitFacialRequest(
				{
					user_documents : [
						{
							document : facial,
							document_type : 1
						}, 
						{
							document :  images[0]['document'],
							document_type : 2
						}
					]
				}
			)
		})
	}

	submitFacialRequest(formData: any) {
		this._common.put(urls.facialVerification, formData).subscribe(data => {
			Block.remove('#submit-documents');
			Notify.success("Facial Verification request submitted successfully.");
			this._router.navigate(['/dashboard']);
		});
	}

}
