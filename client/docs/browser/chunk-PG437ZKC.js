import{h as Q}from"./chunk-SKQRQWWF.js";import{a as Y}from"./chunk-FAPK36KY.js";import{Ha as y,Ia as H,Ja as u,Ka as h,Ma as E,Na as N,Oa as j,Pa as I,Qa as k,Ra as i,Rb as L,Sa as a,Ta as w,Tb as U,Ub as J,W as S,Wa as P,Xa as c,Ya as _,Z as z,da as A,ea as x,fa as T,fb as l,fc as D,gb as s,gc as b,hb as v,ib as V,jb as $,jc as G,lb as C,ma as f,nb as q,ob as F,qb as p,rb as d,sb as K,ua as n,va as R}from"./chunk-XEDVPAYN.js";var O=(o,g)=>({"is-disabled":o,"is-selected":g}),ee=o=>({"is-disabled":o}),W=(()=>{class o{currentPage;totalPages;pageSelected=new f;pageRange=1;intervalId;ngOnChanges(e){e.totalPages?.currentValue!=e.totalPages?.previousValue&&(this.pageRange=1,this.currentPage=1)}onPageClick(e){e<1||e>this.totalPages||(this.currentPage=e,this.pageSelected.emit(e))}movePages(e){e+this.pageRange<1||e+this.pageRange>=this.totalPages-1||(this.pageRange+=e,this.intervalId=setInterval(()=>{e+this.pageRange<1||e+this.pageRange>=this.totalPages-1||(this.pageRange+=e)},70))}stopTimer(){clearInterval(this.intervalId)}static \u0275fac=function(r){return new(r||o)};static \u0275cmp=S({type:o,selectors:[["app-pagination"]],inputs:{currentPage:"currentPage",totalPages:"totalPages"},outputs:{pageSelected:"pageSelected"},standalone:!0,features:[A,C],decls:21,vars:22,consts:[["role","navigation","aria-label","pagination",1,"pagination","is-small"],[1,"pagination-list"],[1,"pagination-link",3,"mousedown","mouseup"],[1,"pagination-link",3,"click","ngClass"],["aria-current","page",1,"pagination-link",3,"click","ngClass"],[1,"pagination-link",3,"mousedown","mouseup","ngClass"]],template:function(r,t){r&1&&(i(0,"nav",0)(1,"ul",1)(2,"li")(3,"a",2),c("mousedown",function(){return t.movePages(-1)})("mouseup",function(){return t.stopTimer()}),i(4,"span"),l(5,"<<"),a()()(),i(6,"li")(7,"a",3),c("click",function(){return t.onPageClick(t.pageRange)}),i(8,"span"),l(9),a()()(),i(10,"li")(11,"a",4),c("click",function(){return t.onPageClick(t.pageRange+1)}),l(12),a()(),i(13,"li")(14,"a",3),c("click",function(){return t.onPageClick(t.pageRange+2)}),i(15,"span"),l(16),a()()(),i(17,"li")(18,"a",5),c("mousedown",function(){return t.movePages(1)})("mouseup",function(){return t.stopTimer()}),i(19,"span"),l(20,">>"),a()()()()()),r&2&&(h("is-invisible",t.totalPages==1),n(3),h("is-disabled",t.totalPages<=3),n(4),u("ngClass",F(11,O,t.totalPages==1,t.currentPage===t.pageRange)),n(2),s(t.pageRange),n(2),u("ngClass",F(14,O,t.totalPages==1,t.currentPage===t.pageRange+1)),n(),s(t.pageRange+1),n(2),u("ngClass",F(17,O,t.totalPages<3,t.currentPage===t.pageRange+2)),n(2),v("",t.pageRange+2," "),n(2),u("ngClass",q(20,ee,t.totalPages<=3)))},dependencies:[L],styles:[".nav[_ngcontent-%COMP%]{height:40px}"]})}return o})();function te(o,g){if(o&1){let e=P();i(0,"app-pagination",9),c("pageSelected",function(t){x(e);let m=_();return T(m.onPageSelected(t))}),a()}if(o&2){let e=_();u("currentPage",(e.data==null?null:e.data.currentPage)+1)("totalPages",e.data==null?null:e.data.totalPages)}}function ie(o,g){if(o&1){let e=P();i(0,"tr",10),c("click",function(){let t=x(e).$implicit,m=_();return T(m.onMfClick(t.time_stamp))}),i(1,"td"),l(2),p(3,"date"),a(),i(4,"td"),l(5),a(),i(6,"td"),l(7),p(8,"titlecase"),a(),i(9,"td"),l(10),p(11,"titlecase"),a(),i(12,"td"),l(13),a(),i(14,"td"),l(15),a(),i(16,"td",11),l(17),a()()}if(o&2){let e=g.$implicit;n(2),s(K(3,7,e.time_stamp,"MMM d, HH:mm")),n(3),s(e.receipt_num),n(2),s(d(8,10,e.source)),n(3),s(d(11,12,e.dest)),n(3),s(e.amount),n(2),s(e.initiator),n(2),s(e.description)}}var Z=(()=>{class o{data;showDetails;receiptSelected=new f;pageSelected=new f;screenSize=screen.width;onMfClick(e){this.showDetails&&this.receiptSelected.emit(e)}onPageSelected(e){this.pageSelected.emit(e)}static \u0275fac=function(r){return new(r||o)};static \u0275cmp=S({type:o,selectors:[["app-money-flow-table"]],inputs:{data:"data",showDetails:"showDetails"},outputs:{receiptSelected:"receiptSelected",pageSelected:"pageSelected"},standalone:!0,features:[C],decls:44,vars:38,consts:[[1,"table","is-narrow-touch","is-size-7-touch","is-size-6","has-text-centered","is-clipped"],[1,"m-0","p-0"],[1,"is-flex","is-justify-content-center","mb-1"],[3,"currentPage","totalPages"],[1,"has-text-centered"],[1,"has-text-centered","is-narrow"],[1,"has-text-centered","is-hidden-mobile"],[1,"is-hidden-mobile","has-text-centered","has-text-weight-bold"],[1,"has-text-centered","has-text-weight-bold"],[3,"pageSelected","currentPage","totalPages"],[3,"click"],[1,"is-hidden-mobile"]],template:function(r,t){r&1&&(i(0,"table",0)(1,"thead")(2,"tr")(3,"td",1)(4,"div",2),y(5,te,1,2,"app-pagination",3),a()()(),i(6,"tr")(7,"th",4),l(8),p(9,"translate"),a(),i(10,"th",4),l(11),p(12,"translate"),a(),i(13,"th",4),l(14),p(15,"translate"),a(),i(16,"th",5),l(17),p(18,"translate"),a(),i(19,"th",5),l(20),p(21,"translate"),a(),i(22,"th",5),l(23),p(24,"translate"),a(),i(25,"th",6),l(26),p(27,"translate"),a()()(),i(28,"tbody"),I(29,ie,18,14,"tr",null,N),a(),i(31,"tfoot")(32,"tr"),w(33,"td"),i(34,"td",7),l(35),a(),w(36,"td")(37,"td"),i(38,"td",8),l(39),a(),w(40,"td"),i(41,"td",8),l(42),p(43,"translate"),a()()()()),r&2&&(h("is-hoverable",t.showDetails)("is-hidden",!(!(t.data==null||t.data.moneyFlows==null)&&t.data.moneyFlows.length)),n(3),H("colspan",t.screenSize>500?7:6),n(2),E(t.data!=null&&t.data.totalPages&&t.data.totalPages>1?5:-1),n(3),s(d(9,22,"Date")),n(3),s(d(12,24,"Receipt")),n(3),s(d(15,26,"Source")),n(3),s(d(18,28,"Dest")),n(3),s(d(21,30,"Amount")),n(3),s(d(24,32,"Initiator")),n(3),s(d(27,34,"Description")),n(3),k(t.data==null?null:t.data.moneyFlows),n(2),h("is-hidden",!(t.data!=null&&t.data.totalPages)),n(4),V("",t.data==null||t.data.moneyFlows==null?null:t.data.moneyFlows.length,"/",t.data==null?null:t.data.transactionsNum,""),n(4),V("",t.data==null?null:t.data.totalSumPage,"/",t.data==null?null:t.data.totalSum,""),n(3),$("",d(43,36,"Page")," ",(t.data==null?null:t.data.currentPage)+1,"/",t.data==null?null:t.data.totalPages,""))},dependencies:[J,U,b,D,W],styles:[".min-width[_ngcontent-%COMP%]{min-width:80px}"]})}return o})();var ye=(()=>{class o{max_length=screen.width<500?7:18;transform(e,...r){if(e===void 0)return"";e=e.trim();let t=e.split(`
`);return t[0].length>=this.max_length&&(t[0]=t[0].substring(0,this.max_length)+"..."),t.length>1?`${t[0]} [+${t.length-1}]`:t[0]}static \u0275fac=function(r){return new(r||o)};static \u0275pipe=z({name:"transactionServicesPipe",type:o,pure:!0,standalone:!0})}return o})();function ne(o,g){if(o&1&&(i(0,"div",8),w(1,"i",10),l(2),a()),o&2){let e=g.$implicit;n(2),v(" ",e,"")}}function ae(o,g){if(o&1&&(i(0,"div",9),w(1,"app-money-flow-table",11),a()),o&2){let e=_(2);n(),u("data",e.relatedTransactions)}}function oe(o,g){o&1&&(l(0),p(1,"translate")),o&2&&v(" ",d(1,1,"Show Related Transactions")," ")}function le(o,g){o&1&&(l(0),p(1,"translate")),o&2&&v(" ",d(1,1,"Loading"),"... ")}function re(o,g){if(o&1){let e=P();i(0,"div",1)(1,"button",12),c("click",function(){x(e);let t=_(2);return T(t.onShowMoneyTransactionsClick(t.transaction.receipt_num,t.transaction.date_time))}),y(2,oe,2,3)(3,le,2,3),a()()}if(o&2){let e=_(2);n(2),E(e.requestFlag?3:2)}}function se(o,g){if(o&1){let e=P();i(0,"table",2)(1,"tr")(2,"th",3),l(3),p(4,"translate"),a(),i(5,"th",3),l(6),p(7,"translate"),a(),i(8,"th",4),l(9),p(10,"translate"),a(),i(11,"th",3),l(12),p(13,"translate"),a(),i(14,"th",4),l(15),p(16,"translate"),a(),i(17,"th",3),l(18),p(19,"translate"),a(),i(20,"th",3),l(21),p(22,"translate"),a()(),i(23,"tr")(24,"td",3),l(25),a(),i(26,"td",3),l(27),a(),i(28,"td",4),l(29),a(),i(30,"td",3),l(31),a(),i(32,"td",4),l(33),a(),i(34,"td",3),l(35),a(),i(36,"td",3)(37,"div",5)(38,"span",6),l(39),p(40,"translate"),i(41,"button",7),c("click",function(){x(e);let t=_();return T(t.unAssign(t.transaction.receipt_num))}),a()()()()()(),i(42,"div",1),I(43,ne,3,1,"div",8,j),a(),y(45,ae,2,1,"div",9)(46,re,4,1,"div",1)}if(o&2){let e=_();n(3),s(d(4,19,"Status")),n(3),s(d(7,21,"Free")),n(3),s(d(10,23,"Phone")),n(3),s(d(13,25,"Money accepted")),n(3),s(d(16,27,"Money posted")),n(3),s(d(19,29,"Payment type")),n(3),s(d(22,31,"Employee")),n(4),s(e.transaction.finished?"OK":"ERR"),n(2),s(e.transaction.has_free_haircut?"YES":"NO"),n(2),s(e.transaction.phone_num),n(2),s(e.transaction.money_accepted),n(2),s(e.transaction.money_posted),n(2),s(e.transaction.payment_type),n(2),h("is-invisible",e.transaction.employee.length<1),n(2),v(" ",d(40,33,e.transaction.employee)," "),n(2),h("is-hidden",e.authService.getAccessLevel()==1||!e.todaysTransaction(e.transaction.date_time)),n(2),k(e.allServices()),n(2),E(e.relatedTransactions?45:46)}}function pe(o,g){if(o&1){let e=P();i(0,"div",1)(1,"div",13),l(2,"No details available"),a(),i(3,"button",12),c("click",function(){x(e);let t=_();return T(t.closeDetails())}),i(4,"span"),l(5,"OK"),a()()()}}var Ae=(()=>{class o{httpService;authService;transaction;active=!1;closeEvent=new f;requestFlag=!1;relatedTransactions;constructor(e,r){this.httpService=e,this.authService=r}onShowMoneyTransactionsClick(e,r){!r||!e||(this.requestFlag=!0,this.httpService.getMoneyFlowsByReceiptNum(e,r).subscribe({next:t=>this.relatedTransactions={moneyFlows:t},complete:()=>this.requestFlag=!1}))}closeDetails(){this.closeEvent.emit(!0),this.relatedTransactions=void 0}allServices(){return this.transaction?.services.trim().split(`
`)}unAssign(e){this.closeEvent.emit(e),this.relatedTransactions=void 0}todaysTransaction(e){let r=new Date;return r.setHours(0,0,0),new Date(e)>r}static \u0275fac=function(r){return new(r||o)(R(G),R(Q))};static \u0275cmp=S({type:o,selectors:[["app-transaction-details"]],inputs:{transaction:"transaction",active:"active"},outputs:{closeEvent:"close"},standalone:!0,features:[C],decls:3,vars:2,consts:[[3,"close","active"],[1,"has-text-centered","my-1"],[1,"table","my-0","is-narrow-mobile","is-size-6","is-size-7-touch","is-fullwidth"],[1,"has-text-centered"],[1,"has-text-centered","is-hidden-mobile"],[1,"block"],[1,"tag","is-success","button"],[1,"delete","is-small",3,"click"],[1,"has-background-success-70","is-size-7-touch","has-text-weight-semibold"],[1,"is-flex","is-justify-content-center","my-3","my-2",2,"width","100%"],[1,"fa-solid","fa-scissors"],[3,"data"],[1,"button","is-small",3,"click"],[1,"box"]],template:function(r,t){r&1&&(i(0,"app-modal",0),c("close",function(){return t.closeDetails()}),y(1,se,47,35)(2,pe,6,0,"div",1),a()),r&2&&(u("active",t.active),n(),E(t.transaction?1:2))},dependencies:[Y,Z,b,D]})}return o})();var Ke=(()=>{class o{fromDateTime;toDateTime;dates=new f;constructor(){let e=new Date,r=new Date;e.setUTCHours(0),e.setMinutes(0),e.setSeconds(0),r.setUTCHours(23),r.setMinutes(59),r.setSeconds(0),this.toDateTime=r.toISOString().substring(0,19),this.fromDateTime=e.toISOString().substring(0,19)}ngOnInit(){setTimeout(()=>this.emitDates())}onDateChange(e){let r=e.target;r.getAttribute("id")==="fromDateTime"?this.fromDateTime=r.value:r.getAttribute("id")==="toDateTime"&&(this.toDateTime=r.value)}emitDates(){this.dates.emit({from:this.fromDateTime,to:this.toDateTime})}static \u0275fac=function(r){return new(r||o)};static \u0275cmp=S({type:o,selectors:[["app-date-between"]],outputs:{dates:"dates"},standalone:!0,features:[C],decls:22,vars:11,consts:[[1,"container","is-max-tablet","my-2"],[1,"columns","is-centered"],[1,"column","is-narrow"],[1,"field","has-addons","is-justify-content-center"],[1,"control"],[1,"button","is-static","min-width","is-size-7-touch"],["type","datetime-local","id","fromDateTime",1,"input","is-size-7-touch",3,"change","value"],["type","datetime-local","id","toDateTime",1,"input","is-size-7-touch",3,"change","value"],[1,"column","is-narrow","has-text-centered"],[1,"button","is-size-7-touch",3,"click"]],template:function(r,t){r&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"p",4)(5,"a",5),l(6),p(7,"translate"),a()(),i(8,"p",4)(9,"input",6),c("change",function(B){return t.onDateChange(B)}),a()()()(),i(10,"div",2)(11,"div",3)(12,"p",4)(13,"a",5),l(14),p(15,"translate"),a()(),i(16,"p",4)(17,"input",7),c("change",function(B){return t.onDateChange(B)}),a()()()(),i(18,"div",8)(19,"button",9),c("click",function(){return t.emitDates()}),l(20),p(21,"translate"),a()()()()),r&2&&(n(6),v("",d(7,5,"From"),":"),n(3),u("value",t.fromDateTime),n(5),v("",d(15,7,"To"),":"),n(3),u("value",t.toDateTime),n(3),s(d(21,9,"Show")))},dependencies:[b,D]})}return o})();export{ye as a,W as b,Z as c,Ae as d,Ke as e};