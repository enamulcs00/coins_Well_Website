(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{c6Id:function(t,e,n){"use strict";n.r(e),n.d(e,"DepositNgnModule",(function(){return L}));var a=n("SVse"),o=n("iInd"),r=n("8Y7J");let i=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Fb({type:t,selectors:[["app-deposit-ngn"]],decls:9,vars:0,consts:[[1,"wd-main"],[1,"wd-header","pb-20"],["routerLink","/dashboard/home/payment/withdrawal","routerLinkActive","active-cls"],["routerLink","/dashboard/home/payment/deposit","routerLinkActive","active-cls"],[1,"bt-body"]],template:function(t,e){1&t&&(r.Rb(0,"div",0),r.Rb(1,"div",1),r.Rb(2,"ul"),r.Rb(3,"li",2),r.Fc(4,"Withdraw"),r.Qb(),r.Rb(5,"li",3),r.Fc(6,"Deposit"),r.Qb(),r.Qb(),r.Qb(),r.Rb(7,"div",4),r.Mb(8,"router-outlet"),r.Qb(),r.Qb())},directives:[o.c,o.d,o.g],styles:[""]}),t})();var s=n("s7LF"),c=n("vZrp"),b=n("cp0P"),l=n("Z+m1"),u=n("AytR"),m=n("0xqo"),d=n("YWaA"),p=n("iELJ"),h=n("Q2Ze"),f=n("e6WT"),g=n("TT0I"),v=n("OC/Z");function k(t,e){1&t&&(r.Rb(0,"mat-error"),r.Fc(1," Please enter an amount. "),r.Qb())}function C(t,e){1&t&&(r.Rb(0,"mat-error"),r.Fc(1," Amount should be at least 0.01; "),r.Qb())}function _(t,e){1&t&&(r.Rb(0,"mat-error"),r.Fc(1," Please select a proof. "),r.Qb())}const y=function(){return{prefix:"\u20a6 "}};function R(t,e){1&t&&(r.Rb(0,"mat-error"),r.Fc(1," Please enter an amount. "),r.Qb())}function Q(t,e){1&t&&(r.Rb(0,"mat-error"),r.Fc(1," Amount should be at least 1; "),r.Qb())}const w=function(t){return[t]};function F(t,e){if(1&t){const t=r.Sb();r.Rb(0,"div",17),r.Rb(1,"div",18),r.Mb(2,"input",19),r.Qb(),r.Rb(3,"div",20),r.Rb(4,"div",21),r.Rb(5,"div",22),r.Mb(6,"input",23),r.Qb(),r.Rb(7,"p",24),r.Fc(8),r.Qb(),r.Rb(9,"div",25),r.Rb(10,"figure"),r.Mb(11,"img",26),r.Qb(),r.Fc(12),r.Qb(),r.Qb(),r.Rb(13,"div",27),r.Rb(14,"figure",28),r.Mb(15,"img",29),r.Qb(),r.Rb(16,"figure",30),r.Yb("click",(function(){r.uc(t);const n=e.index;return r.cc().deleteBank(n)})),r.Mb(17,"img",31),r.Qb(),r.Qb(),r.Qb(),r.Qb()}if(2&t){const t=e.$implicit,n=r.cc();r.zb(2),r.jc("value",null==t?null:t.id),r.zb(4),r.jc("value",null==t?null:t.account_number),r.zb(2),r.Gc(null==t?null:t.account_holder_name),r.zb(3),r.lc("src","",n.baseUrl,"",null==t||null==t.bank_name||null==t.bank_name.bank_image?null:t.bank_name.bank_image.media_file,"",r.wc),r.zb(1),r.Hc(" ",null==t||null==t.bank_name?null:t.bank_name.name," "),r.zb(2),r.ic("routerLink",r.nc(7,w,"/dashboard/editankdetails/"+t.id))}}const x=function(){return{prefix:"\u20a6 "}},M=[{path:"",redirectTo:"deposit",pathMatch:"full"},{path:"",component:i,children:[{path:"deposit",component:(()=>{class t{constructor(t,e,n,a){this._router=t,this._fb=e,this._common=n,this.dialog=a,this.baseUrl=u.a.homeURL}ngOnInit(){this.addCashForm=this._fb.group({tempImage:[null,s.t.required],proof:[null],request_type:[1],symbol:["+"],amount:[0,[s.t.required,s.t.min(.01)]]}),this.getCMS()}copyText(){var t=document.getElementById("myInput");t.select(),t.setSelectionRange(0,99999),document.execCommand("copy")}updateDetails(t){return new Promise((e,n)=>{this._common.post(l.a.addCashNew,t).subscribe(()=>{c.Block.remove("#add-cash-button"),e(t)},t=>{n(t),c.Block.remove("#add-cash-button")})})}submitDetails(){this.addCashForm.valid?this.dialog.open(m.a,{disableClose:!0}).afterClosed().subscribe(t=>{if(t&&(c.Block.circle("#add-cash-button"),this.addCashForm.get("tempImage").value)){let t=this.addCashForm.get("tempImage").value;const e=new FormData;e.append("media",t,t.name),this._common.uploadMedia(e).subscribe(t=>{this.addCashForm.get("proof").setValue(t.data[0].id),this.updateDetails(this.addCashForm.value).then(()=>{this._router.navigate(["/Congratulations"],{state:{message:"Your order has been placed<br>\n\t\t\t\t\t\t\t\t\t\tYour account will be credited <br> with in NGN as soon as we verify your order."}})},()=>{})})}}):this.addCashForm.markAllAsTouched()}getCMS(){c.Loading.circle(),Object(b.a)({cmsData:this._common.get(l.a.getBankDetails),cms:this._common.getCMS(l.a.getCMS)}).subscribe(t=>{this.cmsData=t.cmsData.data,this.cms=t.cms,c.Loading.remove()},()=>{c.Loading.remove()})}}return t.\u0275fac=function(e){return new(e||t)(r.Lb(o.b),r.Lb(s.d),r.Lb(d.a),r.Lb(p.b))},t.\u0275cmp=r.Fb({type:t,selectors:[["app-deposit"]],decls:35,vars:14,consts:[[1,"tp-head","pb-20","text-center"],[3,"formGroup","formGroupChange","ngSubmit"],[1,"form-by","my-forms"],[1,"input-bxx"],["appearance","outline",1,"example-full-width"],["currencyMask","","matInput","","type","text","min","0.01","formControlName","amount","placeholder","Enter the amount",3,"options"],["matSuffix",""],[4,"ngIf"],[1,"input-bxx","mb-0","pos-rel"],["appearance","outline"],["placeholder","Select proof","accept","image/*",3,"formControl","multiple","focus"],[1,"admin-body","pt-20"],[1,"bank-account","mb-20"],[1,"code-num"],["type","text","readonly","","id","myInput",1,"form-control","my-input",3,"value"],[1,"cursor-pointer",3,"click"],["src","assets/images/copy3.png","alt",""],[1,"bank_name"],[1,"d-flex","bank-name","mb-10"],["alt","",2,"height","30px","width","30px","object-fit","contain",3,"src"],[1,"tp-head","pb-20"],[1,"Instructions",3,"innerHtml"],[1,"btn-outer","m-auto","w-100","pt-20"],["id","add-cash-button"],["type","submit",1,"btn","btn-primary"]],template:function(t,e){if(1&t&&(r.Rb(0,"h3",0),r.Fc(1," Deposit NGN\n"),r.Qb(),r.Rb(2,"form",1),r.Yb("formGroupChange",(function(t){return e.addCashForm=t}))("ngSubmit",(function(){return e.submitDetails()})),r.Rb(3,"div",2),r.Rb(4,"div",3),r.Rb(5,"mat-form-field",4),r.Mb(6,"input",5),r.Rb(7,"span",6),r.Fc(8,"NGN"),r.Qb(),r.Dc(9,k,2,0,"mat-error",7),r.Dc(10,C,2,0,"mat-error",7),r.Qb(),r.Qb(),r.Rb(11,"div",8),r.Rb(12,"mat-form-field",9),r.Rb(13,"ngx-mat-file-input",10),r.Yb("focus",(function(){return e.addCashForm.get("tempImage").markAllAsTouched()})),r.Qb(),r.Dc(14,_,2,0,"mat-error",7),r.Qb(),r.Qb(),r.Qb(),r.Rb(15,"div",11),r.Rb(16,"div",12),r.Rb(17,"div",13),r.Mb(18,"input",14),r.Rb(19,"figure",15),r.Yb("click",(function(){return e.copyText()})),r.Mb(20,"img",16),r.Qb(),r.Qb(),r.Rb(21,"p",17),r.Fc(22),r.Qb(),r.Rb(23,"div",18),r.Rb(24,"figure"),r.Mb(25,"img",19),r.Qb(),r.Fc(26),r.Qb(),r.Qb(),r.Rb(27,"div"),r.Rb(28,"h3",20),r.Fc(29," Payment Instructions "),r.Qb(),r.Mb(30,"div",21),r.Qb(),r.Rb(31,"div",22),r.Rb(32,"div",23),r.Rb(33,"button",24),r.Fc(34,"Submit"),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb()),2&t){var n=null,a=null,o=null;r.zb(2),r.ic("formGroup",e.addCashForm),r.zb(4),r.ic("options",r.mc(13,y)),r.zb(3),r.ic("ngIf",null==(n=e.addCashForm.get("amount"))?null:n.hasError("required")),r.zb(1),r.ic("ngIf",null==(a=e.addCashForm.get("amount"))?null:a.hasError("min")),r.zb(3),r.ic("formControl",e.addCashForm.get("tempImage"))("multiple",!1),r.zb(1),r.ic("ngIf",null==(o=e.addCashForm.get("tempImage"))?null:o.hasError("required")),r.zb(4),r.jc("value",null==e.cmsData?null:e.cmsData.account_number),r.zb(4),r.Gc(null==e.cmsData?null:e.cmsData.account_holder_name),r.zb(3),r.lc("src","",e.baseUrl,"",null==e.cmsData||null==e.cmsData.bank_name||null==e.cmsData.bank_name.bank_image?null:e.cmsData.bank_name.bank_image.media_file,"",r.wc),r.zb(1),r.Hc(" ",null==e.cmsData||null==e.cmsData.bank_name?null:e.cmsData.bank_name.name," "),r.zb(4),r.ic("innerHtml",null==e.cms?null:e.cms.payment_instructions,r.vc)}},directives:[s.u,s.o,s.h,h.c,f.a,s.b,g.a,s.n,s.g,h.h,a.m,v.a,s.f,h.b],styles:[".code-num[_ngcontent-%COMP%]{width:300px;display:flex;justify-content:space-between;align-items:center}.code-num[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:80%;border:none;background:transparent;padding:0;font-size:19px;font-weight:600;color:#404040!important}.code-num[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{box-shadow:none}.code-num[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px}p.bank_name[_ngcontent-%COMP%]{color:#404040!important}"]}),t})()},{path:"withdrawal",component:(()=>{class t{constructor(t,e,n,a){this._router=t,this._fb=e,this._common=n,this.dialog=a,this.bankList=[],this.baseUrl=u.a.homeURL,this.selectedBank="",this.userInfo=JSON.parse(localStorage.getItem(u.a.storageKey))}ngOnInit(){this.addCashForm=this._fb.group({request_type:[2],symbol:["-"],amount:[0,[s.t.required,s.t.min(.01)]],bank:[null,s.t.required]}),this.getBanks(),this.userInfo.user_bitgo_wallet_address.length>0&&this.fetchCryptoBalance()}fetchCryptoBalance(){}updateDetails(t){return new Promise((e,n)=>{this._common.post(l.a.addCashNew,t).subscribe(()=>{c.Block.remove("#add-cash-button"),e(t)},t=>{n(t),c.Block.remove("#add-cash-button")})})}submitDetails(){0!=this.addCashForm.value.amount&&""!=this.addCashForm.value.amount&&null!=this.addCashForm.value.amount&&null!=this.addCashForm.value.amount&&this.addCashForm.invalid&&c.Notify.failure("Please select bank first."),this.addCashForm.valid&&this.addCashForm.valid?this.dialog.open(m.a,{disableClose:!0}).afterClosed().subscribe(t=>{t&&(c.Block.circle("#add-cash-button"),this.updateDetails(this.addCashForm.value).then(()=>{this._router.navigate(["/Congratulations"],{state:{message:"Your order has been placed<br>\n\t\t\t\t\t\t\t\t\tYour account will be debited <br> with in NGN as soon as we verify your order."}})}))}):this.addCashForm.markAllAsTouched()}getBanks(){c.Loading.circle(),this._common.get(l.a.getBanks).subscribe(t=>{this.bankList=t.data,c.Loading.remove()},t=>{c.Loading.remove()})}deleteBank(t){c.Confirm.show("Delete Bank","Do you want to delete the selected bank account ?","Yes","No",()=>{this._common.delete(l.a.deleteBank+this.bankList[t].id+"/").subscribe(()=>{c.Notify.success("Bank account deleted successfully."),this.getBanks()},t=>{c.Block.remove("#setup-password-button")})},()=>{})}}return t.\u0275fac=function(e){return new(e||t)(r.Lb(o.b),r.Lb(s.d),r.Lb(d.a),r.Lb(p.b))},t.\u0275cmp=r.Fb({type:t,selectors:[["app-withdrawngn"]],decls:23,vars:6,consts:[[1,"tp-head","pb-20","text-center"],[3,"formGroup","formGroupChange","ngSubmit"],[1,"form-by","my-forms"],[1,"input-bxx","mb-0","pos-rel"],["appearance","outline",1,"example-full-width"],["currencyMask","","matInput","","type","text","min","0.01","formControlName","amount","placeholder","Enter the amount ",3,"options"],["matSuffix",""],[4,"ngIf"],[1,"admin-body","pt-20"],[1,"d-flex","pb-20","space-b"],[1,"tp-head"],["routerLink","/dashboard/addbankdetails",1,"theme-color","cursor-pointer"],[1,"bank-list"],["class","bank-card d-flex",4,"ngFor","ngForOf"],[1,"btn-outer","m-auto","w-100","pt-20"],["id","add-cash-button"],["type","submit",1,"btn","btn-primary"],[1,"bank-card","d-flex"],[1,"l","pt-2"],["formControlName","bank","type","radio","id","html","name","bank",3,"value"],[1,"r","d-flex"],[1,"ftf"],[1,"code-num"],["type","text","readonly","","id","myInput",1,"form-control","my-input",3,"value"],[1,"bank_name"],[1,"d-flex","bank-name","mb-10"],["alt","",2,"height","30px","width","30px","object-fit","contain",3,"src"],[1,"action-btn","d-flex","ml-auto"],[1,"cursor-pointer",3,"routerLink"],["src","assets/images/edit.png","alt",""],[1,"cursor-pointer",3,"click"],["src","assets/images/delete.png","alt",""]],template:function(t,e){if(1&t&&(r.Rb(0,"h3",0),r.Fc(1," Withdraw NGN\n"),r.Qb(),r.Rb(2,"form",1),r.Yb("formGroupChange",(function(t){return e.addCashForm=t}))("ngSubmit",(function(){return e.submitDetails()})),r.Rb(3,"div",2),r.Rb(4,"div",3),r.Rb(5,"mat-form-field",4),r.Mb(6,"input",5),r.Rb(7,"span",6),r.Fc(8,"NGN"),r.Qb(),r.Dc(9,R,2,0,"mat-error",7),r.Dc(10,Q,2,0,"mat-error",7),r.Qb(),r.Qb(),r.Qb(),r.Rb(11,"div",8),r.Rb(12,"div",9),r.Rb(13,"h3",10),r.Fc(14," Select Bank "),r.Qb(),r.Rb(15,"p",11),r.Fc(16,"Add Bank"),r.Qb(),r.Qb(),r.Rb(17,"div",12),r.Dc(18,F,18,9,"div",13),r.Qb(),r.Rb(19,"div",14),r.Rb(20,"div",15),r.Rb(21,"button",16),r.Fc(22,"Submit"),r.Qb(),r.Qb(),r.Qb(),r.Qb(),r.Qb()),2&t){var n=null,a=null;r.zb(2),r.ic("formGroup",e.addCashForm),r.zb(4),r.ic("options",r.mc(5,x)),r.zb(3),r.ic("ngIf",null==(n=e.addCashForm.get("amount"))?null:n.hasError("required")),r.zb(1),r.ic("ngIf",null==(a=e.addCashForm.get("amount"))?null:a.hasError("min")),r.zb(8),r.ic("ngForOf",e.bankList)}},directives:[s.u,s.o,s.h,h.c,f.a,s.b,g.a,s.n,s.g,h.h,a.m,o.c,a.l,h.b,s.r],styles:[".code-num[_ngcontent-%COMP%]{width:300px;display:flex;justify-content:space-between;align-items:center}.code-num[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:80%;border:none;background:transparent;padding:0;font-size:19px;font-weight:600;color:#404040!important}.code-num[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{box-shadow:none}.code-num[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px}p.bank_name[_ngcontent-%COMP%]{color:#404040!important}"]}),t})()}]}];let D=(()=>{class t{}return t.\u0275mod=r.Jb({type:t}),t.\u0275inj=r.Ib({factory:function(e){return new(e||t)},imports:[[o.f.forChild(M)],o.f]}),t})();var I=n("99Ob");let L=(()=>{class t{}return t.\u0275mod=r.Jb({type:t}),t.\u0275inj=r.Ib({factory:function(e){return new(e||t)},imports:[[a.c,D,I.a,s.s,v.b,s.i,g.c]]}),t})()}}]);