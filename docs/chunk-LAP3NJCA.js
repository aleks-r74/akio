import{Ra as o,Sa as r,W as l,Wa as c,Xa as u,bc as D,cb as f,cc as _,db as h,ea as s,eb as v,fa as d,fb as M,gb as S,kb as g,ma as p,ob as w,pb as y,ua as m}from"./chunk-EFT7P6D7.js";var C=["date"],j=(()=>{class n{label;date;dateMonthSelected=new p;ngAfterViewInit(){let t=this.date.nativeElement;t.value=new Date().toISOString().substring(0,7),this.dateMonthSelected.emit(t.value)}onDateSelected(t){let e=t.target;this.dateMonthSelected.emit(e.value)}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=l({type:n,selectors:[["app-date-month"]],viewQuery:function(e,i){if(e&1&&f(C,5),e&2){let a;h(a=v())&&(i.date=a.first)}},inputs:{label:"label"},outputs:{dateMonthSelected:"dateMonthSelected"},standalone:!0,features:[g],decls:10,vars:3,consts:[["date",""],[1,"is-size-5","m-3","is-flex","is-justify-content-center"],[1,"table"],["type","month","name","monthYear",3,"change"]],template:function(e,i){if(e&1){let a=c();o(0,"form",1)(1,"table",2)(2,"tr")(3,"td")(4,"label"),M(5),w(6,"translate"),r()(),o(7,"td")(8,"input",3,0),u("change",function(b){return s(a),d(i.onDateSelected(b))}),r()()()()()}e&2&&(m(5),S(y(6,1,i.label)))},dependencies:[_,D]})}return n})();var z={production:!1,assetPath:""};export{j as a,z as b};
