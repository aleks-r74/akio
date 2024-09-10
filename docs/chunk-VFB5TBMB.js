import{a as N,b as A,d as H,e as J,f as G}from"./chunk-2DG3WP5B.js";import{h as O}from"./chunk-YE6UFMUY.js";import"./chunk-ZZGPOI5M.js";import{Ca as L,Ha as g,Ja as h,Ka as M,Ma as y,Na as D,Pa as I,Qa as F,Ra as o,Rb as z,Sa as s,Ta as R,W as T,Wa as S,Xa as _,Ya as p,a as B,b as V,bc as P,cc as k,da as j,dc as $,ea as f,ec as q,fa as v,fb as l,gb as c,hb as w,kb as E,ma as x,ob as m,pb as d,qb as U,ua as a,va as b}from"./chunk-EFT7P6D7.js";function Z(i,u){if(i&1){let e=S();o(0,"div",0)(1,"app-pagination",9),_("pageSelected",function(t){f(e);let r=p();return v(r.onPageNumClick(t))}),s()()}if(i&2){let e=p();a(),h("currentPage",e.currentPage)("totalPages",e.totalPages)}}function ee(i,u){if(i&1){let e=S();o(0,"span",17),_("click",function(){let t=f(e).$implicit,r=p(2).$implicit,C=p();return v(C.onEmployeeSelected(r,t))}),l(1),s()}if(i&2){let e=u.$implicit,n=p(2).$implicit;M("is-info",n.employee===e),a(),c(e)}}function te(i,u){if(i&1&&I(0,ee,2,3,"span",16,D),i&2){let e=p(2);F(e.employeeList)}}function ie(i,u){if(i&1&&(o(0,"span",15),l(1),m(2,"translate"),s()),i&2){let e=p().$implicit;a(),w(" ",e.employee?e.employee:d(2,1,"Not assigned")," ")}}function ne(i,u){if(i&1){let e=S();o(0,"tr")(1,"td",10),l(2),m(3,"date"),s(),o(4,"td",10),l(5),s(),o(6,"td",10),l(7),s(),o(8,"td",11),_("click",function(){let t=f(e).$implicit,r=p();return v(r.onTransactionClick(t))}),o(9,"div",12),l(10),m(11,"transactionServicesPipe"),s()(),o(12,"td",13)(13,"div",14),g(14,te,2,0)(15,ie,3,3,"span",15),s()()()}if(i&2){let e=u.$implicit,n=p();a(2),c(U(3,5,e.date_time,"MMM d, HH:mm")),a(3),c(e.receipt_num),a(2),c(e.money_accepted),a(3),c(d(11,8,e.services)),a(4),y((e.employee===""||!e.readonly)&&n.authService.getAccessLevel()>1?14:15)}}function ae(i,u){if(i&1&&R(0,"app-page-summary",7),i&2){let e=p();h("pageSum",e.httpResponse.pageSum)("transactionNum",e.httpResponse.count)("transactionSum",e.httpResponse.sum)}}var W=(()=>{class i{authService;transactionUpd=new x;pageSelected=new x;httpResponse;employeeList;totalPages;currentPage;transactionDetails;showDetails=!1;constructor(e){this.authService=e}ngOnChanges(e){e.httpResponse&&(this.totalPages=this.httpResponse?.totalPages,this.currentPage=this.httpResponse?.currentPage,this.currentPage=this.currentPage?this.currentPage+1:1)}onPageNumClick(e){this.pageSelected.emit(e)}onTransactionClick(e){this.transactionDetails=e,this.showDetails=!0}onEmployeeSelected(e,n){e.employee=n,this.transactionUpd.emit()}static \u0275fac=function(n){return new(n||i)(b(O))};static \u0275cmp=T({type:i,selectors:[["app-transactions-table"]],inputs:{httpResponse:"httpResponse",employeeList:"employeeList"},outputs:{transactionUpd:"transactionUpd",pageSelected:"pageSelected"},standalone:!0,features:[j,E],decls:24,vars:19,consts:[[1,"is-flex","is-justify-content-end","my-1"],[1,"table","is-hoverable","is-striped","my-1"],[1,"has-background-danger-95"],[1,"has-text-centered","is-size-7","date-time"],[1,"has-text-centered","is-size-7"],[1,"has-text-centered","is-size-7","services"],[1,"has-text-centered","is-size-7","employee"],[3,"pageSum","transactionNum","transactionSum"],[3,"close","active","transaction"],[3,"pageSelected","currentPage","totalPages"],[1,"has-text-centered","is-vcentered","is-size-7"],[1,"has-text-left",3,"click"],[1,"is-size-7"],[1,"p-1","is-size-5","p-1","is-size-5","is-vcentered"],[1,"tags","is-centered"],[1,"tag","is-info","is-light",2,"min-width","100px"],[1,"tag","is-hoverable",3,"is-info"],[1,"tag","is-hoverable",3,"click"]],template:function(n,t){n&1&&(g(0,Z,2,2,"div",0),o(1,"table",1)(2,"thead")(3,"tr",2)(4,"th",3),l(5),m(6,"translate"),s(),o(7,"th",4),l(8),m(9,"translate"),s(),o(10,"th",4),l(11),m(12,"translate"),s(),o(13,"th",5),l(14),m(15,"translate"),s(),o(16,"th",6),l(17),m(18,"translate"),s()()(),o(19,"tbody"),I(20,ne,16,10,"tr",null,D),s()(),g(22,ae,1,3,"app-page-summary",7),o(23,"app-transaction-details",8),_("close",function(){return t.showDetails=!1}),s()),n&2&&(y(t.currentPage&&t.totalPages?0:-1),a(5),c(d(6,9,"Date-time")),a(3),c(d(9,11,"Receipt")),a(3),c(d(12,13,"Paid")),a(3),c(d(15,15,"Services")),a(3),c(d(18,17,"Employee")),a(3),F(t.httpResponse==null?null:t.httpResponse.transactionsOnThePage),a(2),y(t.httpResponse?22:-1),a(),h("active",t.showDetails)("transaction",t.transactionDetails))},dependencies:[N,H,J,z,A,k,P],styles:[".date-time[_ngcontent-%COMP%]{min-width:90px}.services[_ngcontent-%COMP%]{min-width:250px}.employee[_ngcontent-%COMP%]{min-width:100px}"]})}return i})();function oe(i,u){if(i&1&&(o(0,"div",1)(1,"span",4),l(2),s(),o(3,"span",5),l(4),s()()),i&2){let e=u.$implicit;a(2),w("",e.name,":"),a(2),c(e.sum)}}var X=(()=>{class i{employeeCalcs;saveClick=new x;resetClick=new x;onSaveClick(){this.saveClick.emit()}onResetClick(){this.resetClick.emit()}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=T({type:i,selectors:[["app-employee-total"]],inputs:{employeeCalcs:"employeeCalcs"},outputs:{saveClick:"saveClick",resetClick:"resetClick"},standalone:!0,features:[E],decls:9,vars:6,consts:[[1,"container","has-text-centered","is-flex-mobile","is-justify-content-center"],[1,"tags","has-addons","m-1","p-1","is-centered"],[1,"tag","is-hoverable","is-danger","my-2","mx-1",2,"width","100px",3,"click"],[1,"tag","is-hoverable","is-primary","my-2","mx-1",2,"width","100px",3,"click"],[1,"tag","is-info","fixed-width-tag"],[1,"tag","is-white","has-text-weight-semibold","fixed-width-tag"]],template:function(n,t){n&1&&(o(0,"div",0),I(1,oe,5,2,"div",1,D),o(3,"div",2),_("click",function(){return t.onResetClick()}),l(4),m(5,"translate"),s(),o(6,"div",3),_("click",function(){return t.onSaveClick()}),l(7),m(8,"translate"),s()()),n&2&&(a(),F(t.employeeCalcs),a(3),c(d(5,2,"Reset")),a(3),c(d(8,4,"Save")))},dependencies:[k,P],styles:[".fixed-width-tag[_ngcontent-%COMP%]{min-width:50px;white-space:nowrap}"]})}return i})();function se(i,u){i&1&&(o(0,"p"),l(1),m(2,"translate"),s()),i&2&&(a(),w("",d(2,1,"Loading")," ..."))}function re(i,u){if(i&1&&R(0,"app-error",3),i&2){let e=p();h("error",e.errors())}}function le(i,u){if(i&1){let e=S();o(0,"div",8)(1,"app-employee-total",9),_("saveClick",function(){f(e);let t=p();return v(t.saveTransactions())})("resetClick",function(){f(e);let t=p();return v(t.onResetClick())}),s()()}if(i&2){let e=p();a(),h("employeeCalcs",e.emloyeeCalcs)}}var Ve=(()=>{class i{httpService;authService;fromDateTime;toDateTime;employees;emloyeeCalcs;savedCalcs;response;dates;errors=L(void 0);requestFlag=!1;constructor(e,n){this.httpService=e,this.authService=n;let t=new Date,r=new Date;t.setUTCHours(0),t.setMinutes(0),t.setSeconds(0),r.setUTCHours(23),r.setMinutes(59),r.setSeconds(0),this.toDateTime=r.toISOString().substring(0,19),this.fromDateTime=t.toISOString().substring(0,19)}calculateEmployeeTransactions(){if(!this.employees)return;let e=[];for(let n of this.employees){let t=this.response?.transactionsOnThePage.filter(r=>r.employee===n&&!r.readonly).map(r=>r.money_accepted).reduce((r,C)=>r+C,0);t=t||0,this.savedCalcs?.has(n)&&(t+=this.savedCalcs?.get(n)),e.push({name:n,sum:t})}this.emloyeeCalcs=e}onEmployeeSet(){this.calculateEmployeeTransactions()}onResetClick(){this.response?.transactionsOnThePage.forEach(e=>{e.readonly||(e.employee="")}),this.calculateEmployeeTransactions()}onDatesSelected(e){this.dates=e,this.loadData(1)}onPageSelected(e){this.loadData(e)}loadData(e){this.requestFlag=!0,this.httpService.getTransactions(this.dates,e-1).subscribe({next:n=>{this.response=V(B({},n),{transactionsOnThePage:n.transactionsOnThePage.map(t=>(t.employee&&(t.readonly=!0),t))}),this.savedCalcs=new Map(Object.entries(n.employeesSum)),this.employees=Array.from(this.savedCalcs.keys())},error:n=>this.errors.set(n),complete:()=>{this.requestFlag=!1,this.onResetClick()}})}saveTransactions(){this.requestFlag=!0,this.response&&this.httpService.updateTransactionsEmployees(this.response.transactionsOnThePage).subscribe({error:e=>{this.errors.set(e)},complete:()=>{this.loadData(this.response.currentPage+1)}})}static \u0275fac=function(n){return new(n||i)(b(q),b(O))};static \u0275cmp=T({type:i,selectors:[["app-transactions"]],standalone:!0,features:[E],decls:10,vars:6,consts:[[1,"my-3"],[3,"dates"],[1,"is-flex","is-justify-content-center","mt-1"],[3,"error"],[1,"container","mt-1"],[1,"columns","is-centered"],[1,"column","is-two-thirds-desktop","is-three-quarters-tablet","is-flex","is-justify-content-center","is-offset-1"],[3,"transactionUpd","pageSelected","httpResponse","employeeList"],[1,"column","is-2","my-1","p-0","is-flex","is-justify-content-center"],[3,"saveClick","resetClick","employeeCalcs"]],template:function(n,t){n&1&&(R(0,"div",0),o(1,"app-date-between",1),_("dates",function(C){return t.onDatesSelected(C)}),s(),o(2,"div",2),g(3,se,3,3,"p")(4,re,1,1,"app-error",3),s(),o(5,"div",4)(6,"div",5)(7,"div",6)(8,"app-transactions-table",7),_("transactionUpd",function(){return t.onEmployeeSet()})("pageSelected",function(C){return t.onPageSelected(C)}),s()(),g(9,le,2,1,"div",8),s()()),n&2&&(a(2),M("is-invisible",!t.requestFlag),a(),y(t.errors()?4:3),a(5),h("httpResponse",t.response)("employeeList",t.employees),a(),y(t.authService.getAccessLevel()>1?9:-1))},dependencies:[W,X,G,$,k,P]})}return i})();export{Ve as TransactionsComponent};