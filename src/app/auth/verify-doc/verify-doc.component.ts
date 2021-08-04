import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Block, Notify } from 'notiflix';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { loadImage } from 'src/app/_helpers/common.helper';
@Component({
	selector: 'app-verify-doc',
	templateUrl: './verify-doc.component.html',
	styleUrls: ['./verify-doc.component.scss']
})
export class VerifyDocComponent implements OnInit {
	profileForm: any;
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

	constructor(private _router: Router, private _common: CommonService) {
		if (this._router.getCurrentNavigation().extras.state && typeof this._router.getCurrentNavigation().extras.state.profileForm != "undefined") {
			this.profileForm = this._router.getCurrentNavigation().extras.state.profileForm;
			console.log('this.profileForm', this.profileForm);
		} else {
			this._router.navigate(['/auth/signup']);
		}
	}

	ngOnInit(): void {

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
		let document = this.documents.find(x => x.image == null);
		if (document != undefined) {
			Notify.failure('Please upload ' + document.title)
		} else {
			this.uploadDocuments();
		}
	}

	uploadDocuments() {
		Block.circle('#verifyDocument-button');
		forkJoin(this.documents.map(document => {
			const formData: FormData = new FormData();
			formData.append('media', document.image, document.image.name);
			return this._common.uploadMedia(formData);
		})).subscribe(imagesUpload => {
			const images = [];
			imagesUpload.forEach(image => {
				images.push({
					document: image.data[0]['id']
				});
			})
			Block.remove('#verifyDocument-button');
			this._router.navigate(['/auth/transtionpin'], {
				state: {
					profileForm: {
						...this.profileForm,
						"user_documents": images
					},
				}
			});
		})
	}

	skipIt() {
		this._router.navigate(['/auth/transtionpin'], {
			state: {
				profileForm: {
					...this.profileForm,
					"user_documents": []
				},
			}
		});
	}

}
