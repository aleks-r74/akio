import{d as _,j as O,o as g,p as V,q as h,v as T}from"./chunk-S6O6AI76.js";import{Ha as u,Ja as m,La as d,Na as f,Oa as C,Pa as S,Qa as r,Ra as a,W as c,Xa as v,eb as l,fb as s,jb as x,ua as i}from"./chunk-NMAALOYJ.js";var I=e=>{let o=e.value,t={};return o.dest===o.source?{error:!0,message:"Source and Dest can not be the same"}:o.dest==="To"||o.source==="From"?{error:!0,message:"Select destination"}:null};function F(e,o){if(e&1&&(r(0,"option"),l(1),a()),e&2){let t=v(2);i(),s(t.firstOption)}}function y(e,o){if(e&1&&(u(0,F,2,1,"option"),r(1,"option"),l(2),a()),e&2){let t=o.$implicit,n=o.$index;d(n===0?0:-1),i(2),s(t)}}var M=(()=>{class e{options;control;firstOption;defaultValue;upperCaseOptions;ngOnInit(){this.upperCaseOptions||(this.upperCaseOptions=this.options.map(t=>t.charAt(0).toUpperCase()+t.slice(1)))}ngAfterViewInit(){let t=this.control.value;setTimeout(()=>this.control?.setValue(t),0)}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=c({type:e,selectors:[["app-select"]],inputs:{options:"options",control:"control",firstOption:"firstOption",defaultValue:"defaultValue"},standalone:!0,features:[x],decls:4,vars:1,consts:[[1,"select"],[3,"formControl"]],template:function(n,p){n&1&&(r(0,"span",0)(1,"select",1),C(2,y,3,2,"option",null,f),a()()),n&2&&(i(),m("formControl",p.control),i(),S(p.upperCaseOptions))},dependencies:[T,V,h,g,_,O]})}return e})();function N(e,o){return e.find(t=>t.toLowerCase()==o.toLowerCase())}function $(e){return e.charAt(0).toUpperCase()+e.toLocaleLowerCase().slice(1)}export{I as a,M as b,N as c,$ as d};
