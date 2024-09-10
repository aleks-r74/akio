import{a as z}from"./chunk-TX7EHRFM.js";import{h as I}from"./chunk-75LVMQMG.js";import{Ha as m,Ja as v,Ka as B,La as u,Ma as F,Oa as w,Ob as L,Pa as E,Qa as a,Ra as l,Sa as V,Va as D,W as T,Wa as f,Xa as c,a as P,ac as M,b as R,bc as O,cc as A,da as U,dc as $,ea as y,eb as p,fa as x,fb as g,gb as b,jb as k,ma as j,mb as q,nb as _,ob as S,ua as o,va as C}from"./chunk-NMAALOYJ.js";var K=(i,d,e)=>({"is-grey is-dark":i,"is-light":d,"is-link is-hoverable":e});function Q(i,d){if(i&1){let e=D();a(0,"span",6),f("click",function(){y(e);let n=c().$implicit,s=c();return x(s.onEmployeeClick(n))}),p(1),l()}if(i&2){let e=c().$implicit,t=c();v("ngClass",q(2,K,t.readOnly,!e.scheduled,!t.readOnly)),o(),b(" ",e.name," ")}}function W(i,d){if(i&1&&(a(0,"span",7),p(1),l()),i&2){let e=c().$implicit;B("is-link",e.scheduled),o(),b(" ",e.name," ")}}function X(i,d){if(i&1&&m(0,Q,2,6,"span",4)(1,W,2,3,"span",5),i&2){let e=c();u(e.authService.getAccessLevel()>1?0:1)}}var N=(()=>{class i{authService;scheduleDisplay;updatedSchedule=new j;readOnly;day;month;constructor(e){this.authService=e}ngOnChanges(e){this.day=this.scheduleDisplay.date.slice(-2);let[t,n,s]=this.scheduleDisplay.date.split("-").map(Number),r=new Date(t,n-1,s),h=new Date,Y=new Date(h.getFullYear(),h.getUTCMonth(),h.getUTCDate());this.month=r.toLocaleString("default",{month:"long"}),this.readOnly=r<Y}onEmployeeClick(e){this.readOnly||(e=R(P({},e),{scheduled:!e.scheduled}),this.scheduleDisplay.employees.filter(t=>t.name===e.name).map(t=>t.scheduled=!t.scheduled),this.updatedSchedule.emit(this.scheduleDisplay))}static \u0275fac=function(t){return new(t||i)(C(I))};static \u0275cmp=T({type:i,selectors:[["app-calendar-box"]],inputs:{scheduleDisplay:"scheduleDisplay"},outputs:{updatedSchedule:"scheduleUpdate"},standalone:!0,features:[U,k],decls:9,vars:6,consts:[[1,"cell","is-flex","is-justify-content-center"],[1,"box","m-0","p-0","has-text-centered","background",2,"width","160px","height","128px"],[1,"pacifico-small","is-flex","is-justify-content-center","my-1","p-0"],[1,"pacifico-big","lifted","is-flex","is-justify-content-center","m-0","p-0"],[1,"tag","is-small","mx-1","my-0","lifted",3,"ngClass"],[1,"tag","is-small","mx-1","my-0","lifted",3,"is-link"],[1,"tag","is-small","mx-1","my-0","lifted",3,"click","ngClass"],[1,"tag","is-small","mx-1","my-0","lifted"]],template:function(t,n){t&1&&(a(0,"div",0)(1,"div",1)(2,"div",2),p(3),_(4,"translate"),l(),a(5,"div",3),p(6),l(),w(7,X,2,1,null,null,F),l()()),t&2&&(o(),B("disabled",n.readOnly),o(2),g(S(4,4,n.month)),o(3),g(n.day),o(),E(n.scheduleDisplay.employees))},dependencies:[L,O,M],styles:[".pacifico-big[_ngcontent-%COMP%]{font-family:Pacifico,cursive;font-weight:400;font-style:normal;font-size:2.5rem;color:#fff}.pacifico-small[_ngcontent-%COMP%]{font-family:Pacifico,cursive;font-weight:400;font-style:normal;font-size:1.5rem;color:#fff}.lifted[_ngcontent-%COMP%]{position:relative;top:-15px}.background[_ngcontent-%COMP%]{background-image:url(/assets/images/calendar-background.jpg);background-size:cover;background-position:center;opacity:.9}.disabled[_ngcontent-%COMP%]{filter:brightness(.5)}"]})}return i})();function Z(i,d){if(i&1){let e=D();a(0,"div",1)(1,"button",7),f("click",function(){y(e);let n=c();return x(n.onSaveClick())}),p(2),_(3,"translate"),l()()}i&2&&(o(2),g(S(3,1,"Save")))}function ee(i,d){if(i&1&&V(0,"app-error",8),i&2){let e=c(2);v("error",e.errorResponse)}}function te(i,d){i&1&&(a(0,"p"),p(1),_(2,"translate"),l()),i&2&&(o(),b("",S(2,1,"Loading"),"..."))}function ie(i,d){if(i&1&&m(0,ee,1,1,"app-error",8)(1,te,3,3,"p"),i&2){let e=c();u(e.errorResponse?0:1)}}function ne(i,d){i&1&&(a(0,"p"),p(1),_(2,"translate"),l()),i&2&&(o(),g(S(2,1,"Saved")))}function se(i,d){if(i&1){let e=D();a(0,"app-calendar-box",9),f("scheduleUpdate",function(n){y(e);let s=c();return x(s.onScheduleUpdate(n))}),l()}if(i&2){let e=d.$implicit;v("scheduleDisplay",e)}}var Se=(()=>{class i{httpService;authService;errorResponse;requestFlag=!1;successFlag=!1;employees=[];scheduleDtos=[];originalScheduleDtos=[];displaySchedule=[];constructor(e,t){this.httpService=e,this.authService=t}ngOnInit(){this.requestFlag=!0,this.httpService.getUsers(["ROLE_EMPLOYEE"]).subscribe({next:e=>{this.employees=e},error:e=>this.errorResponse=e,complete:()=>{this.errorResponse=void 0,this.requestFlag=!1,this.loadSchedule(new Date().toISOString().substring(0,10))}})}loadSchedule(e){this.requestFlag=!0,this.httpService.getSchedule(e).subscribe({next:t=>{this.scheduleDtos=[],this.originalScheduleDtos=[],this.scheduleDtos=t,this.originalScheduleDtos=[...t]},error:t=>this.errorResponse=t,complete:()=>{this.requestFlag=!1,this.errorResponse=void 0;let t=this.scheduleDtos.map(n=>n.employees).reduce((n,s)=>(s.forEach(r=>n.push(r)),n)).filter((n,s,r)=>r.indexOf(n)===s);new Date(e).getUTCMonth()<new Date().getUTCMonth()?this.displaySchedule=this.scheduleDtoToScheduleDisplay(this.scheduleDtos,t).reverse():this.displaySchedule=this.scheduleDtoToScheduleDisplay(this.scheduleDtos,this.employees).reverse()}})}onScheduleUpdate(e){for(let t=0;t<this.scheduleDtos.length;t++)this.scheduleDtos[t].date===e.date&&(this.scheduleDtos[t]=this.scheduleDisplayToScheduleDto(e))}scheduleDtoToScheduleDisplay(e,t){let n=[];for(let s of e){let r={date:s.date,employees:[]};for(let h of t)s.employees.includes(h)?r.employees.push({name:h,scheduled:!0}):r.employees.push({name:h,scheduled:!1});n.push(r)}return n}scheduleDisplayToScheduleDto(e){let t,n=e.employees.filter(s=>s.scheduled).map(s=>s.name);return t={date:e.date,employees:n},t}onMonthSelected(e){this.successFlag=!1;let t=e+"-01";this.loadSchedule(t)}onSaveClick(){this.successFlag=!1;let e=[];for(let t=0;t<this.originalScheduleDtos.length;t++)this.originalScheduleDtos[t].employees.length>this.scheduleDtos[t].employees.length&&e.push(this.originalScheduleDtos[t]);this.requestFlag=!0,e.length>0?this.httpService.deleteSchedule(e).subscribe({error:t=>{this.errorResponse=t},complete:()=>{this.updateSchedule()}}):this.updateSchedule()}updateSchedule(){this.httpService.updateSchedule(this.scheduleDtos).subscribe({next:e=>{this.scheduleDtos=[],this.originalScheduleDtos=[],this.scheduleDtos=e,this.originalScheduleDtos=[...e]},error:e=>{this.errorResponse=e},complete:()=>{this.requestFlag=!1,this.errorResponse=void 0,this.displaySchedule=this.scheduleDtoToScheduleDisplay(this.scheduleDtos,this.employees).reverse(),this.successFlag=!0}})}static \u0275fac=function(t){return new(t||i)(C($),C(I))};static \u0275cmp=T({type:i,selectors:[["app-schedule"]],standalone:!0,features:[k],decls:10,vars:3,consts:[["label","Schedule for",3,"dateMonthSelected"],[1,"is-flex","is-justify-content-center","m-3"],[1,"is-flex","is-justify-content-center","m-0","min-height","is-size-7"],[1,"container","is-max-widescreen"],[1,"fixed-grid","has-3-cols-mobile","has-4-cols-tablet","has-6-cols-desktop"],[1,"grid","is-column-gap-0"],[3,"scheduleDisplay"],[1,"button","is-danger","is-outlined","is-rounded",2,"width","150px",3,"click"],[3,"error"],[3,"scheduleUpdate","scheduleDisplay"]],template:function(t,n){t&1&&(a(0,"app-date-month",0),f("dateMonthSelected",function(r){return n.onMonthSelected(r)}),l(),m(1,Z,4,3,"div",1),a(2,"div",2),m(3,ie,2,1)(4,ne,3,3,"p"),l(),a(5,"div",3)(6,"div",4)(7,"div",5),w(8,se,1,1,"app-calendar-box",6,F),l()()()),t&2&&(o(),u(n.authService.getAccessLevel()>1?1:-1),o(2),u(n.requestFlag?3:-1),o(),u(n.successFlag?4:-1),o(4),E(n.displaySchedule))},dependencies:[z,N,A,O,M],styles:[".min-height[_ngcontent-%COMP%]{min-height:40px}"]})}return i})();export{Se as ScheduleComponent};