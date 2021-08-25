import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, Loading, Notify } from 'notiflix';
import { forkJoin } from 'rxjs';
import { loadImage } from 'src/app/_helpers/common.helper';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';


@Component({
	selector: 'app-account-upgrade',
	templateUrl: './account-upgrade.component.html',
	styleUrls: ['./account-upgrade.component.scss']
})
export class AccountUpgradeComponent implements OnInit {
	previousDocuments: any;
	public trigger: Subject<void> = new Subject<void>();
	facialVerificationImage: any;
	facialVerificationImageUrl: any;
	facial_verification : any;
	documents: any[] = [
		{
			type: 'driving',
			title: 'Driving License',
			image: null,
			base64: null
		}
	];
	selfieType: string = 'img';
	userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
	facialUrl: any;
	otherDocument: any;
	document_verification: any;
	constructor(private _router: Router, private _common: CommonService) { }

	ngOnInit(): void {
		this.getDocuments();
	}

	previewVerification(files) {
		this.selfieType = 'img';

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

	public handleInitError(error: WebcamInitError): void {
		if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
			Notify.failure("Camera access was not allowed by user!");
		} else {
			Notify.failure("Camera not found.");
		}
		this.selfieType = 'img';
	}

	getCamera() {
		this.selfieType = 'video';
	}

	takeSnapshot() {
		this.trigger.next();
	}

	goToNext() {
		if (this.previousDocuments != null && this.previousDocuments.length > 0) {
			Block.circle('#submit-documents');
			this.uploadDocuments();
		}
		else {
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
	}

	async handleImage(webcamImage: WebcamImage) {
		this.facialVerificationImageUrl = webcamImage.imageAsDataUrl;
		const base64 = await fetch(this.facialVerificationImageUrl);
		this.facialVerificationImage = await base64.blob();
		this.selfieType = 'img';
	}

	uploadDocuments() {
		Block.circle('#submit-documents');
		
		// this._common.put(urls.updateDocuments, {
		// 	user_documents: [
		// 		{
		// 			document: this.facialUrl.document.id,
		// 			document_type: 1
		// 		},
		// 		{
		// 			document: this.otherDocument.document.id,
		// 			document_type: 2
		// 		}
		// 	]
		// }).subscribe(data => {
		// 	Block.remove('#submit-documents');
		// 	Notify.success("Facial Verification request submitted successfully.");
		// 	this._router.navigate(['/dashboard']);
		// });
		
		let uploads = {
		};

		if(this.facialVerificationImage != null || this.documents[0]['image'] != null) {
			if(this.facialVerificationImage != null) {
				const formData: FormData = new FormData();
				formData.append('media', this.facialVerificationImage, this.facialVerificationImage.name);
				uploads['facialVerification'] = this._common.uploadMedia(formData);
			}
	
			if(this.documents[0]['image'] != null) {
				uploads['documents'] = forkJoin(this.documents.filter(x => (x.image != null)).map(document => {
					const formData: FormData = new FormData();
					formData.append('media', document.image, document.image.name);
					return this._common.uploadMedia(formData);
				}));
			}

			forkJoin(uploads).subscribe((imagesUpload : any) => {
				const images = [];
				if(typeof imagesUpload.documents != "undefined") {
					imagesUpload.documents.forEach(image => {
						images.push({
							document: image.data[0]['id']
						});
					});
				} else {
					images.push({
						document: this.otherDocument.document.id
					});
				}
				let facial;
				if(typeof imagesUpload.facialVerification != "undefined") {
					facial = imagesUpload.facialVerification.data[0]['id'];
				} else {
					facial = this.facialUrl.document.id;
				}
				this.submitFacialRequest(
					{
						user_documents: [
							{
								document: facial,
								document_type: 1
							},
							{
								document: images[0]['document'],
								document_type: 2
							}
						]
					}
				)
			})
		} else {
			this.submitFacialRequest(
				{
					user_documents: [
						{
							document: this.facialUrl.document.id,
							document_type: 1
						},
						{
							document: this.otherDocument.document.id,
							document_type: 2
						}
					]
				}
			)
		}
	}

	submitFacialRequest(formData: any) {
		this._common.put(urls.facialVerification, formData).subscribe(data => {
			Block.remove('#submit-documents');
			Notify.success("Facial Verification request submitted successfully.");
			this._router.navigate(['/dashboard']);
		});
	}

	getDocuments() {
		Loading.circle();
		this._common.get(urls.getDocuments).subscribe(data => {
			Loading.remove();
			this.facial_verification = data.data.facial_verification;
			this.document_verification = data.data.document_verification;
			this.previousDocuments = data.data.documents;
			this.facialUrl = data.data.documents.find(x => x.document_type == 1);
			if (this.facialUrl) {
				this.facialVerificationImageUrl = environment.homeURL + this.facialUrl.document.media_file;
			}

			this.otherDocument = data.data.documents.find(x => x.document_type == 2);
			if (this.otherDocument) {
				this.documents[0]['base64'] = environment.homeURL + this.otherDocument.document.media_file;
			}
		}, () => {
			Loading.remove();
		})
	}

}
