(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{c6Id:function(t,e,a){"use strict";a.r(e),a.d(e,"DepositNgnModule",(function(){return G}));var n=a("SVse"),i=a("iInd"),r=a("8Y7J");let o=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Eb({type:t,selectors:[["app-deposit-ngn"]],decls:28,vars:0,consts:[[1,"tp-head","pb-20","text-center"],[1,"dp-top-main"],[1,"dp-top"],[1,"wallet-main"],[1,"wallet-left"],["src","assets/images/auth/wallet.png"],[1,"aviable-bal","d-flex","pt-20"],[1,"wd-main"],[1,"wd-header","pb-20"],["routerLink","/dashboard/payment/withdrawal","routerLinkActive","active-cls"],["routerLink","/dashboard/payment/deposit","routerLinkActive","active-cls"],[1,"bt-body"]],template:function(t,e){1&t&&(r.Qb(0,"h3",0),r.Bc(1," Deposit NGN\n"),r.Pb(),r.Qb(2,"div",1),r.Qb(3,"div",2),r.Qb(4,"div",3),r.Qb(5,"div",4),r.Qb(6,"figure"),r.Lb(7,"img",5),r.Pb(),r.Pb(),r.Qb(8,"div",6),r.Qb(9,"div"),r.Qb(10,"h3"),r.Bc(11,"NGN Balance "),r.Qb(12,"span"),r.Bc(13," $1000 "),r.Pb(),r.Pb(),r.Pb(),r.Qb(14,"div"),r.Qb(15,"h3"),r.Bc(16," Crypto Balance "),r.Qb(17,"span"),r.Bc(18," $10000 "),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Qb(19,"div",7),r.Qb(20,"div",8),r.Qb(21,"ul"),r.Qb(22,"li",9),r.Bc(23,"Withdraw"),r.Pb(),r.Qb(24,"li",10),r.Bc(25,"Deposit"),r.Pb(),r.Pb(),r.Pb(),r.Qb(26,"div",11),r.Lb(27,"router-outlet"),r.Pb(),r.Pb())},directives:[i.b,i.c,i.f],styles:[""]}),t})();var s=a("s7LF"),l=a("vZrp"),u=a("Z+m1"),c=a("AytR"),b=a("7Vn+"),d=a("YWaA"),m=a("Q2Ze"),h=a("e6WT"),p=a("8LU1"),f=a("UhP/"),g=a("XNiG"),v=a("Dxy4"),_=a("Tj54"),P=a("SCoL");const y=["inputFile"],Q=["inputValue"];function k(t,e){1&t&&(r.Qb(0,"mat-icon",7),r.Bc(1,"attach_file"),r.Pb())}const C=[[["","ngxMatFileInputIcon",""]]],x=["[ngxMatFileInputIcon]"];let B=0;class w{constructor(t,e,a,n){this._defaultErrorStateMatcher=t,this._parentForm=e,this._parentFormGroup=a,this.ngControl=n}}const F=Object(f.k)(w);let I=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=r.Fb({type:t,selectors:[["","ngxMatFileInputIcon",""]]}),t})(),D=(()=>{class t extends F{constructor(t,e,a,n,i,r,o){super(o,i,r,n),this._elementRef=t,this._platform=e,this._cd=a,this.ngControl=n,this.color="primary",this.fileNames=null,this._uid="ngx-mat-fileinput-"+B++,this.stateChanges=new g.a,this.focused=!1,this.controlType="ngx-mat-file-input",this.autofilled=!1,this._onTouched=()=>{},this._onChange=()=>{},this._disabled=!1,this._multiple=!1,this.placeholder="Choose a file",this.separator=",",this._required=!1,this._readonly=!0,this.id=this.id,this.ngControl&&(this.ngControl.valueAccessor=this)}get disabled(){return this.ngControl&&null!==this.ngControl.disabled?this.ngControl.disabled:this._disabled}set disabled(t){this._disabled=Object(p.b)(t),this.focused&&(this.focused=!1,this.stateChanges.next())}get id(){return this._id}set id(t){this._id=t||this._uid}get multiple(){return this._multiple}set multiple(t){this._multiple=Object(p.b)(t)}get required(){return this._required}set required(t){this._required=Object(p.b)(t)}get value(){return this._value}set value(t){this._value=t}get readonly(){return this._readonly}set readonly(t){this._readonly=Object(p.b)(t)}get accept(){return this._accept}set accept(t){this._accept=t}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete()}ngDoCheck(){this.ngControl&&this.updateErrorState()}writeValue(t){this._updateInputValue(t)}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this.stateChanges.next()}focus(t){this._inputValueRef.nativeElement.focus(t)}_focusChanged(t){t===this.focused||this.readonly&&t||(this.focused=t,this.stateChanges.next())}_markAsTouched(){this._onTouched(),this._cd.markForCheck(),this.stateChanges.next()}_isBadInput(){let t=this._inputValueRef.nativeElement.validity;return t&&t.badInput}get empty(){return!this._inputValueRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){return this.focused||!this.empty}setDescribedByIds(t){this._ariaDescribedby=t.join(" ")}openFilePicker(t){this._inputFileRef.nativeElement.click(),t&&(t.preventDefault(),t.stopPropagation()),this._markAsTouched()}handleFiles(t){if(t.length>0){const e=new Array;for(let a=0;a<t.length;a++)e.push(t.item(a));this._updateInputValue(e),this._resetInputFile(),this._onChange(this.multiple?e:e[0])}}onContainerClick(t){}_resetInputFile(){this._inputFileRef.nativeElement.value=""}_updateInputValue(t){let e=null;t&&(e=Array.isArray(t)?this._multiple?t.map(t=>t.name).join(this.separator):t[0].name:null!=t.name?t.name:null),this._inputValueRef.nativeElement.value=e}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(r.l),r.Kb(P.a),r.Kb(r.h),r.Kb(s.m,10),r.Kb(s.p,8),r.Kb(s.h,8),r.Kb(f.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["ngx-mat-file-input"]],contentQueries:function(t,e,a){var n;1&t&&r.Db(a,I,!0),2&t&&r.oc(n=r.Yb())&&(e._customIcon=n.first)},viewQuery:function(t,e){var a;1&t&&(r.vc(y,!0),r.vc(Q,!0)),2&t&&(r.oc(a=r.Yb())&&(e._inputFileRef=a.first),r.oc(a=r.Yb())&&(e._inputValueRef=a.first))},hostAttrs:[1,"ngx-mat-file-input"],inputs:{color:"color",placeholder:"placeholder",separator:"separator",id:"id",disabled:"disabled",multiple:"multiple",required:"required",value:"value",readonly:"readonly",accept:"accept",errorStateMatcher:"errorStateMatcher"},exportAs:["ngx-mat-file-input"],features:[r.yb([{provide:m.d,useExisting:Object(r.T)(()=>t)}]),r.wb,r.xb],ngContentSelectors:x,decls:8,vars:13,consts:[["autocomplete","off",1,"mat-input-element","mat-form-field-autofill-control",3,"disabled","required"],["inputValue",""],[1,"mat-form-field-suffix"],["matSuffix","","mat-icon-button","","type","button",1,"button-browse",3,"color","disabled","click"],["class","ngx-mat-file-input--default-icon",4,"ngIf"],["type","file",1,"input-file",3,"multiple","accept","change"],["inputFile",""],[1,"ngx-mat-file-input--default-icon"]],template:function(t,e){1&t&&(r.fc(C),r.Lb(0,"input",0,1),r.Qb(2,"div",2),r.Qb(3,"button",3),r.Xb("click",(function(t){return e.openFilePicker(t)})),r.zc(4,k,2,0,"mat-icon",4),r.ec(5),r.Pb(),r.Pb(),r.Qb(6,"input",5,6),r.Xb("change",(function(t){return e.handleFiles(t.target.files)})),r.Pb()),2&t&&(r.gc("disabled",e.disabled)("required",e.required),r.Ab("id",e.id)("placeholder",e.placeholder)("readonly",e.readonly||null)("aria-describedby",e._ariaDescribedby||null)("aria-invalid",e.errorState)("aria-required",e.required.toString()),r.zb(3),r.gc("color",e.color)("disabled",e.disabled),r.zb(1),r.gc("ngIf",!e._customIcon),r.zb(2),r.gc("multiple",e.multiple)("accept",e.accept))},directives:[v.a,m.h,n.j,_.a],styles:[".mat-form-field-appearance-legacy .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .ngx-mat-file-input--default-icon{width:1em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .ngx-mat-file-input--default-icon{display:block;height:1.5em;width:1.5em}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .ngx-mat-file-input--default-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .ngx-mat-file-input--default-icon{margin:auto}.ngx-mat-file-input{align-items:center;display:flex;height:18px;line-height:18px}.ngx-mat-file-input .input-file{display:block;height:0;visibility:hidden;width:0}"],encapsulation:2}),t})(),L=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(e){return new(e||t)},imports:[[n.b,v.b,_.b,m.e,h.b]]}),t})();function A(t,e){1&t&&(r.Qb(0,"mat-error"),r.Bc(1," Please enter an amount. "),r.Pb())}function z(t,e){1&t&&(r.Qb(0,"mat-error"),r.Bc(1," Amount should be at least 1; "),r.Pb())}function q(t,e){1&t&&(r.Qb(0,"mat-error"),r.Bc(1," Please select a proof. "),r.Pb())}function S(t,e){1&t&&(r.Qb(0,"mat-error"),r.Bc(1," Please enter an amount. "),r.Pb())}function E(t,e){1&t&&(r.Qb(0,"mat-error"),r.Bc(1," Amount should be at least 1; "),r.Pb())}function N(t,e){if(1&t){const t=r.Rb();r.Qb(0,"div",15),r.Qb(1,"div",16),r.Lb(2,"input",17),r.Pb(),r.Qb(3,"div",18),r.Qb(4,"div",19),r.Qb(5,"div",20),r.Qb(6,"figure"),r.Lb(7,"img",21),r.Pb(),r.Bc(8),r.Pb(),r.Qb(9,"div",22),r.Qb(10,"figure",23),r.Lb(11,"img",24),r.Pb(),r.Qb(12,"figure",25),r.Xb("click",(function(){r.qc(t);const a=e.index;return r.bc().deleteBank(a)})),r.Lb(13,"img",26),r.Pb(),r.Pb(),r.Pb(),r.Qb(14,"div",27),r.Qb(15,"p"),r.Bc(16,"Account holder name "),r.Qb(17,"span"),r.Bc(18),r.Pb(),r.Pb(),r.Qb(19,"p"),r.Bc(20,"Account Number "),r.Qb(21,"span"),r.Bc(22),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb()}if(2&t){const t=e.$implicit,a=r.bc();r.zb(2),r.hc("value",null==t?null:t.id),r.zb(5),r.hc("src",a.baseUrl+(null==t||null==t.bank_name||null==t.bank_name.bank_image?null:t.bank_name.bank_image.media_file),r.sc),r.zb(1),r.Dc(" ",null==t||null==t.bank_name?null:t.bank_name.name," "),r.zb(10),r.Cc(null==t?null:t.account_holder_name),r.zb(4),r.Cc(null==t?null:t.account_number)}}const j=[{path:"",redirectTo:"deposit",pathMatch:"full"},{path:"",component:o,children:[{path:"deposit",component:(()=>{class t{constructor(t,e,a,n){this._router=t,this._fb=e,this._auth=a,this._common=n,this.baseUrl=c.a.homeURL}ngOnInit(){this.addCashForm=this._fb.group({tempImage:[null,s.u.required],proof:[null],request_type:[1],symbol:["+"],amount:[null,[s.u.required,s.u.min(1)]]}),this.getCMS()}updateDetails(t){return new Promise((e,a)=>{this._common.post(u.a.addCash,t).subscribe(a=>{l.Block.remove("#add-cash-button"),e(t)},t=>{a(t),l.Block.remove("#add-cash-button")})})}submitDetails(){if(this.addCashForm.valid){if(l.Block.circle("#add-cash-button"),this.addCashForm.get("tempImage").value){let t=this.addCashForm.get("tempImage").value;const e=new FormData;e.append("media",t,t.name),this._common.uploadMedia(e).subscribe(t=>{this.addCashForm.get("proof").setValue(t.data[0].id),this.updateDetails(this.addCashForm.value).then(t=>{this._router.navigate(["/Congratulations"],{state:{message:"Your order has been placed<br>\n\t\t\t\t\t\t\t\tYour account will be credited <br> with in NGN as soon as we verify your order."}})})})}}else this.addCashForm.markAllAsTouched()}getCMS(){l.Loading.circle(),this._common.get(u.a.getBankDetails).subscribe(t=>{this.cmsData=t.data,l.Loading.remove()},t=>{l.Loading.remove()})}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(i.a),r.Kb(s.d),r.Kb(b.a),r.Kb(d.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-deposit"]],decls:39,vars:11,consts:[[3,"formGroup","formGroupChange","ngSubmit"],[1,"form-by","my-forms"],[1,"input-bxx"],["appearance","outline",1,"example-full-width"],["matInput","","type","number","min","1","formControlName","amount","placeholder","Enter the amount "],[4,"ngIf"],[1,"input-bxx","mb-0","pos-rel"],["appearance","outline"],["placeholder","Select proof","accept","image/*",3,"formControl","multiple","focus"],[1,"admin-body","pt-20"],[1,"tp-head","pb-20"],[1,"d-flex","bank-name","mb-10"],["alt","",2,"height","30px","width","30px","object-fit","cover",3,"src"],[1,"bank-account","mb-20"],[1,"Instructions"],[1,"btn-outer","m-auto","w-100","pt-20"],["id","add-cash-button"],["type","submit",1,"btn","btn-primary"]],template:function(t,e){if(1&t&&(r.Qb(0,"form",0),r.Xb("formGroupChange",(function(t){return e.addCashForm=t}))("ngSubmit",(function(){return e.submitDetails()})),r.Qb(1,"div",1),r.Qb(2,"div",2),r.Qb(3,"mat-form-field",3),r.Lb(4,"input",4),r.zc(5,A,2,0,"mat-error",5),r.zc(6,z,2,0,"mat-error",5),r.Pb(),r.Pb(),r.Qb(7,"div",6),r.Qb(8,"mat-form-field",7),r.Qb(9,"ngx-mat-file-input",8),r.Xb("focus",(function(){return e.addCashForm.get("tempImage").markAllAsTouched()})),r.Pb(),r.zc(10,q,2,0,"mat-error",5),r.Pb(),r.Pb(),r.Pb(),r.Qb(11,"div",9),r.Qb(12,"h3",10),r.Bc(13," Admin's Account "),r.Pb(),r.Qb(14,"div",11),r.Qb(15,"figure"),r.Lb(16,"img",12),r.Pb(),r.Bc(17),r.Pb(),r.Qb(18,"div",13),r.Qb(19,"p"),r.Bc(20,"Account holder name "),r.Qb(21,"span"),r.Bc(22),r.Pb(),r.Pb(),r.Qb(23,"p"),r.Bc(24,"Account Number "),r.Qb(25,"span"),r.Bc(26),r.Pb(),r.Pb(),r.Pb(),r.Qb(27,"div"),r.Qb(28,"h3",10),r.Bc(29," Payment Instructions "),r.Pb(),r.Qb(30,"div",14),r.Qb(31,"p"),r.Bc(32,"1. Deposit the amount on the above given bank account using any means of transfer. "),r.Pb(),r.Qb(33,"p"),r.Bc(34,"2. Upload the transaction proof."),r.Pb(),r.Pb(),r.Pb(),r.Qb(35,"div",15),r.Qb(36,"div",16),r.Qb(37,"button",17),r.Bc(38,"Submit"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb()),2&t){var a=null,n=null,i=null;r.gc("formGroup",e.addCashForm),r.zb(5),r.gc("ngIf",null==(a=e.addCashForm.get("amount"))?null:a.hasError("required")),r.zb(1),r.gc("ngIf",null==(n=e.addCashForm.get("amount"))?null:n.hasError("min")),r.zb(3),r.gc("formControl",e.addCashForm.get("tempImage"))("multiple",!1),r.zb(1),r.gc("ngIf",null==(i=e.addCashForm.get("tempImage"))?null:i.hasError("required")),r.zb(6),r.ic("src","",e.baseUrl,"",null==e.cmsData||null==e.cmsData.bank_name||null==e.cmsData.bank_name.bank_image?null:e.cmsData.bank_name.bank_image.media_file,"",r.sc),r.zb(1),r.Dc(" ",null==e.cmsData||null==e.cmsData.bank_name?null:e.cmsData.bank_name.name," "),r.zb(5),r.Dc("",null==e.cmsData?null:e.cmsData.account_holder_name,"."),r.zb(4),r.Cc(null==e.cmsData?null:e.cmsData.account_number)}},directives:[s.v,s.o,s.h,m.c,h.a,s.r,s.b,s.n,s.g,n.j,D,s.f,m.b],styles:[""]}),t})()},{path:"withdrawal",component:(()=>{class t{constructor(t,e,a,n){this._router=t,this._fb=e,this._auth=a,this._common=n,this.bankList=[],this.baseUrl=c.a.homeURL,this.selectedBank=""}ngOnInit(){this.addCashForm=this._fb.group({request_type:[2],symbol:["-"],amount:[null,[s.u.required,s.u.min(1)]],bankId:[null,s.u.required]}),this.getBanks()}updateDetails(t){return new Promise((e,a)=>{this._common.post(u.a.addCash,t).subscribe(a=>{l.Block.remove("#add-cash-button"),e(t)},t=>{a(t),l.Block.remove("#add-cash-button")})})}submitDetails(){0!=this.addCashForm.value.amount&&""!=this.addCashForm.value.amount&&null!=this.addCashForm.value.amount&&null!=this.addCashForm.value.amount&&this.addCashForm.invalid&&l.Notify.failure("Please select bank first."),this.addCashForm.valid?(l.Block.circle("#add-cash-button"),this.updateDetails(this.addCashForm.value).then(t=>{this._router.navigate(["/Congratulations"],{state:{message:"Your order has been placed<br>\n\t\t\t\t\t\tYour account will be credited <br> with in NGN as soon as we verify your order."}})})):this.addCashForm.markAllAsTouched()}getBanks(){l.Loading.circle(),this._common.get(u.a.getBanks).subscribe(t=>{this.bankList=t.data,l.Loading.remove()},t=>{l.Loading.remove()})}deleteBank(t){l.Confirm.show("Delete Bank","Do you want to delete the selected bank account ?","Yes","No",()=>{this._common.delete(u.a.deleteBank).subscribe(e=>{l.Notify.success("Bank account deleted successfully."),this.bankList.splice(1,t)},t=>{l.Block.remove("#setup-password-button")})},()=>{})}}return t.\u0275fac=function(e){return new(e||t)(r.Kb(i.a),r.Kb(s.d),r.Kb(b.a),r.Kb(d.a))},t.\u0275cmp=r.Eb({type:t,selectors:[["app-withdrawngn"]],decls:19,vars:4,consts:[[3,"formGroup","formGroupChange","ngSubmit"],[1,"form-by","my-forms"],[1,"input-bxx","mb-0","pos-rel"],["appearance","outline",1,"example-full-width"],["matInput","","type","number","min","1","formControlName","amount","placeholder","Enter the amount "],[4,"ngIf"],[1,"admin-body","pt-20"],[1,"d-flex","pb-20","space-b"],[1,"tp-head"],["routerLink","/dashboard/addbankdetails",1,"theme-color"],[1,"bank-list"],["class","bank-card d-flex",4,"ngFor","ngForOf"],[1,"btn-outer","m-auto","w-100","pt-20"],["id","add-cash-button"],["type","submit",1,"btn","btn-primary"],[1,"bank-card","d-flex"],[1,"l"],["formControlName","bankId","type","radio","id","html","name","bankId",3,"value"],[1,"r"],[1,"d-flex","ftf"],[1,"d-flex","bank-name","mb-10"],["alt","",2,"height","25px","width","25px","object-fit","cover",3,"src"],[1,"action-btn","d-flex"],[1,"cursor-pointer"],["src","assets/images/edit.png","alt",""],[1,"cursor-pointer",3,"click"],["src","assets/images/delete.png","alt",""],[1,"bank-account","mb-20"]],template:function(t,e){if(1&t&&(r.Qb(0,"form",0),r.Xb("formGroupChange",(function(t){return e.addCashForm=t}))("ngSubmit",(function(){return e.submitDetails()})),r.Qb(1,"div",1),r.Qb(2,"div",2),r.Qb(3,"mat-form-field",3),r.Lb(4,"input",4),r.zc(5,S,2,0,"mat-error",5),r.zc(6,E,2,0,"mat-error",5),r.Pb(),r.Pb(),r.Pb(),r.Qb(7,"div",6),r.Qb(8,"div",7),r.Qb(9,"h3",8),r.Bc(10," Selecet Bank "),r.Pb(),r.Qb(11,"p",9),r.Bc(12,"Add Bank"),r.Pb(),r.Pb(),r.Qb(13,"div",10),r.zc(14,N,23,5,"div",11),r.Pb(),r.Qb(15,"div",12),r.Qb(16,"div",13),r.Qb(17,"button",14),r.Bc(18,"Submit"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb()),2&t){var a=null,n=null;r.gc("formGroup",e.addCashForm),r.zb(5),r.gc("ngIf",null==(a=e.addCashForm.get("amount"))?null:a.hasError("required")),r.zb(1),r.gc("ngIf",null==(n=e.addCashForm.get("amount"))?null:n.hasError("min")),r.zb(8),r.gc("ngForOf",e.bankList)}},directives:[s.v,s.o,s.h,m.c,h.a,s.r,s.b,s.n,s.g,n.j,i.b,n.i,m.b,s.s],styles:[""]}),t})()}]}];let O=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(e){return new(e||t)},imports:[[i.e.forChild(j)],i.e]}),t})();var K=a("99Ob");let G=(()=>{class t{}return t.\u0275mod=r.Ib({type:t}),t.\u0275inj=r.Hb({factory:function(e){return new(e||t)},imports:[[n.b,O,K.a,s.t,L,s.i]]}),t})()}}]);