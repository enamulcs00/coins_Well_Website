import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { forkJoin } from 'rxjs';
import { loadImage } from 'src/app/_helpers/common.helper';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

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
		}, {
			type: 'votor',
			title: 'Voter Card',
			image: null,
			base64: null
		},
		{
			type: 'passport',
			title: 'International Passport',
			image: null,
			base64: null
		},
		{
			type: 'national_id',
			title: 'National ID',
			image: null,
			base64: null
		}
	];
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
			this.submitFacialRequest({
				"user_facial_images": {
					"facial_image": facial
				},
				user_documents: images
			})
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
