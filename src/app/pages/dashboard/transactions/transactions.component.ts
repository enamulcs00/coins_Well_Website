import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Loading } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
	transactionList: any = [];
	baseUrl: string = environment.homeURL;
	length: number = 10;
	limit: number = 5;
	constructor(private _common: CommonService) { }

	ngOnInit(): void {
		this.getTransactions();
	}

	onPageChange(event) {
		this.getTransactions(event.pageIndex + 1);
	}

	getTransactions(page = 1) {
		Loading.circle();
		this._common.post(urls.getTransactions, {
			"length": this.limit,
			"start": ((page - 1) * this.limit) + 1,
			"filter_type": 3
		}).subscribe(data => {
			this.transactionList = data.data;
			this.length = data.recordsTotal;
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}

	// JSON to CSV Converter
	ConvertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ','

				line += array[i][index];
			}
			str += line + '\r\n';
		}
		return str;
	}

	downloadAll() {
		Loading.circle();
		this._common.get(urls.getTransactions).subscribe(data => {
			Loading.remove();
			let exportData  = [];
			exportData = data.data.map(item=> {
				return {
					'Transaction ID' : item?.id,
					'Name' : item.user,
					'Amount' : item?.amount,
					'Currency' : item?.currency?.name,
					'Transaction Status' : item?.transaction_status,
					'Transaction Type' : item?.type_of_transaction,
					'Date' : moment(item?.created_at).format('lll')
				}
			});
			exportData.unshift({
				'Transaction ID' : 'Transaction ID',
				'Name' : 'Name',
				'Amount' : 'Amount',
				'Currency' : 'Currency',
				'Transaction Status' : 'Transaction Status',
				'Transaction Type' : 'Transaction Type',
				'Date' :'Date'
			});
			new ngxCsv(exportData, 'Transactions');
			Loading.remove();
		}, _ => {
			Loading.remove();
		})
	}
}
