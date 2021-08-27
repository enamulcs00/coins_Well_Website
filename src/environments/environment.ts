// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseUrl: 'https://python.appgrowthcompany.com/api/',
	storageKey: 'coinswellUserInfo',
	dateFormatWithTime: 'MM-DD-YYYY hh:mm A',
	dateFormat: 'MM-DD-YYYY',
	resetPasswordLink: 'http://localhost:4200/resetpassword',
	homeURL: 'https://python.appgrowthcompany.com',
	allowedCountries :  ['ng', 'in'],
	googleSiteKey : '6LdkAPMbAAAAAJgHIVZUJOyVD-9hv9HBmcnx7aSx',
	googleServerKey : '6LdkAPMbAAAAAAiV3gCP-C5mbms2t2ojUJFqTpA8',
	firebaseConfig: {
		apiKey: "AIzaSyBL191NHbgrsavLmZjGDdiCg94hMN_YjDE",
		authDomain: "coinswell.firebaseapp.com",
		projectId: "coinswell",
		storageBucket: "coinswell.appspot.com",
		messagingSenderId: "865125792184",
		appId: "1:865125792184:web:d4960bdf4521823c15b74d",
		measurementId: "G-MW1VK0SK0D"
	},
	bitGoUrl : 'https://coinswell-test.zendesk.com/api/v2/',
	bitGoToken : 'v2xe019559d6b8aedcf28852f190c902e4845da3ee9b2a14606a51267c23cf6243b',
	zendDeskPassword : '&wnudyhY6+5uzLp',
	zendDeskToken : 'kdAToAVlrX4tOgxPO12xgIItTokNL9jevW8uW0Sr',
	zenDeskSec : '44d2254f85385284a4f247401bfd960694f4ce5db35e37301dc0af8fa7b7b938',
	bitGoCurrencies : {
		bitcoin : 1,
		ERC20 : 2,
		TRC20 : 3,
		PerfectMoney : 4
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
