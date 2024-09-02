import{b as q,c as h,d as N,e as I,f as S,g as f,h as M,i as B,j as H,k as j,m as $,s as O,u as z,v as L}from"./chunk-W74X3RZZ.js";import{Ha as C,Ja as s,Ma as _,Na as A,Pa as w,Qa as F,Ra as o,Sa as n,Ta as u,W as y,Wa as G,Xa as m,Ya as d,ea as P,fa as D,fb as l,fc as T,gb as x,gc as V,hc as E,jc as R,lb as k,qb as v,rb as g,ua as a,va as b}from"./chunk-HUWQSKRG.js";function X(r,p){if(r&1&&u(0,"app-error",10),r&2){let e=d(2);s("error",e.errorResponse)}}function J(r,p){r&1&&(o(0,"p"),l(1,"Loading..."),n())}function K(r,p){if(r&1&&C(0,X,1,1,"app-error",10)(1,J,2,0,"p"),r&2){let e=d();_(e.errorResponse?0:1)}}function Q(r,p){if(r&1){let e=G();o(0,"div",2)(1,"p",3),u(2,"input",11),n(),o(3,"p",3),u(4,"input",12),n(),o(5,"p",3)(6,"button",13),m("click",function(){let i=P(e).$index,c=d();return D(c.onDelete(i))}),l(7," X "),n()()()}if(r&2){let e=p.$implicit,t=d();a(2),s("formControl",t.getControl(e,"date")),a(2),s("formControl",t.getControl(e,"price"))}}var ie=(()=>{class r{httpService;requestFlag=!0;errorResponse;data=[];constructor(e){this.httpService=e}ngOnInit(){this.loadData()}formGroup=new S({datePriceArray:new z([])});get datePriceArray(){return this.formGroup.controls.datePriceArray}getControl(e,t){return e.controls[t]}addNewDatePrice(){this.addDatePrice("")}loadData(){this.requestFlag=!0,this.httpService.getSixHaircutDatePrices().subscribe({next:e=>{this.data=[],this.formGroup.controls.datePriceArray.controls=[],this.data=e},error:e=>this.errorResponse=e,complete:()=>{this.requestFlag=!1,this.errorResponse=void 0,this.updateDataInView()}})}updateDataInView(){for(let e of this.data)this.addDatePrice(e.start_date_time,e.price,!0)}addDatePrice(e,t,i){let c=new S({fromDB:new f(i),date:new f(e,h.required),price:new f(t,[h.required,h.min(1)])});this.formGroup.controls.datePriceArray.push(c)}onDelete(e){let t=this.formGroup.controls.datePriceArray.controls[e];this.getControl(t,"fromDB").value?(this.requestFlag=!0,this.httpService.deleteSixHaircutDatePrice(this.getControl(t,"date").value).subscribe({error:i=>this.errorResponse=i,complete:()=>{this.errorResponse=void 0,this.loadData()}})):this.formGroup.controls.datePriceArray.removeAt(e)}onSaveAll(){let e=[];for(let t of this.datePriceArray.controls)e.push({start_date_time:t.controls.date.value,price:t.controls.price.value});this.requestFlag=!0,this.httpService.updateSixHaircutDatePrices(e).subscribe({next:t=>{this.data=[],this.formGroup.controls.datePriceArray.controls=[],this.data=t},error:t=>this.errorResponse=t,complete:()=>{this.requestFlag=!1,this.errorResponse=void 0,this.updateDataInView()}})}static \u0275fac=function(t){return new(t||r)(b(R))};static \u0275cmp=y({type:r,selectors:[["app-sixth-cuts"]],standalone:!0,features:[k],decls:21,vars:9,consts:[[1,"container"],[1,"is-flex","is-justify-content-center","m-3"],[1,"field","has-addons"],[1,"control"],[1,"button","is-danger","is-outlined","is-rounded",2,"width","100px",3,"click"],[1,"button","is-danger","is-outlined","is-rounded",2,"width","100px",3,"click","disabled"],[1,"has-text-centered"],[1,"is-flex","is-justify-content-center","m-0","min-height","is-size-7","min-height"],[3,"formGroup"],["formArrayName","datePriceArray"],[3,"error"],["type","datetime-local",1,"input",3,"formControl"],["type","number","placeholder","Price","min","0.5",1,"input",3,"formControl"],[1,"button","has-background-danger-60",3,"click"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3)(4,"button",4),m("click",function(){return i.addNewDatePrice()}),l(5),v(6,"translate"),n()(),o(7,"p",3)(8,"button",5),m("click",function(){return i.onSaveAll()}),l(9),v(10,"translate"),n()()()(),o(11,"div",6)(12,"p"),l(13,"Prices for 6th haircuts will be applied for salary calculation starting from the date specified"),n()(),o(14,"div",7),C(15,K,2,1),n(),o(16,"div",1)(17,"form",8)(18,"ng-component",9),w(19,Q,8,2,"div",2,A),n()()()()),t&2&&(a(5),x(g(6,5,"Add new")),a(3),s("disabled",!i.formGroup.valid),a(),x(g(10,7,"Save All")),a(6),_(i.requestFlag?15:-1),a(2),s("formGroup",i.formGroup),a(2),F(i.datePriceArray.controls))},dependencies:[L,M,q,B,N,I,O,H,j,$,E,V,T],styles:[".min-height[_ngcontent-%COMP%]{min-height:30px}"]})}return r})();export{ie as SixthCutsComponent};
