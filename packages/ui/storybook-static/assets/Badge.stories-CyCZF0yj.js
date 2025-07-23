import{B as e}from"./Badge-DRmQwFxg.js";import{c as Y,L as r}from"./lucide-wrapper-Bu7ZrCr7.js";import{j as a}from"./iframe-CgGFnaXz.js";import{I as Z}from"./info-CEtmsYJG.js";import{A as $}from"./alert-circle-_wJlyLw9.js";import{C as aa}from"./check-circle-Bz7EZT43.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=Y("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),oa={title:"Atoms/Badge",component:e,parameters:{layout:"centered",docs:{description:{component:"Ein kompakter Badge-Component zur Anzeige von Status, Labels oder Kategorien."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","secondary","destructive","outline","success","warning","info"],description:"Die visuelle Variante des Badges"}}},n={args:{children:"Badge"}},s={args:{variant:"secondary",children:"Secondary"}},i={args:{variant:"destructive",children:"Destructive"}},t={args:{variant:"outline",children:"Outline"}},c={args:{variant:"success",children:"Success"}},o={args:{variant:"warning",children:"Warning"}},d={args:{variant:"info",children:"Info"}},g={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"success"},a(r,{icon:aa,className:"mr-1 h-3 w-3"}),"Aktiv"),a(e,{variant:"destructive"},a(r,{icon:ea,className:"mr-1 h-3 w-3"}),"Fehler"),a(e,{variant:"warning"},a(r,{icon:$,className:"mr-1 h-3 w-3"}),"Warnung"),a(e,{variant:"info"},a(r,{icon:Z,className:"mr-1 h-3 w-3"}),"Info"))},l={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"success"},"Online"),a(e,{variant:"destructive"},"Offline"),a(e,{variant:"warning"},"Wartung"),a(e,{variant:"secondary"},"Entwurf"),a(e,null,"Veröffentlicht"))},u={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"outline"},"Entwicklung"),a(e,{variant:"outline"},"Design"),a(e,{variant:"outline"},"Marketing"),a(e,{variant:"outline"},"Vertrieb"),a(e,{variant:"outline"},"Support"))},p={render:()=>a("div",{className:"flex flex-wrap gap-2"},a(e,{variant:"destructive"},"Kritisch"),a(e,{variant:"warning"},"Hoch"),a(e,{variant:"info"},"Mittel"),a(e,{variant:"secondary"},"Niedrig"))},m={render:()=>a("div",{className:"grid grid-cols-4 gap-4"},a(e,null,"Default"),a(e,{variant:"secondary"},"Secondary"),a(e,{variant:"destructive"},"Destructive"),a(e,{variant:"outline"},"Outline"),a(e,{variant:"success"},"Success"),a(e,{variant:"warning"},"Warning"),a(e,{variant:"info"},"Info"))};var v,B,f;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Badge'
  }
}`,...(f=(B=n.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var h,w,S;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,...(S=(w=s.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var y,x,N;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}`,...(N=(x=i.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var I,W,k;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(k=(W=t.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var C,D,O;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Success'
  }
}`,...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var A,V,L;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Warning'
  }
}`,...(L=(V=o.parameters)==null?void 0:V.docs)==null?void 0:L.source}}};var E,b,z;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'Info'
  }
}`,...(z=(b=d.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var M,K,X;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <LucideIconWrapper icon={CheckCircle} className="mr-1 h-3 w-3" />
        Aktiv
      </Badge>
      <Badge variant="destructive">
        <LucideIconWrapper icon={XCircle} className="mr-1 h-3 w-3" />
        Fehler
      </Badge>
      <Badge variant="warning">
        <LucideIconWrapper icon={AlertCircle} className="mr-1 h-3 w-3" />
        Warnung
      </Badge>
      <Badge variant="info">
        <LucideIconWrapper icon={Info} className="mr-1 h-3 w-3" />
        Info
      </Badge>
    </div>
}`,...(X=(K=g.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var j,F,H;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="success">Online</Badge>
      <Badge variant="destructive">Offline</Badge>
      <Badge variant="warning">Wartung</Badge>
      <Badge variant="secondary">Entwurf</Badge>
      <Badge>Veröffentlicht</Badge>
    </div>
}`,...(H=(F=l.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var P,_,q;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Entwicklung</Badge>
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">Marketing</Badge>
      <Badge variant="outline">Vertrieb</Badge>
      <Badge variant="outline">Support</Badge>
    </div>
}`,...(q=(_=u.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var T,G,J;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">Kritisch</Badge>
      <Badge variant="warning">Hoch</Badge>
      <Badge variant="info">Mittel</Badge>
      <Badge variant="secondary">Niedrig</Badge>
    </div>
}`,...(J=(G=p.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,R,U;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-4 gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
}`,...(U=(R=m.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};const da=["Default","Secondary","Destructive","Outline","Success","Warning","InfoVariant","WithIcon","StatusBadges","CategoryBadges","PriorityBadges","AllVariants"];export{m as AllVariants,u as CategoryBadges,n as Default,i as Destructive,d as InfoVariant,t as Outline,p as PriorityBadges,s as Secondary,l as StatusBadges,c as Success,o as Warning,g as WithIcon,da as __namedExportsOrder,oa as default};
