import{d as te,e as ne,f as ie}from"./chunk-7VINSVV7.js";import{a as he,b as _e,c as A}from"./chunk-RJPUVL26.js";import{h as ee}from"./chunk-AV3SZMJO.js";import{a as W}from"./chunk-IMEDXYCP.js";import{b as oe,c as N,d as re,e as ae,f as G,g as I,h as se,i as le,k as me,l as ce,n as pe,s as de,t as ue,v as fe}from"./chunk-5QTD7IYK.js";import{$a as L,Ha as M,Ja as m,Ma as y,Na as T,Pa as b,Qa as D,Qb as B,Ra as r,Rb as O,Sa as a,Sb as U,Ta as C,Ua as $,Va as Y,W as g,Wa as S,Xa as f,Ya as h,a as P,b as R,cc as E,da as q,dc as k,ea as F,ec as X,fa as w,fb as s,gb as _,gc as Z,hb as V,ib as H,kb as v,ma as x,nb as J,ob as K,pb as c,qb as d,rb as Q,ua as o,va as j}from"./chunk-KMNQFCXU.js";function we(n,p){if(n&1){let e=S();r(0,"div",0)(1,"form",1),f("ngSubmit",function(){F(e);let i=h();return w(i.onSubmit())}),r(2,"div",2),$(3,3),r(4,"p",4),C(5,"app-select",5),a(),r(6,"p",4),C(7,"app-select",6),a(),Y(),r(8,"p",4),C(9,"input",7),c(10,"translate"),a(),r(11,"p",4),C(12,"input",8),c(13,"translate"),a(),r(14,"p",4)(15,"button",9),s(16),c(17,"translate"),a()()()()()}if(n&2){let e=h();o(),m("formGroup",e.transferForm),o(4),m("control",e.sourceControl)("options",e.containerNames),o(2),m("control",e.destControl)("options",e.containerNames),o(2),L("placeholder",d(10,9,"Amount")),o(3),L("placeholder",d(13,11,"Description")),o(3),m("disabled",!e.transferForm.valid),o(),V(" ",d(17,13,"Transfer")," ")}}var Ce=(()=>{class n{containerNames;moneyFlowEvent=new x;transferForm=new G({direction:new G({source:new I("From",N.required),dest:new I("To",N.required)},he),amount:new I("",[N.required,N.min(1)]),descr:new I("",N.required)});get sourceControl(){return this.transferForm.controls.direction.controls.source}get destControl(){return this.transferForm.controls.direction.controls.dest}onSubmit(){let e=this.transferForm.controls.direction.get("source").value,t=this.transferForm.controls.direction.get("dest").value;e=A(this.containerNames,e),t=A(this.containerNames,t);let i={source:e,dest:t,amount:parseFloat(this.transferForm.controls.amount.value),description:this.transferForm.controls.descr.value};this.transferForm.controls.amount.setValue(""),this.transferForm.controls.descr.setValue(""),this.moneyFlowEvent.emit(i)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["app-transfer-form"]],inputs:{containerNames:"containerNames"},outputs:{moneyFlowEvent:"moneyFlowEvent"},standalone:!0,features:[v],decls:1,vars:1,consts:[[1,"container","my-2","is-flex","is-justify-content-center"],[3,"ngSubmit","formGroup"],[1,"field","has-addons"],["formGroupName","direction"],[1,"control"],["firstOption","From",3,"control","options"],["firstOption","To",3,"control","options"],["type","number","min","0.5","formControlName","amount",1,"input","is-size-7-touch",3,"placeholder"],["type","text","formControlName","descr","maxlength","100",1,"input","is-size-7-touch",3,"placeholder"],["type","submit",1,"button","is-size-7-touch",3,"disabled"]],template:function(t,i){t&1&&M(0,we,18,15,"div",0),t&2&&y(i.containerNames?0:-1)},dependencies:[fe,se,oe,le,re,ae,ue,de,me,pe,ce,_e,k,E]})}return n})();var Me=(n,p)=>({"has-background-success-95":n,"has-background-success-75":p});function Se(n,p){n&1&&C(0,"i",3)}function xe(n,p){n&1&&C(0,"i",4)}function Te(n,p){if(n&1){let e=S();r(0,"button")(1,"span",2),M(2,Se,1,0,"i",3)(3,xe,1,0,"i",4),a(),r(4,"table",5),f("click",function(){let i=F(e).$implicit,l=h(2);return w(l.onContainerClick(i))}),r(5,"tr")(6,"td",6),s(7),a()(),r(8,"tr")(9,"td"),s(10),a()()()()}if(n&2){let e=p.$implicit,t=h(2);o(2),y(t.checkInFlow(e.containerName)?2:-1),o(),y(t.checkOutFlow(e.containerName)?3:-1),o(),m("ngClass",J(5,Me,e!=t.selected,e==t.selected)),o(3),_(e.containerName),o(3),_(e.balance)}}function be(n,p){if(n&1&&(r(0,"div",0)(1,"div",1),b(2,Te,11,8,"button",null,T),a()()),n&2){let e=h();o(2),D(e.containers)}}var ge=(()=>{class n{containers;summaryMfs;clickEvent=new x;templateBgColor="has-background-success-95";selectedBgColor="has-background-success-75";selected;outFlow=[];inFlow=[];ngOnChanges(e){if(!this.summaryMfs)return;let t=new Date;this.inFlow=[],this.outFlow=[];for(let i of this.summaryMfs){let l=new Date(i.time_stamp),u=l.getDate()===t.getDate()&&l.getMonth()===t.getMonth()&&l.getFullYear()===t.getFullYear();u&&this.inFlow?.push(i.dest),u&&this.outFlow?.push(i.source)}}checkInFlow(e){for(let t of this.inFlow)if(t===e)return!0;return!1}checkOutFlow(e){for(let t of this.outFlow)if(t===e)return!0;return!1}onContainerClick(e){this.selected=e,this.clickEvent.emit(e)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["app-containers"]],inputs:{containers:"containers",summaryMfs:"summaryMfs"},outputs:{clickEvent:"containerClick"},standalone:!0,features:[q,v],decls:1,vars:1,consts:[[1,"is-flex","is-justify-content-center"],[1,"field","is-grouped","is-grouped-multiline","is-justify-content-center"],[1,"icon"],[1,"fa-solid","fa-angles-down","mx-1"],[1,"fa-solid","fa-angles-up","mx-1"],[1,"has-background-success-95","fixed-width-tag","has-text-centered","is-size-6",3,"click","ngClass"],[1,"is-capitalized","has-text-weight-bold"]],template:function(t,i){t&1&&M(0,be,4,0,"div",0),t&2&&y(i.containers?0:-1)},dependencies:[B],styles:[".fixed-width-tag[_ngcontent-%COMP%]{min-width:90px;white-space:nowrap;border-radius:10px}"]})}return n})();var De=(n,p,e)=>({"has-background-info-65":n,"has-background-info-35":p,highlighted:e});function Ee(n,p){if(n&1){let e=S();r(0,"button",2),f("click",function(){let i=F(e).$implicit,l=h();return w(l.onDirectionSelected(i))}),s(1),c(2,"titlecase"),c(3,"titlecase"),a()}if(n&2){let e=p.$implicit,t=h();m("ngClass",K(7,De,e!=t.selected,e==t.selected,t.isFreshDirection(e))),o(),H("",d(2,3,e.source)," -> ",d(3,5,e.dest),"")}}var ve=(()=>{class n{directions;summaryMfs;directionSelected=new x;selected;fresh=[];ngOnChanges(e){if(e.directions&&this.directions?.length==1&&setTimeout(()=>this.onDirectionSelected(this.directions[0]),0),!e.summaryMfs||!this.summaryMfs)return;let t=new Date;for(let i of this.summaryMfs){let l=new Date(i.time_stamp);l.getDate()===t.getDate()&&l.getMonth()===t.getMonth()&&l.getFullYear()===t.getFullYear()&&this.fresh.push({source:i.source,dest:i.dest})}}onDirectionSelected(e){this.selected=e,this.directionSelected.emit(e)}isFreshDirection(e){return this.fresh.some(t=>t.source===e.source&&t.dest===e.dest)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["app-money-direction"]],inputs:{directions:"directions",summaryMfs:"summaryMfs"},outputs:{directionSelected:"directionSelected"},standalone:!0,features:[q,v],decls:3,vars:0,consts:[[1,"is-flex","is-justify-content-center","my-2"],[1,"button","tag","is-hoverable","has-text-white","m-1","is-size-6","is-size-7-mobile",3,"ngClass"],[1,"button","tag","is-hoverable","has-text-white","m-1","is-size-6","is-size-7-mobile",3,"click","ngClass"]],template:function(t,i){t&1&&(r(0,"div",0),b(1,Ee,4,11,"button",1,T),a()),t&2&&(o(),D(i.directions))},dependencies:[B,O],styles:["div[_ngcontent-%COMP%]{min-height:35px}span[_ngcontent-%COMP%]{min-width:90px}.highlighted[_ngcontent-%COMP%]{border-color:#96dfbe;border-bottom-width:5px}"]})}return n})();function ke(n,p){if(n&1&&(r(0,"tr")(1,"td"),s(2),c(3,"date"),a(),r(4,"td"),s(5),c(6,"titlecase"),a(),r(7,"td"),s(8),c(9,"titlecase"),a(),r(10,"td"),s(11),a()()),n&2){let e=p.$implicit;o(2),_(Q(3,4,e.time_stamp,"MMMM d, HH:mm")),o(3),_(d(6,7,e.source)),o(3),_(d(9,9,e.dest)),o(3),_(e.amount)}}var Fe=(()=>{class n{summary;static \u0275fac=function(t){return new(t||n)};static \u0275cmp=g({type:n,selectors:[["app-flow-summary"]],inputs:{summary:"summary"},standalone:!0,features:[v],decls:18,vars:12,consts:[[1,"table","is-size-7","has-text-centered"],[1,"has-text-centered","min-width"]],template:function(t,i){t&1&&(r(0,"table",0)(1,"thead")(2,"tr")(3,"th",1),s(4),c(5,"translate"),a(),r(6,"th",1),s(7),c(8,"translate"),a(),r(9,"th",1),s(10),c(11,"translate"),a(),r(12,"th",1),s(13),c(14,"translate"),a()()(),r(15,"tbody"),b(16,ke,12,11,"tr",null,T),a()()),t&2&&(o(4),_(d(5,4,"Last transaction")),o(3),_(d(8,6,"Source")),o(3),_(d(11,8,"Dest")),o(3),_(d(14,10,"Total")),o(3),D(i.summary))},dependencies:[k,E,O,U]})}return n})();function Ne(n,p){if(n&1&&C(0,"app-error",2),n&2){let e=h();m("error",e.errorResponse)}}function Ie(n,p){n&1&&(r(0,"p",3),s(1,"Money transferred"),a())}function Pe(n,p){n&1&&(r(0,"p",3),s(1),c(2,"translate"),a()),n&2&&(o(),V("",d(2,1,"Loading"),"..."))}function Re(n,p){if(n&1){let e=S();r(0,"div",13)(1,"button",14),f("click",function(){F(e);let i=h();return w(i.showLastTransactions=!0)}),s(2),c(3,"translate"),a()(),r(4,"app-modal",15),f("close",function(){F(e);let i=h();return w(i.showLastTransactions=!1)}),C(5,"app-flow-summary",16),a()}if(n&2){let e=h();o(2),_(d(3,3,"Month overview")),o(2),m("active",e.showLastTransactions),o(),m("summary",e.summaryMfs)}}var Mt=(()=>{class n{httpService;authService;containers;containerNames;summaryMfs;selectedConatiner;moneyFlowResponseDto;dates;totalPages;currentPage=1;transactionDetails;showDetails=!1;showLastTransactions=!1;moneyFlowRequest={from:void 0,to:void 0,source:void 0,dest:void 0,page:this.currentPage-1};errorResponse;requestFlag=!1;moneyTransferredFlag=!1;constructor(e,t){this.httpService=e,this.authService=t}ngOnInit(){this.requestFlag=!0,this.httpService.getContainers().subscribe({next:e=>{this.containers=e.containers,this.containerNames=this.containers.map(t=>t.containerName),this.summaryMfs=e.lastTransactions.reverse()},error:e=>{this.errorResponse=e},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0}})}onMoneyTransfer(e){this.requestFlag=!0,this.moneyTransferredFlag=!1,this.httpService.transferMoney(e).subscribe({next:t=>{this.containers=t},error:t=>{this.errorResponse=t},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0,this.moneyTransferredFlag=!0,this.ngOnInit()}})}onDatesSelected(e){this.moneyFlowRequest=R(P({},this.moneyFlowRequest),{from:e.from,to:e.to,page:this.currentPage-1}),this.loadMoneyFlows()}onContainerClick(e){this.selectedConatiner=e}onPageSelected(e){this.moneyFlowRequest=R(P({},this.moneyFlowRequest),{page:e-1}),this.currentPage=e,this.loadMoneyFlows()}onDirectionSelected(e){this.currentPage=1,this.moneyFlowRequest=R(P({},this.moneyFlowRequest),{source:e.source,dest:e.dest,page:this.currentPage-1}),this.loadMoneyFlows()}loadMoneyFlows(){Object.values(this.moneyFlowRequest).some(e=>e==null)||(this.moneyTransferredFlag=!1,this.requestFlag=!0,this.httpService.getMoneyFlows(this.moneyFlowRequest).subscribe({next:e=>{this.moneyFlowResponseDto=e,this.totalPages=e.totalPages},error:e=>{this.errorResponse=e},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0}}))}loadTransactionByTimestamp(e){this.requestFlag=!0,this.moneyTransferredFlag=!1,this.httpService.getTransactions({from:e,to:e},0).subscribe({next:t=>{this.transactionDetails=t.transactionsOnThePage[0],this.showDetails=!0},error:t=>{this.errorResponse=t},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0}})}static \u0275fac=function(t){return new(t||n)(j(Z),j(ee))};static \u0275cmp=g({type:n,selectors:[["app-money-management"]],standalone:!0,features:[v],decls:15,vars:13,consts:[[1,"container","is-max-tablet"],[1,"is-flex","is-justify-content-center","mt-1",2,"min-height","35px"],[3,"error"],[1,"is-size-7"],[3,"moneyFlowEvent","containerNames"],[3,"containerClick","containers","summaryMfs"],[3,"directionSelected","directions","summaryMfs"],[3,"dates"],[1,"container"],[1,"columns","is-centered"],[1,"column","is-flex","is-justify-content-center","p-0","m-0"],[3,"receiptSelected","pageSelected","data","showDetails"],[3,"close","active","transaction"],[1,"field","is-grouped","is-grouped-multiline","is-justify-content-center"],[1,"button","is-size-7-touch","is-size-6","tag","mt-2",3,"click"],[3,"close","active"],[3,"summary"]],template:function(t,i){t&1&&(r(0,"div",0)(1,"div",1),M(2,Ne,1,1,"app-error",2)(3,Ie,2,0,"p",3)(4,Pe,3,3,"p",3),a(),r(5,"app-transfer-form",4),f("moneyFlowEvent",function(u){return i.onMoneyTransfer(u)}),a(),M(6,Re,6,5),r(7,"app-containers",5),f("containerClick",function(u){return i.onContainerClick(u)}),a(),r(8,"app-money-direction",6),f("directionSelected",function(u){return i.onDirectionSelected(u)}),a(),r(9,"app-date-between",7),f("dates",function(u){return i.onDatesSelected(u)}),a(),r(10,"div",8)(11,"div",9)(12,"div",10)(13,"app-money-flow-table",11),f("receiptSelected",function(u){return i.loadTransactionByTimestamp(u)})("pageSelected",function(u){return i.onPageSelected(u)}),a()()()(),r(14,"app-transaction-details",12),f("close",function(){return i.showDetails=!1}),a()()),t&2&&(o(2),y(i.errorResponse?2:-1),o(),y(i.moneyTransferredFlag&&!i.requestFlag?3:-1),o(),y(i.requestFlag&&!i.errorResponse?4:-1),o(),m("containerNames",i.containerNames),o(),y(i.authService.getAccessLevel()>1?6:-1),o(),m("containers",i.containers)("summaryMfs",i.summaryMfs),o(),m("directions",i.selectedConatiner==null?null:i.selectedConatiner.directions)("summaryMfs",i.summaryMfs),o(5),m("data",i.moneyFlowResponseDto)("showDetails",!0),o(),m("active",i.showDetails)("transaction",i.transactionDetails))},dependencies:[Ce,ge,ie,te,X,ve,ne,k,E,Fe,W]})}return n})();export{Mt as MoneyManagementComponent};