import{B as r}from"./Button-B7D7_xWV.js";import{j as e}from"./iframe-BXdc-fV8.js";import{c as y}from"./createLucideIcon-DNeJQIBI.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=y("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=y("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=y("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=y("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),ke={title:"Atoms/Button",component:r,parameters:{layout:"centered",docs:{description:{component:"Ein vielseitiger Button-Component mit verschiedenen Varianten und Größen."}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link","gradient"],description:"Die visuelle Variante des Buttons"},size:{control:"select",options:["default","sm","lg","icon"],description:"Die Größe des Buttons"},asChild:{control:"boolean",description:"Rendert den Button als Child-Component (für Composition)"},disabled:{control:"boolean",description:"Deaktiviert den Button"}}},a={args:{children:"Button"}},n={args:{variant:"destructive",children:"Löschen"}},t={args:{variant:"outline",children:"Outline"}},s={args:{variant:"secondary",children:"Secondary"}},o={args:{variant:"ghost",children:"Ghost"}},c={args:{variant:"link",children:"Link Button"}},i={args:{variant:"gradient",children:"Gradient"}},d={args:{size:"sm",children:"Klein"}},l={args:{size:"lg",children:"Groß"}},u={args:{size:"icon",children:e(he,{className:"h-4 w-4"})}},m={args:{children:e(React.Fragment,null,"Download",e(ge,{className:"ml-2 h-4 w-4"}))}},p={args:{children:e(React.Fragment,null,e(pe,{className:"mr-2 h-4 w-4"}),"Weiter")}},g={args:{disabled:!0,children:e(React.Fragment,null,e(ve,{className:"mr-2 h-4 w-4 animate-spin"}),"Bitte warten...")}},h={args:{disabled:!0,children:"Deaktiviert"}},v={render:()=>e("div",{className:"flex items-center space-x-2"},e(r,{variant:"outline"},"Abbrechen"),e(r,null,"Speichern"))},B={render:()=>e("div",{className:"grid grid-cols-4 gap-4"},e(r,null,"Default"),e(r,{variant:"destructive"},"Destructive"),e(r,{variant:"outline"},"Outline"),e(r,{variant:"secondary"},"Secondary"),e(r,{variant:"ghost"},"Ghost"),e(r,{variant:"link"},"Link"),e(r,{variant:"gradient"},"Gradient"),e(r,{disabled:!0},"Disabled"))};var S,k,D;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(D=(k=a.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var w,G,L;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Löschen'
  }
}`,...(L=(G=n.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};var b,f,N;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(N=(f=t.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var x,A,z;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}`,...(z=(A=s.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var I,O,R;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,...(R=(O=o.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var C,H,M;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link Button'
  }
}`,...(M=(H=c.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var V,W,j;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'gradient',
    children: 'Gradient'
  }
}`,...(j=(W=i.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};var F,q,E;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    children: 'Klein'
  }
}`,...(E=(q=d.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var K,_,T;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    children: 'Groß'
  }
}`,...(T=(_=l.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};var Z,J,P;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    size: 'icon',
    children: <Heart className="h-4 w-4" />
  }
}`,...(P=(J=u.parameters)==null?void 0:J.docs)==null?void 0:P.source}}};var Q,U,X;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: <>
        Download
        <Download className="ml-2 h-4 w-4" />
      </>
  }
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,$,ee;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: <>
        <ArrowRight className="mr-2 h-4 w-4" />
        Weiter
      </>
  }
}`,...(ee=($=p.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ae,ne;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Bitte warten...
      </>
  }
}`,...(ne=(ae=g.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var te,se,oe;h.parameters={...h.parameters,docs:{...(te=h.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Deaktiviert'
  }
}`,...(oe=(se=h.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var ce,ie,de;v.parameters={...v.parameters,docs:{...(ce=v.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <div className="flex items-center space-x-2">
      <Button variant="outline">Abbrechen</Button>
      <Button>Speichern</Button>
    </div>
}`,...(de=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:de.source}}};var le,ue,me;B.parameters={...B.parameters,docs:{...(le=B.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-4 gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="gradient">Gradient</Button>
      <Button disabled>Disabled</Button>
    </div>
}`,...(me=(ue=B.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};const De=["Default","Destructive","Outline","Secondary","Ghost","Link","Gradient","Small","Large","Icon","WithIcon","IconLeft","Loading","Disabled","ButtonGroup","AllVariants"];export{B as AllVariants,v as ButtonGroup,a as Default,n as Destructive,h as Disabled,o as Ghost,i as Gradient,u as Icon,p as IconLeft,l as Large,c as Link,g as Loading,t as Outline,s as Secondary,d as Small,m as WithIcon,De as __namedExportsOrder,ke as default};
