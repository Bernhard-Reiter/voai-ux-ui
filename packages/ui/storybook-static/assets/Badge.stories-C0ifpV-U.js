import{B as e}from"./Badge-DGz86kPQ.js";import{j as a}from"./iframe-BXdc-fV8.js";import{I as U}from"./info-ape9Je1_.js";import{A as Y}from"./alert-circle-DXE1f9ib.js";import{c as Z}from"./createLucideIcon-DNeJQIBI.js";import{C as $}from"./check-circle-CctDzuaE.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=Z("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),ca={title:"Atoms/Badge",component:e,parameters:{layout:"centered",docs:{description:{component:"Ein kompakter Badge-Component zur Anzeige von Status, Labels oder Kategorien."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","destructive","outline","success","warning","info"],description:"Die visuelle Variante des Badges"}}},r={args:{children:"Badge"}},n={args:{variant:"secondary",children:"Secondary"}},s={args:{variant:"destructive",children:"Destructive"}},t={args:{variant:"outline",children:"Outline"}},i={args:{variant:"success",children:"Success"}},c={args:{variant:"warning",children:"Warning"}},o={args:{variant:"info",children:"Info"}},d={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"success"},a($,{className:"mr-1 h-3 w-3"}),"Aktiv"),a(e,{variant:"destructive"},a(aa,{className:"mr-1 h-3 w-3"}),"Fehler"),a(e,{variant:"warning"},a(Y,{className:"mr-1 h-3 w-3"}),"Warnung"),a(e,{variant:"info"},a(U,{className:"mr-1 h-3 w-3"}),"Info"))},g={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"success"},"Online"),a(e,{variant:"destructive"},"Offline"),a(e,{variant:"warning"},"Wartung"),a(e,{variant:"secondary"},"Entwurf"),a(e,null,"Veröffentlicht"))},l={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"outline"},"Entwicklung"),a(e,{variant:"outline"},"Design"),a(e,{variant:"outline"},"Marketing"),a(e,{variant:"outline"},"Vertrieb"),a(e,{variant:"outline"},"Support"))},u={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"destructive"},"Kritisch"),a(e,{variant:"warning"},"Hoch"),a(e,{variant:"info"},"Mittel"),a(e,{variant:"secondary"},"Niedrig"))},m={render:()=>a("div",{className:"grid grid-cols-4 gap-4"},a(e,null,"Default"),a(e,{variant:"secondary"},"Secondary"),a(e,{variant:"destructive"},"Destructive"),a(e,{variant:"outline"},"Outline"),a(e,{variant:"success"},"Success"),a(e,{variant:"warning"},"Warning"),a(e,{variant:"info"},"Info"))};var v,p,B;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(B=(p=r.parameters)==null?void 0:p.docs)==null?void 0:B.source}}};var f,h,w;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,...(w=(h=n.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var S,y,x;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}`,...(x=(y=s.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var N,I,k;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(k=(I=t.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var C,D,W;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Success'
  }
}`,...(W=(D=i.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var O,A,V;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Warning'
  }
}`,...(V=(A=c.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var E,b,z;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'Info'
  }
}`,...(z=(b=o.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var M,K,X;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CheckCircle className="mr-1 h-3 w-3" />
        Aktiv
      </Badge>
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3 w-3" />
        Fehler
      </Badge>
      <Badge variant="warning">
        <AlertCircle className="mr-1 h-3 w-3" />
        Warnung
      </Badge>
      <Badge variant="info">
        <Info className="mr-1 h-3 w-3" />
        Info
      </Badge>
    </div>
}`,...(X=(K=d.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var j,F,H;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="success">Online</Badge>
      <Badge variant="destructive">Offline</Badge>
      <Badge variant="warning">Wartung</Badge>
      <Badge variant="secondary">Entwurf</Badge>
      <Badge>Veröffentlicht</Badge>
    </div>
}`,...(H=(F=g.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var L,P,_;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Entwicklung</Badge>
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">Marketing</Badge>
      <Badge variant="outline">Vertrieb</Badge>
      <Badge variant="outline">Support</Badge>
    </div>
}`,...(_=(P=l.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var q,T,G;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">Kritisch</Badge>
      <Badge variant="warning">Hoch</Badge>
      <Badge variant="info">Mittel</Badge>
      <Badge variant="secondary">Niedrig</Badge>
    </div>
}`,...(G=(T=u.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var J,Q,R;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-4 gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
}`,...(R=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};const oa=["Default","Secondary","Destructive","Outline","Success","Warning","InfoVariant","WithIcon","StatusBadges","CategoryBadges","PriorityBadges","AllVariants"];export{m as AllVariants,l as CategoryBadges,r as Default,s as Destructive,o as InfoVariant,t as Outline,u as PriorityBadges,n as Secondary,g as StatusBadges,i as Success,c as Warning,d as WithIcon,oa as __namedExportsOrder,ca as default};
