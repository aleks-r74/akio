import{a as ce,b as q,c as de,d as z,e as Q,f as ue,g as fe,h as b}from"./chunk-VBFU6JAC.js";import{a as he}from"./chunk-IWDF5OJH.js";import{a as xe}from"./chunk-64KBLKUM.js";import{$ as ie,$b as le,Ca as ne,Ha as f,J as ee,Ja as v,Ka as I,M as te,Ma as h,Na as B,Oa as ae,Pa as w,Qa as k,Ra as a,S as R,Sa as r,Ta as x,Ub as oe,W as y,Wa as O,Wb as se,Xa as g,Ya as u,ac as pe,bc as W,cb as $,cc as me,da as V,db as N,dc as ve,ea as A,eb as j,ec as U,fa as L,fb as s,fc as E,gb as l,gc as C,hb as M,hc as G,ic as K,jc as P,lb as S,mb as Y,qb as p,rb as m,sb as Z,ua as o,va as _,zb as re}from"./chunk-6IVGTEVD.js";function Ae(e,c){if(e&1&&(a(0,"td",5),s(1),r(),a(2,"td",5),s(3),r()),e&2){let t=u().$implicit,i=u();o(),l(t),o(2),l(i.expenses==null?null:i.expenses.get(t))}}function Le(e,c){if(e&1&&(a(0,"td"),s(1),r(),a(2,"td"),s(3),r()),e&2){let t=u().$implicit,i=u();o(),l(t),o(2),l(i.expenses==null?null:i.expenses.get(t))}}function Be(e,c){if(e&1&&(a(0,"tr"),f(1,Ae,4,2)(2,Le,4,2),r()),e&2){let t=c.$index,i=c.$count;o(),h(t===i-1?1:2)}}var ye=(()=>{class e{summary;expenses;showSpendings=!1;ngOnChanges(t){if(t.summary&&this.summary?.expenses){this.expenses=new Map(Object.entries(this.summary.expenses));let i=0;for(let n of this.expenses?.values())i+=n;this.expenses.set("Total",i)}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=y({type:e,selectors:[["app-summary-table"]],inputs:{summary:"summary"},standalone:!0,features:[V,S],decls:55,vars:32,consts:[[1,"container","is-max-tablet"],[1,"is-flex","is-justify-content-center","is-size-7-mobile"],[1,"table","m-0","p-0"],[1,"has-text-centered"],[3,"click"],[1,"has-text-weight-bold"],[1,"has-text-danger","has-text-centered"],[1,"tags","has-addons","is-justify-content-center","mt-4"],[1,"tag","is-warning","has-text-weight-bold","is-size-6","is-size-7-mobile"],[1,"tag","is-info","has-text-weight-bold","is-size-6","is-size-7-mobile"],[3,"close","active"],[1,"table","is-size-7"],["colspan","2",1,"has-text-centered"]],template:function(i,n){i&1&&(a(0,"div",0)(1,"div",1)(2,"table",2)(3,"tr")(4,"th"),s(5),p(6,"translate"),r(),a(7,"td",3),s(8),r()(),a(9,"tr",4),g("click",function(){return n.showSpendings=!0}),a(10,"th"),s(11),p(12,"translate"),r(),a(13,"td",3)(14,"a",5),s(15),r()()(),a(16,"tr")(17,"th"),s(18),p(19,"translate"),r(),a(20,"td",3),s(21),r()()(),a(22,"table",2)(23,"tr")(24,"th"),s(25),p(26,"translate"),r(),a(27,"td",3),s(28),r()(),a(29,"tr")(30,"th"),s(31),p(32,"translate"),r(),a(33,"td",3),s(34),r()(),a(35,"tr")(36,"th"),s(37),p(38,"translate"),r(),a(39,"td",6),s(40),r()()()(),a(41,"div",7)(42,"span",8),s(43),p(44,"translate"),r(),a(45,"span",9),s(46),r()()(),a(47,"app-modal",10),g("close",function(){return n.showSpendings=!1}),a(48,"table",11)(49,"tr")(50,"th",12),s(51),p(52,"translate"),r()(),w(53,Be,3,1,"tr",null,B),r()()),i&2&&(o(5),l(m(6,16,"Total revenue")),o(3),l(n.summary==null?null:n.summary.totalRevenue),o(3),l(m(12,18,"Total spendings")),o(4),l(n.expenses==null?null:n.expenses.get("Total")),o(3),M("",m(19,20,"Cash")," "),o(3),l(n.summary==null?null:n.summary.totalCash),o(4),l(m(26,22,"Total receipts")),o(3),l(n.summary==null?null:n.summary.totalReceipts),o(3),l(m(32,24,"Free haircuts")),o(3),l(n.summary==null?null:n.summary.freeHaircuts),o(3),M("",m(38,26,"Not assigned receipts")," "),o(3),l(n.summary==null?null:n.summary.notAssignedTransactions),o(3),l(m(44,28,"Net revenue")),o(3),l(n.summary==null?null:n.summary.netRevenue),o(),v("active",n.showSpendings),o(4),l(m(52,30,"Total spendings")),o(2),k(n.expenses==null?null:n.expenses.keys()))},dependencies:[C,E,xe]})}return e})();var Pe=["scrollableTable"];function Re(e,c){e&1&&(a(0,"tr",8)(1,"th",7),s(2),p(3,"translate"),r(),a(4,"th",7),s(5),p(6,"translate"),r(),a(7,"th",7),s(8),p(9,"translate"),r(),a(10,"th",7),s(11),p(12,"translate"),r(),a(13,"th",7),s(14),p(15,"translate"),r(),a(16,"th",10),s(17),p(18,"translate"),r()()),e&2&&(o(2),l(m(3,6,"Name")),o(3),l(m(6,8,"Receipts")),o(3),l(m(9,10,"Gross")),o(3),l(m(12,12,"Free Cuts")),o(3),l(m(15,14,"Salary")),o(3),l(m(18,16,"Balance")))}function Oe(e,c){if(e&1&&(f(0,Re,19,18,"tr",8),a(1,"tr")(2,"td"),s(3),r(),a(4,"td"),s(5),r(),a(6,"td"),s(7),r(),a(8,"td"),s(9),r(),a(10,"td"),s(11),r(),a(12,"td",9),s(13),r()()),e&2){let t=c.$implicit,i=c.$index,n=u();h(i===0?0:-1),o(3),l(t.name),o(2),l(t.receipts),o(2),l(t.grossRev),o(2),l(t.freeHaircuts),o(2),l(t.salary),o(2),l(n.balances==null?null:n.balances.get(t.name))}}function $e(e,c){e&1&&(a(0,"tr")(1,"td"),s(2),p(3,"translate"),r()()),e&2&&(o(2),l(m(3,1,"Users summary not available")))}function Ne(e,c){}function je(e,c){if(e&1&&(a(0,"td",11),s(1),p(2,"date"),r()),e&2){let t=u(2).$implicit,i=u().$implicit,n=u();v("rowSpan",n.rowSpan.get(i)),o(),l(Z(2,2,t.date,"MMM d"))}}function De(e,c){if(e&1&&f(0,je,3,5,"td",11),e&2){let t=u().$index;h(t==0?0:-1)}}function He(e,c){if(e&1&&(a(0,"td"),s(1),p(2,"date"),r()),e&2){let t=u().$implicit;o(),l(Z(2,1,t.date,"MMM d"))}}function Ve(e,c){if(e&1&&(a(0,"tr"),f(1,De,1,1)(2,He,3,4,"td"),a(3,"td"),s(4),r(),a(5,"td"),s(6),r(),a(7,"td"),s(8),r(),a(9,"td"),s(10),r(),a(11,"td"),s(12),r(),a(13,"td"),s(14),r()()),e&2){let t=c.$implicit,i=u().$implicit,n=u();o(),h(n.rowSpan.get(i)?1:2),o(3),l(t.name),o(2),l(t.receipts),o(2),l(t.grossRev),o(2),l(t.freeHaircuts),o(2),l(t.salary),o(2),l(t.paid)}}function qe(e,c){if(e&1&&(f(0,Ne,0,0),w(1,Ve,15,7,"tr",null,B)),e&2){let t,i=c.$implicit,n=c.$index,d=u();h(n===0?0:-1),o(),k((t=d.map.get(i))==null?null:t.values())}}var _e=(()=>{class e{balances;employeeSummary;map=new Map;dates=[];rowSpan=new Map;reducedSummary=new Map;scrollableTable;ngAfterViewInit(){if(this.scrollableTable&&this.scrollableTable.nativeElement){let t=this.scrollableTable.nativeElement.getBoundingClientRect().top,n=window.innerHeight-t;this.scrollableTable.nativeElement.style.maxHeight=`${n}px`}}ngOnChanges(t){if(t.balances.currentValue&&(this.balances=new Map(Object.entries(t.balances.currentValue))),!!t.employeeSummary){this.map=new Map(Object.entries(this.employeeSummary)),this.rowSpan.clear(),this.reducedSummary.clear(),this.dates=Object.keys(this.employeeSummary);for(let i of this.dates)if(this.map.get(i)){this.map.get(i).length>1&&this.rowSpan.set(i,this.map.get(i).length);for(let n of this.map.get(i)){let d=this.reducedSummary.get(n.name);d||(d={receipts:0,freeHaircuts:0,salary:0,paid:0,grossRev:0,date:"",name:""}),this.reducedSummary.set(n.name,{date:"",name:n.name,receipts:d.receipts+n.receipts,grossRev:d.grossRev+n.grossRev,freeHaircuts:d.freeHaircuts+n.freeHaircuts,salary:d.salary+n.salary,paid:d.paid+n.paid})}}}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=y({type:e,selectors:[["app-summary-employees"]],viewQuery:function(i,n){if(i&1&&$(Pe,5),i&2){let d;N(d=j())&&(n.scrollableTable=d.first)}},inputs:{balances:"balances",employeeSummary:"employeeSummary"},standalone:!0,features:[V,S],decls:37,vars:22,consts:[["scrollableTable",""],[1,"container","is-max-tablet"],[1,"is-flex","is-justify-content-center"],[1,"table","is-narrow","is-striped","is-bordered","has-text-centered","is-size-7-mobile","my-5"],[1,"table-container"],[1,"table","is-striped","is-bordered","is-narrow-mobile","has-text-centered","is-size-7-mobile","my-2"],[1,"is-primary"],[1,"has-text-centered"],[1,"is-info"],[1,"left-border"],[1,"has-text-centered","left-border"],[1,"is-vcentered",3,"rowSpan"]],template:function(i,n){i&1&&(a(0,"div",1)(1,"div",2)(2,"table",3)(3,"tbody"),w(4,Oe,14,7,"tr",null,B,!1,$e,4,3,"tr"),r()()(),a(7,"div",2)(8,"div",4,0)(10,"table",5)(11,"thead")(12,"tr",6)(13,"th",7),s(14),p(15,"translate"),r(),a(16,"th",7),s(17),p(18,"translate"),r(),a(19,"th",7),s(20),p(21,"translate"),r(),a(22,"th",7),s(23),p(24,"translate"),r(),a(25,"th",7),s(26),p(27,"translate"),r(),a(28,"th",7),s(29),p(30,"translate"),r(),a(31,"th",7),s(32),p(33,"translate"),r()()(),a(34,"tbody"),w(35,qe,3,1,null,null,B),r()()()()()),i&2&&(o(4),k(n.reducedSummary.values()),o(10),l(m(15,8,"Date")),o(3),l(m(18,10,"Name")),o(3),l(m(21,12,"Receipts")),o(3),l(m(24,14,"Gross")),o(3),l(m(27,16,"Free Cuts")),o(3),l(m(30,18,"Salary")),o(3),l(m(33,20,"Paid")),o(3),k(n.dates))},dependencies:[C,E,oe],styles:[".left-border[_ngcontent-%COMP%]{border-left:5px solid #20c200!important;border-width:10px}.table-container[_ngcontent-%COMP%]{position:relative;max-height:350px;overflow-y:auto}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]{position:sticky;z-index:2}thead[_ngcontent-%COMP%]{top:0}tfoot[_ngcontent-%COMP%]{bottom:0}"]})}return e})();function ze(e,c){if(e&1&&x(0,"app-summary-table",5),e&2){let t=u(2);v("summary",t.summary.summary)}}function Qe(e,c){if(e&1&&(f(0,ze,1,1,"app-summary-table",5),x(1,"app-summary-employees",4)),e&2){let t=u();h(t.authService.getAccessLevel()>1?0:-1),o(),v("employeeSummary",t.summary.employees)("balances",t.summary.summary.balances)}}var Se=(()=>{class e{httpService;authService;constructor(t,i){this.httpService=t,this.authService=i}summary;error=ne(void 0);requestFlag=!1;onDateSelected(t){t!=""&&(setTimeout(()=>this.requestFlag=!0),this.httpService.getSummary(t).subscribe({next:i=>{i&&(this.summary=i)},error:i=>{this.error.set(i),this.requestFlag=!1},complete:()=>{this.error.set(void 0),this.requestFlag=!1}}))}static \u0275fac=function(i){return new(i||e)(_(P),_(b))};static \u0275cmp=y({type:e,selectors:[["app-summary"]],standalone:!0,features:[S],decls:7,vars:8,consts:[[3,"dateMonthSelected","label"],[1,"is-flex","is-justify-content-center","my-1","loading"],[1,"is-size-7"],[3,"error"],[3,"employeeSummary","balances"],[3,"summary"]],template:function(i,n){i&1&&(a(0,"app-date-month",0),g("dateMonthSelected",function(H){return n.onDateSelected(H)}),r(),a(1,"div",1)(2,"p",2),s(3),p(4,"translate"),r(),x(5,"app-error",3),r(),f(6,Qe,2,3,"app-summary-employees",4)),i&2&&(v("label","Summary for "+n.authService.getUsername()),o(2),I("is-hidden",!n.requestFlag),o(),M("",m(4,6,"Loading")," ..."),o(2),v("error",n.error()),o(),h(n.summary?6:-1))},dependencies:[he,ye,_e,G,C,E],styles:[".loading[_ngcontent-%COMP%]{min-height:25px}"]})}return e})();var Ce=()=>({exact:!0}),be=(()=>{class e{authService;constructor(t){this.authService=t}static \u0275fac=function(i){return new(i||e)(_(b))};static \u0275cmp=y({type:e,selectors:[["app-money"]],standalone:!0,features:[S],decls:23,vars:20,consts:[[1,"tabs","is-boxed","mt-3"],["routerLinkActive","is-active",3,"routerLinkActiveOptions"],["routerLink","./"],["routerLink","logs"],["routerLinkActive","is-active"],["routerLink","expenses"],["routerLink","6thcuts"]],template:function(i,n){i&1&&(a(0,"div",0)(1,"ul")(2,"li",1)(3,"a",2)(4,"span"),s(5),p(6,"translate"),r()()(),a(7,"li",1)(8,"a",3)(9,"span"),s(10),p(11,"translate"),r()()(),a(12,"li",4)(13,"a",5)(14,"span"),s(15),p(16,"translate"),r()()(),a(17,"li",4)(18,"a",6)(19,"span"),s(20),p(21,"translate"),r()()()()(),x(22,"router-outlet")),i&2&&(o(2),v("routerLinkActiveOptions",Y(18,Ce)),o(3),l(m(6,10,"Money")),o(2),v("routerLinkActiveOptions",Y(19,Ce)),o(3),l(m(11,12,"Logs")),o(2),I("is-hidden",n.authService.getAccessLevel()<3),o(3),l(m(16,14,"Expenses")),o(2),I("is-hidden",n.authService.getAccessLevel()<3),o(3),l(m(21,16,"6th haircuts")))},dependencies:[fe,q,z,Q,C,E],styles:[".sticky-header[_ngcontent-%COMP%]{position:sticky;top:0;background-color:#f5f5f5;z-index:1}"]})}return e})();var Ue=["username"],Ge=["password"];function Ke(e,c){e&1&&(a(0,"p",3),s(1,"Loading ..."),r())}var Ee=(()=>{class e{httpService;authService;userInput;passInput;errorResponse;requestFlag=!1;constructor(t,i){this.httpService=t,this.authService=i}login(){let t=(this.userInput?.nativeElement).value,i=(this.passInput?.nativeElement).value;this.requestFlag=!0,this.authService.login(t,i).subscribe({error:n=>{n.status===406?this.errorResponse={error:!0,message:"Invalid username or password"}:n.status===423?this.errorResponse={error:!0,message:"You're temporarily locked out. Try again in 5 minutes"}:this.errorResponse=n,this.requestFlag=!1},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0}})}static \u0275fac=function(i){return new(i||e)(_(P),_(b))};static \u0275cmp=y({type:e,selectors:[["app-login"]],viewQuery:function(i,n){if(i&1&&($(Ue,5),$(Ge,5)),i&2){let d;N(d=j())&&(n.userInput=d.first),N(d=j())&&(n.passInput=d.first)}},standalone:!0,features:[S],decls:23,vars:2,consts:[["username",""],["password",""],[1,"is-flex","is-justify-content-center","mt-1"],[2,"position","absolute"],[1,"hero","is-light","is-fullheight"],[1,"m-5"],[1,"container"],[1,"columns","is-centered"],[1,"column","is-5-tablet","is-4-desktop","is-3-widescreen"],["action","",1,"box"],[1,"field"],["for","",1,"label"],["type","text",1,"input"],["type","password",1,"input"],[3,"error"],["type","button",1,"button","is-info",3,"click"]],template:function(i,n){if(i&1){let d=O();a(0,"div",2),f(1,Ke,2,0,"p",3),r(),a(2,"section",4)(3,"div",5)(4,"div",6)(5,"div",7)(6,"div",8)(7,"form",9)(8,"div",10)(9,"label",11),s(10,"Username"),r(),x(11,"input",12,0),r(),a(13,"div",10)(14,"label",11),s(15,"Password"),r(),x(16,"input",13,1),r(),a(18,"div",10),x(19,"app-error",14),r(),a(20,"div",10)(21,"button",15),g("click",function(){return A(d),L(n.login())}),s(22," Login "),r()()()()()()()()}i&2&&(o(),h(n.requestFlag?1:-1),o(18),v("error",n.errorResponse))},dependencies:[G]})}return e})();var T=(e,c)=>{let t=R(de);return R(b).isAuthenticated()?!0:(t.navigate(["/login"]),!1)};var Te=[{path:"summary",canActivate:[T],component:Se},{path:"transactions",canActivate:[T],loadComponent:()=>import("./chunk-H7QYOM7F.js").then(e=>e.TransactionsComponent)},{path:"money",canActivate:[T],component:be,children:[{path:"",canActivate:[T],loadComponent:()=>import("./chunk-YO67TR5U.js").then(e=>e.MoneyManagementComponent)},{path:"logs",canActivate:[T],loadComponent:()=>import("./chunk-FH63G2EN.js").then(e=>e.LogsComponent)},{path:"expenses",canActivate:[T],loadComponent:()=>import("./chunk-CIEII3RH.js").then(e=>e.ExpensesComponent)},{path:"6thcuts",canActivate:[T],loadComponent:()=>import("./chunk-QOYWR7IZ.js").then(e=>e.SixthCutsComponent)}]},{path:"schedule",canActivate:[T],loadComponent:()=>import("./chunk-OFBVQ3UE.js").then(e=>e.ScheduleComponent)},{path:"users",canActivate:[T],loadComponent:()=>import("./chunk-YMMX342G.js").then(e=>e.UsersComponent)},{path:"login",component:Ee},{path:"**",redirectTo:"/summary"}];var Ie=(()=>{class e{constructor(){}intercept(t,i){let n=R(b),d=t.clone({setHeaders:{Authorization:`Bearer ${n.getToken()}`,"Content-Type":"application/json"}});return i.handle(d).pipe(ee({error:H=>{H.status===401&&n.logout()}}))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=te({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Je(e,c){if(e&1){let t=O();a(0,"a",10),g("click",function(){A(t);let n=u(3);return L(n.onBurgerClick())}),s(1),p(2,"translate"),r()}if(e&2){let t=u().$implicit;v("routerLink",t.url),o(),M(" ",m(2,2,t.text)," ")}}function Ye(e,c){if(e&1&&f(0,Je,3,4,"a",9),e&2){let t=c.$implicit,i=u(2);h(t.access_level<=i.authService.getAccessLevel()?0:-1)}}function Ze(e,c){if(e&1&&w(0,Ye,1,1,null,null,ae),e&2){let t=u();k(t.links)}}function We(e,c){if(e&1){let t=O();a(0,"button",11),g("click",function(){A(t);let n=u();return L(n.logout())}),a(1,"span"),s(2,"Exit"),r(),a(3,"span",12),x(4,"i",13),r()(),a(5,"a",14),g("click",function(){A(t);let n=u();return L(n.logout())}),s(6),p(7,"translate"),r()}e&2&&(o(6),l(m(7,1,"Exit")))}var we=(()=>{class e{authService;translate;httpService;menuActive=!1;assetPath=K.assetPath;language="EN";flagRus=this.assetPath+"assets/images/rus.png";flagUS=this.assetPath+"assets/images/us.png";flagPath=this.flagUS;audio=new Audio;timeoutId;lastTransactionTime;checkInterval=6e4;links=[{text:"Summary",url:"summary",access_level:1},{text:"Transactions",url:"transactions",access_level:1},{text:"Money",url:"money",access_level:1},{text:"Schedule",url:"schedule",access_level:1},{text:"Users",url:"users",access_level:3}];constructor(t,i,n){this.authService=t,this.translate=i,this.httpService=n}ngOnDestroy(){clearInterval(this.timeoutId)}ngOnInit(){this.audio.src=this.assetPath+"assets/sounds/cashregister.mp3",this.audio.load(),this.timeoutId=setInterval(()=>this.checkNewTransactions(),this.checkInterval)}logout(){this.authService.logout()}onBurgerClick(){this.menuActive=!this.menuActive}changeLang(){this.translate.use(this.language.toLowerCase()),this.language==="RU"?(this.language="EN",this.flagPath=this.flagUS):(this.language="RU",this.flagPath=this.flagRus)}checkNewTransactions(){this.authService.isAuthenticated&&this.httpService.getLastTransactionTime().subscribe(t=>{this.lastTransactionTime&&this.lastTransactionTime<t&&this.audio.play(),this.lastTransactionTime=t})}static \u0275fac=function(i){return new(i||e)(_(b),_(U),_(P))};static \u0275cmp=y({type:e,selectors:[["app-navbar"]],standalone:!0,features:[S],decls:15,vars:6,consts:[["role","navigation",1,"navbar","is-info","is-fixed-top"],[1,"navbar-brand"],[1,"navbar-item","has-text-weight-bold","has-text-light",3,"click"],["role","button","aria-label","menu","aria-expanded","true","data-target","mainMenu",1,"navbar-burger",3,"click"],["aria-hidden","true"],["id","mainMenu",1,"navbar-menu",3,"click"],[1,"navbar-start"],[1,"navbar-end"],[1,"buttons"],["routerLinkActive","'has-background-light has-text-dark'",1,"navbar-item","has-text-light",3,"routerLink"],["routerLinkActive","'has-background-light has-text-dark'",1,"navbar-item","has-text-light",3,"click","routerLink"],["alt","Log out",1,"button","is-small","mx-2","is-info","has-text-white","is-hidden-touch",3,"click"],[1,"icon","is-small"],[1,"fas","fa-sign-out-alt"],["alt","Log out",1,"navbar-item","has-text-light","is-hidden-desktop",3,"click"]],template:function(i,n){i&1&&(a(0,"nav",0)(1,"div",1)(2,"button",2),g("click",function(){return n.changeLang()}),s(3,"AKIO"),r(),a(4,"a",3),g("click",function(){return n.onBurgerClick()}),x(5,"span",4)(6,"span",4)(7,"span",4)(8,"span",4),r()(),a(9,"div",5),g("click",function(){return n.menuActive=!1}),a(10,"div",6),f(11,Ze,2,0),r(),a(12,"div",7)(13,"div",8),f(14,We,8,3),r()()()()),i&2&&(o(4),I("is-hidden",!n.authService.isAuthenticated()),o(5),I("is-active",n.menuActive),o(2),h(n.authService.isAuthenticated()?11:-1),o(3),h(n.authService.isAuthenticated()?14:-1))},dependencies:[z,Q,C,E],styles:["@media (max-width: 1024px){.navbar-menu.is-active[_ngcontent-%COMP%]{position:fixed;width:100%}}img[_ngcontent-%COMP%]{width:16px;height:16px;margin:0}"]})}return e})();var J=class{http;prefix;suffix;constructor(c,t="/assets/i18n/",i=".json"){this.http=c,this.prefix=t,this.suffix=i}getTranslation(c){return this.http.get(`${this.prefix}${c}${this.suffix}`)}};function ke(e){return new J(e,`${K.assetPath}/assets/i18n/`,".json")}var Me=(()=>{class e{translate;title="Akio";constructor(t){this.translate=t,t.addLangs(["en","ru"]),this.translate.setDefaultLang("ru")}static \u0275fac=function(i){return new(i||e)(_(U))};static \u0275cmp=y({type:e,selectors:[["app-root"]],standalone:!0,features:[S],decls:4,vars:0,consts:[[2,"margin-top","25px"]],template:function(i,n){i&1&&(x(0,"app-navbar"),a(1,"div",0),s(2,"\xA0"),r(),x(3,"router-outlet"))},dependencies:[q,we,se,C]})}return e})();var Fe={providers:[re({eventCoalescing:!0}),ue(Te),W(),W(me()),{provide:pe,useClass:Ie,multi:!0},ie(C.forRoot({loader:{provide:ve,useFactory:ke,deps:[le]}}))]};ce(Me,Fe).catch(e=>console.error(e));
