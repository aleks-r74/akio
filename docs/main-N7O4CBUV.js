import{a as ve}from"./chunk-JBKCUW6I.js";import{a as pe,b as N,c as ce,d as D,e as H,f as de,g as ue,h as b}from"./chunk-QGIE6CRT.js";import{a as xe}from"./chunk-L4HLJOSY.js";import{$ as ee,$b as Y,Ca as te,Ha as f,J as W,Ja as x,Ka as j,M as X,Ma as v,Na as L,Oa as ie,Pa as I,Qa as k,Ra as n,S as B,Sa as a,Ta as h,Tb as re,Ub as oe,W as _,Wa as R,Xa as y,Ya as d,Zb as le,_b as se,ac as me,bc as fe,cb as Q,cc as q,da as O,db as G,dc as E,ea as F,eb as K,ec as C,fa as A,fb as l,fc as V,gb as s,gc as he,hb as w,hc as z,lb as S,mb as ne,qb as m,rb as c,sb as J,ua as o,va as g,zb as ae}from"./chunk-EB4YEUVP.js";function Me(e,p){if(e&1&&(n(0,"td",5),l(1),a(),n(2,"td",5),l(3),a()),e&2){let t=d().$implicit,i=d();o(),s(t),o(2),s(i.expenses==null?null:i.expenses.get(t))}}function Fe(e,p){if(e&1&&(n(0,"td"),l(1),a(),n(2,"td"),l(3),a()),e&2){let t=d().$implicit,i=d();o(),s(t),o(2),s(i.expenses==null?null:i.expenses.get(t))}}function Ae(e,p){if(e&1&&(n(0,"tr"),f(1,Me,4,2)(2,Fe,4,2),a()),e&2){let t=p.$index,i=p.$count;o(),v(t===i-1?1:2)}}var _e=(()=>{class e{summary;expenses;showSpendings=!1;ngOnChanges(t){if(t.summary&&this.summary?.expenses){this.expenses=new Map(Object.entries(this.summary.expenses));let i=0;for(let r of this.expenses?.values())i+=r;this.expenses.set("Total",i)}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=_({type:e,selectors:[["app-summary-table"]],inputs:{summary:"summary"},standalone:!0,features:[O,S],decls:55,vars:32,consts:[[1,"container","is-max-tablet"],[1,"is-flex","is-justify-content-center","is-size-7-mobile"],[1,"table","m-0","p-0"],[1,"has-text-centered"],[3,"click"],[1,"has-text-weight-bold"],[1,"has-text-danger","has-text-centered"],[1,"tags","has-addons","is-justify-content-center","mt-4"],[1,"tag","is-warning","has-text-weight-bold","is-size-6","is-size-7-mobile"],[1,"tag","is-info","has-text-weight-bold","is-size-6","is-size-7-mobile"],[3,"close","active"],[1,"table","is-size-7"],["colspan","2",1,"has-text-centered"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"div",1)(2,"table",2)(3,"tr")(4,"th"),l(5),m(6,"translate"),a(),n(7,"td",3),l(8),a()(),n(9,"tr",4),y("click",function(){return r.showSpendings=!0}),n(10,"th"),l(11),m(12,"translate"),a(),n(13,"td",3)(14,"a",5),l(15),a()()(),n(16,"tr")(17,"th"),l(18),m(19,"translate"),a(),n(20,"td",3),l(21),a()()(),n(22,"table",2)(23,"tr")(24,"th"),l(25),m(26,"translate"),a(),n(27,"td",3),l(28),a()(),n(29,"tr")(30,"th"),l(31),m(32,"translate"),a(),n(33,"td",3),l(34),a()(),n(35,"tr")(36,"th"),l(37),m(38,"translate"),a(),n(39,"td",6),l(40),a()()()(),n(41,"div",7)(42,"span",8),l(43),m(44,"translate"),a(),n(45,"span",9),l(46),a()()(),n(47,"app-modal",10),y("close",function(){return r.showSpendings=!1}),n(48,"table",11)(49,"tr")(50,"th",12),l(51),m(52,"translate"),a()(),I(53,Ae,3,1,"tr",null,L),a()()),i&2&&(o(5),s(c(6,16,"Total revenue")),o(3),s(r.summary==null?null:r.summary.totalRevenue),o(3),s(c(12,18,"Total spendings")),o(4),s(r.expenses==null?null:r.expenses.get("Total")),o(3),w("",c(19,20,"Cash")," "),o(3),s(r.summary==null?null:r.summary.totalCash),o(4),s(c(26,22,"Total receipts")),o(3),s(r.summary==null?null:r.summary.totalReceipts),o(3),s(c(32,24,"Free haircuts")),o(3),s(r.summary==null?null:r.summary.freeHaircuts),o(3),w("",c(38,26,"Not assigned receipts")," "),o(3),s(r.summary==null?null:r.summary.notAssignedTransactions),o(3),s(c(44,28,"Net revenue")),o(3),s(r.summary==null?null:r.summary.netRevenue),o(),x("active",r.showSpendings),o(4),s(c(52,30,"Total spendings")),o(2),k(r.expenses==null?null:r.expenses.keys()))},dependencies:[C,E,xe]})}return e})();function Le(e,p){e&1&&(n(0,"tr",7)(1,"th",6),l(2),m(3,"translate"),a(),n(4,"th",6),l(5),m(6,"translate"),a(),n(7,"th",6),l(8),m(9,"translate"),a(),n(10,"th",6),l(11),m(12,"translate"),a(),n(13,"th",6),l(14),m(15,"translate"),a(),n(16,"th",9),l(17),m(18,"translate"),a()()),e&2&&(o(2),s(c(3,6,"Name")),o(3),s(c(6,8,"Receipts")),o(3),s(c(9,10,"Gross")),o(3),s(c(12,12,"Free Cuts")),o(3),s(c(15,14,"Salary")),o(3),s(c(18,16,"Balance")))}function Be(e,p){if(e&1&&(f(0,Le,19,18,"tr",7),n(1,"tr")(2,"td"),l(3),a(),n(4,"td"),l(5),a(),n(6,"td"),l(7),a(),n(8,"td"),l(9),a(),n(10,"td"),l(11),a(),n(12,"td",8),l(13),a()()),e&2){let t=p.$implicit,i=p.$index,r=d();v(i===0?0:-1),o(3),s(t.name),o(2),s(t.receipts),o(2),s(t.grossRev),o(2),s(t.freeHaircuts),o(2),s(t.salary),o(2),s(r.balances==null?null:r.balances.get(t.name))}}function Re(e,p){e&1&&(n(0,"tr")(1,"td"),l(2),m(3,"translate"),a()()),e&2&&(o(2),s(c(3,1,"Users summary not available")))}function Pe(e,p){}function $e(e,p){if(e&1&&(n(0,"td",10),l(1),m(2,"date"),a()),e&2){let t=d(2).$implicit,i=d().$implicit,r=d();x("rowSpan",r.rowSpan.get(i)),o(),s(J(2,2,t.date,"MMM d"))}}function Oe(e,p){if(e&1&&f(0,$e,3,5,"td",10),e&2){let t=d().$index;v(t==0?0:-1)}}function je(e,p){if(e&1&&(n(0,"td"),l(1),m(2,"date"),a()),e&2){let t=d().$implicit;o(),s(J(2,1,t.date,"MMM d"))}}function Ne(e,p){if(e&1&&(n(0,"tr"),f(1,Oe,1,1)(2,je,3,4,"td"),n(3,"td"),l(4),a(),n(5,"td"),l(6),a(),n(7,"td"),l(8),a(),n(9,"td"),l(10),a(),n(11,"td"),l(12),a(),n(13,"td"),l(14),a()()),e&2){let t=p.$implicit,i=d().$implicit,r=d();o(),v(r.rowSpan.get(i)?1:2),o(3),s(t.name),o(2),s(t.receipts),o(2),s(t.grossRev),o(2),s(t.freeHaircuts),o(2),s(t.salary),o(2),s(t.paid)}}function De(e,p){if(e&1&&(f(0,Pe,0,0),I(1,Ne,15,7,"tr",null,L)),e&2){let t,i=p.$implicit,r=p.$index,u=d();v(r===0?0:-1),o(),k((t=u.map.get(i))==null?null:t.values())}}var ye=(()=>{class e{balances;employeeSummary;map=new Map;dates=[];rowSpan=new Map;reducedSummary=new Map;ngOnChanges(t){if(t.balances&&(this.balances=new Map(Object.entries(t.balances.currentValue))),!!t.employeeSummary){this.map=new Map(Object.entries(this.employeeSummary)),this.rowSpan.clear(),this.reducedSummary.clear(),this.dates=Object.keys(this.employeeSummary);for(let i of this.dates)if(this.map.get(i)){this.map.get(i).length>1&&this.rowSpan.set(i,this.map.get(i).length);for(let r of this.map.get(i)){let u=this.reducedSummary.get(r.name);u||(u={receipts:0,freeHaircuts:0,salary:0,paid:0,grossRev:0,date:"",name:""}),this.reducedSummary.set(r.name,{date:"",name:r.name,receipts:u.receipts+r.receipts,grossRev:u.grossRev+r.grossRev,freeHaircuts:u.freeHaircuts+r.freeHaircuts,salary:u.salary+r.salary,paid:u.paid+r.paid})}}}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=_({type:e,selectors:[["app-summary-employees"]],inputs:{balances:"balances",employeeSummary:"employeeSummary"},standalone:!0,features:[O,S],decls:36,vars:22,consts:[[1,"container","is-max-tablet"],[1,"is-flex","is-justify-content-center"],[1,"table","is-narrow","is-striped","is-bordered","has-text-centered","is-size-7-mobile","my-5","ml-4","pl-4"],[1,"table-container"],[1,"table","is-striped","is-bordered","is-narrow-mobile","has-text-centered","is-size-7-mobile","my-2"],[1,"is-primary"],[1,"has-text-centered"],[1,"is-info"],[1,"left-border"],[1,"has-text-centered","left-border"],[1,"is-vcentered",3,"rowSpan"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"div",1)(2,"table",2)(3,"tbody"),I(4,Be,14,7,"tr",null,L,!1,Re,4,3,"tr"),a()()(),n(7,"div",1)(8,"div",3)(9,"table",4)(10,"thead")(11,"tr",5)(12,"th",6),l(13),m(14,"translate"),a(),n(15,"th",6),l(16),m(17,"translate"),a(),n(18,"th",6),l(19),m(20,"translate"),a(),n(21,"th",6),l(22),m(23,"translate"),a(),n(24,"th",6),l(25),m(26,"translate"),a(),n(27,"th",6),l(28),m(29,"translate"),a(),n(30,"th",6),l(31),m(32,"translate"),a()()(),n(33,"tbody"),I(34,De,3,1,null,null,L),a()()()()()),i&2&&(o(4),k(r.reducedSummary.values()),o(9),s(c(14,8,"Date")),o(3),s(c(17,10,"Name")),o(3),s(c(20,12,"Receipts")),o(3),s(c(23,14,"Gross")),o(3),s(c(26,16,"Free Cuts")),o(3),s(c(29,18,"Salary")),o(3),s(c(32,20,"Paid")),o(3),k(r.dates))},dependencies:[C,E,re],styles:[".left-border[_ngcontent-%COMP%]{border-left:5px solid #20c200!important;border-width:10px}.table-container[_ngcontent-%COMP%]{position:relative;max-height:350px;overflow-y:auto}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]{position:sticky;z-index:2}thead[_ngcontent-%COMP%]{top:0}tfoot[_ngcontent-%COMP%]{bottom:0}"]})}return e})();function qe(e,p){if(e&1&&h(0,"app-summary-table",5),e&2){let t=d(2);x("summary",t.summary.summary)}}function Ve(e,p){if(e&1&&(f(0,qe,1,1,"app-summary-table",5),h(1,"app-summary-employees",4)),e&2){let t=d();v(t.authService.getAccessLevel()>1?0:-1),o(),x("employeeSummary",t.summary.employees)("balances",t.summary.summary.balances)}}var Se=(()=>{class e{httpService;authService;constructor(t,i){this.httpService=t,this.authService=i}summary;error=te(void 0);requestFlag=!1;onDateSelected(t){t!=""&&(setTimeout(()=>this.requestFlag=!0),this.httpService.getSummary(t).subscribe({next:i=>{i&&(this.summary=i)},error:i=>{this.error.set(i),this.requestFlag=!1},complete:()=>{this.error.set(void 0),this.requestFlag=!1}}))}static \u0275fac=function(i){return new(i||e)(g(z),g(b))};static \u0275cmp=_({type:e,selectors:[["app-summary"]],standalone:!0,features:[S],decls:7,vars:8,consts:[[3,"dateMonthSelected","label"],[1,"is-flex","is-justify-content-center","my-1","loading"],[1,"is-size-7"],[3,"error"],[3,"employeeSummary","balances"],[3,"summary"]],template:function(i,r){i&1&&(n(0,"app-date-month",0),y("dateMonthSelected",function($){return r.onDateSelected($)}),a(),n(1,"div",1)(2,"p",2),l(3),m(4,"translate"),a(),h(5,"app-error",3),a(),f(6,Ve,2,3,"app-summary-employees",4)),i&2&&(x("label","Summary for "+r.authService.getUsername()),o(2),j("is-hidden",!r.requestFlag),o(),w("",c(4,6,"Loading")," ..."),o(2),x("error",r.error()),o(),v(r.summary?6:-1))},dependencies:[ve,_e,ye,V,C,E],styles:[".loading[_ngcontent-%COMP%]{min-height:25px}"]})}return e})();var ze=()=>({exact:!0});function Ue(e,p){e&1&&(n(0,"div",0)(1,"ul")(2,"li",1)(3,"a",2)(4,"span"),l(5),m(6,"translate"),a()()(),n(7,"li",3)(8,"a",4)(9,"span"),l(10),m(11,"translate"),a()()(),n(12,"li",3)(13,"a",5)(14,"span"),l(15),m(16,"translate"),a()()()()()),e&2&&(o(2),x("routerLinkActiveOptions",ne(10,ze)),o(3),s(c(6,4,"Money")),o(5),s(c(11,6,"Expenses")),o(5),s(c(16,8,"6th haircuts")))}var Ce=(()=>{class e{authService;constructor(t){this.authService=t}static \u0275fac=function(i){return new(i||e)(g(b))};static \u0275cmp=_({type:e,selectors:[["app-money"]],standalone:!0,features:[S],decls:2,vars:1,consts:[[1,"tabs","is-boxed","mt-3"],["routerLinkActive","is-active",3,"routerLinkActiveOptions"],["routerLink","./"],["routerLinkActive","is-active"],["routerLink","expenses"],["routerLink","6thcuts"]],template:function(i,r){i&1&&(f(0,Ue,17,11,"div",0),h(1,"router-outlet")),i&2&&v(r.authService.getAccessLevel()==3?0:-1)},dependencies:[ue,N,D,H,C,E],styles:[".sticky-header[_ngcontent-%COMP%]{position:sticky;top:0;background-color:#f5f5f5;z-index:1}"]})}return e})();var Qe=["username"],Ge=["password"];function Ke(e,p){e&1&&(n(0,"p",3),l(1,"Loading ..."),a())}var ge=(()=>{class e{httpService;authService;userInput;passInput;errorResponse;requestFlag=!1;constructor(t,i){this.httpService=t,this.authService=i}login(){let t=(this.userInput?.nativeElement).value,i=(this.passInput?.nativeElement).value;this.requestFlag=!0,this.authService.login(t,i).subscribe({error:r=>{r.status===406?this.errorResponse={error:!0,message:"Invalid username or password"}:r.status===423?this.errorResponse={error:!0,message:"You're temporarily locked out. Try again in 5 minutes"}:this.errorResponse=r,this.requestFlag=!1},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0}})}static \u0275fac=function(i){return new(i||e)(g(z),g(b))};static \u0275cmp=_({type:e,selectors:[["app-login"]],viewQuery:function(i,r){if(i&1&&(Q(Qe,5),Q(Ge,5)),i&2){let u;G(u=K())&&(r.userInput=u.first),G(u=K())&&(r.passInput=u.first)}},standalone:!0,features:[S],decls:23,vars:2,consts:[["username",""],["password",""],[1,"is-flex","is-justify-content-center","mt-1"],[2,"position","absolute"],[1,"hero","is-light","is-fullheight"],[1,"m-5"],[1,"container"],[1,"columns","is-centered"],[1,"column","is-5-tablet","is-4-desktop","is-3-widescreen"],["action","",1,"box"],[1,"field"],["for","",1,"label"],["type","text",1,"input"],["type","password",1,"input"],[3,"error"],["type","button",1,"button","is-info",3,"click"]],template:function(i,r){if(i&1){let u=R();n(0,"div",2),f(1,Ke,2,0,"p",3),a(),n(2,"section",4)(3,"div",5)(4,"div",6)(5,"div",7)(6,"div",8)(7,"form",9)(8,"div",10)(9,"label",11),l(10,"Username"),a(),h(11,"input",12,0),a(),n(13,"div",10)(14,"label",11),l(15,"Password"),a(),h(16,"input",13,1),a(),n(18,"div",10),h(19,"app-error",14),a(),n(20,"div",10)(21,"button",15),y("click",function(){return F(u),A(r.login())}),l(22," Login "),a()()()()()()()()}i&2&&(o(),v(r.requestFlag?1:-1),o(18),x("error",r.errorResponse))},dependencies:[V]})}return e})();var T=(e,p)=>{let t=B(ce);return B(b).isAuthenticated()?!0:(t.navigate(["/login"]),!1)};var be=[{path:"summary",canActivate:[T],component:Se},{path:"transactions",canActivate:[T],loadComponent:()=>import("./chunk-FZUUBOGN.js").then(e=>e.TransactionsComponent)},{path:"money",canActivate:[T],component:Ce,children:[{path:"",canActivate:[T],loadComponent:()=>import("./chunk-QSCSYBJ4.js").then(e=>e.MoneyManagementComponent)},{path:"expenses",canActivate:[T],loadComponent:()=>import("./chunk-MSBUNDJ4.js").then(e=>e.ExpensesComponent)},{path:"6thcuts",canActivate:[T],loadComponent:()=>import("./chunk-EHILKW4D.js").then(e=>e.SixthCutsComponent)}]},{path:"schedule",canActivate:[T],loadComponent:()=>import("./chunk-5YYWOOVJ.js").then(e=>e.ScheduleComponent)},{path:"users",canActivate:[T],loadComponent:()=>import("./chunk-PAG7AKHE.js").then(e=>e.UsersComponent)},{path:"login",component:ge},{path:"**",redirectTo:"/summary"}];var Ee=(()=>{class e{constructor(){}intercept(t,i){let r=B(b),u=t.clone({setHeaders:{Authorization:`Bearer ${r.getToken()}`,"Content-Type":"application/json"}});return i.handle(u).pipe(W({error:$=>{$.status===401&&r.logout()}}))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=X({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Je(e,p){if(e&1){let t=R();n(0,"a",11),y("click",function(){F(t);let r=d(3);return A(r.onBurgerClick())}),l(1),m(2,"translate"),a()}if(e&2){let t=d().$implicit;x("routerLink",t.url),o(),w(" ",c(2,2,t.text)," ")}}function Ye(e,p){if(e&1&&f(0,Je,3,4,"a",10),e&2){let t=p.$implicit,i=d(2);v(t.access_level<=i.authService.getAccessLevel()?0:-1)}}function Ze(e,p){if(e&1&&I(0,Ye,1,1,null,null,ie),e&2){let t=d();k(t.links)}}function We(e,p){if(e&1){let t=R();n(0,"button",12),y("click",function(){F(t);let r=d();return A(r.logout())}),n(1,"span"),l(2,"Exit"),a(),n(3,"span",13),h(4,"i",14),a()(),n(5,"a",15),y("click",function(){F(t);let r=d();return A(r.logout())}),l(6,"Logout"),a()}}var Te=(()=>{class e{authService;translate;menuActive=!1;language="EN";links=[{text:"Summary",url:"summary",access_level:1},{text:"Transactions",url:"transactions",access_level:1},{text:"Money",url:"money",access_level:1},{text:"Schedule",url:"schedule",access_level:1},{text:"Users",url:"users",access_level:3}];constructor(t,i){this.authService=t,this.translate=i}logout(){this.authService.logout()}onBurgerClick(){this.menuActive=!this.menuActive}changeLang(){this.translate.use(this.language.toLowerCase()),this.language==="RU"?this.language="EN":this.language="RU"}static \u0275fac=function(i){return new(i||e)(g(b),g(q))};static \u0275cmp=_({type:e,selectors:[["app-navbar"]],standalone:!0,features:[S],decls:17,vars:5,consts:[["role","navigation",1,"navbar","is-info"],[1,"navbar-brand"],[1,"navbar-item","has-text-weight-bold","has-text-light"],["role","button","aria-label","menu","aria-expanded","true","data-target","mainMenu",1,"navbar-burger",3,"click"],["aria-hidden","true"],["id","mainMenu",1,"navbar-menu",3,"click"],[1,"navbar-start"],[1,"navbar-end"],[1,"buttons"],[1,"button","is-small","mx-0","is-info","has-text-white","is-hidden-touch",3,"click"],["routerLinkActive","'has-background-light has-text-dark'",1,"navbar-item","has-text-light",3,"routerLink"],["routerLinkActive","'has-background-light has-text-dark'",1,"navbar-item","has-text-light",3,"click","routerLink"],["alt","Log out",1,"button","is-small","mx-2","is-info","has-text-white","is-hidden-touch",3,"click"],[1,"icon","is-small"],[1,"fas","fa-sign-out-alt"],["alt","Log out",1,"navbar-item","has-text-light","is-hidden-desktop",3,"click"]],template:function(i,r){i&1&&(n(0,"nav",0)(1,"div",1)(2,"span",2),l(3,"AKIO"),a(),n(4,"a",3),y("click",function(){return r.onBurgerClick()}),h(5,"span",4)(6,"span",4)(7,"span",4)(8,"span",4),a()(),n(9,"div",5),y("click",function(){return r.menuActive=!1}),n(10,"div",6),f(11,Ze,2,0),a(),n(12,"div",7)(13,"div",8)(14,"button",9),y("click",function(){return r.changeLang()}),l(15),a(),f(16,We,7,0),a()()()()),i&2&&(o(9),j("is-active",r.menuActive),o(2),v(r.authService.isAuthenticated()?11:-1),o(4),s(r.language),o(),v(r.authService.isAuthenticated()?16:-1))},dependencies:[D,H,C,E],styles:["@media (max-width: 1024px){.navbar-menu.is-active[_ngcontent-%COMP%]{position:absolute;width:100%}}"]})}return e})();var U=class{http;prefix;suffix;constructor(p,t="/assets/i18n/",i=".json"){this.http=p,this.prefix=t,this.suffix=i}getTranslation(p){return this.http.get(`${this.prefix}${p}${this.suffix}`)}};function Ie(e){return new U(e,`${he.assetPath}/assets/i18n/`,".json")}var ke=(()=>{class e{translate;title="Akio";constructor(t){this.translate=t,t.addLangs(["en","ru"]),this.translate.setDefaultLang("ru")}static \u0275fac=function(i){return new(i||e)(g(q))};static \u0275cmp=_({type:e,selectors:[["app-root"]],standalone:!0,features:[S],decls:4,vars:0,consts:[[1,"mt-3"]],template:function(i,r){i&1&&(h(0,"app-navbar")(1,"router-outlet"),n(2,"div",0),l(3,"\xA0"),a())},dependencies:[N,Te,oe,C]})}return e})();var we={providers:[ae({eventCoalescing:!0}),de(be),Y(),Y(me()),{provide:se,useClass:Ee,multi:!0},ee(C.forRoot({loader:{provide:fe,useFactory:Ie,deps:[le]}}))]};pe(ke,we).catch(e=>console.error(e));