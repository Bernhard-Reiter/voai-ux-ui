import{C as a,a as r,b as n,c as t,d as s,e as F}from"./Card-k2Ui1ekC.js";import{B as p}from"./Button-B7D7_xWV.js";import{B as E}from"./Badge-DGz86kPQ.js";import{j as e}from"./iframe-BXdc-fV8.js";import{C as M}from"./check-circle-CctDzuaE.js";import{c as z}from"./createLucideIcon-DNeJQIBI.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=z("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=z("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Z={title:"Atoms/Card",component:a,parameters:{layout:"centered",docs:{description:{component:"Eine flexible Card-Komponente für die Darstellung von gruppierten Inhalten."}}},tags:["autodocs"]},l={render:()=>e(a,{className:"w-[350px]"},e(n,null,e(t,null,"Card Title"),e(s,null,"Card description goes here")),e(r,null,e("p",null,"This is the card content. You can put any content here.")))},d={render:()=>e(a,{className:"w-[350px]"},e(n,null,e(t,null,"Benachrichtigungen"),e(s,null,"Sie haben 3 neue Nachrichten")),e(r,null,e("div",{className:"space-y-2"},e("p",{className:"text-sm"},"Ihre wöchentliche Zusammenfassung ist bereit."),e("p",{className:"text-sm text-muted-foreground"},"Letzte Aktualisierung vor 2 Stunden"))),e(F,{className:"flex justify-between"},e(p,{variant:"outline"},"Später"),e(p,null,"Anzeigen")))},c={render:()=>e(a,{className:"w-[350px] cursor-pointer transition-all hover:shadow-lg"},e(n,null,e("div",{className:"flex items-center justify-between"},e(t,null,"Projekt Status"),e(E,{variant:"success"},"Aktiv")),e(s,null,"Klicken Sie für Details")),e(r,null,e("div",{className:"space-y-2"},e("div",{className:"flex items-center gap-2"},e(M,{className:"h-4 w-4 text-green-500"}),e("span",{className:"text-sm"},"5 Tasks abgeschlossen")),e("div",{className:"flex items-center gap-2"},e(G,{className:"h-4 w-4 text-orange-500"}),e("span",{className:"text-sm"},"3 Tasks ausstehend")))))},o={render:()=>e(a,{className:"w-[300px]"},e(n,{className:"flex flex-row items-center justify-between space-y-0 pb-2"},e(t,{className:"text-sm font-medium"},"Gesamtumsatz"),e(I,{className:"h-4 w-4 text-muted-foreground"})),e(r,null,e("div",{className:"text-2xl font-bold"},"€45,231.89"),e("p",{className:"text-xs text-muted-foreground"},"+20.1% gegenüber letztem Monat")))},m={render:()=>e(a,{className:"w-[350px]"},e(n,null,e("div",{className:"flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"},e(I,{className:"h-6 w-6 text-primary"})),e(t,{className:"mt-4"},"Analytics Dashboard"),e(s,null,"Behalten Sie Ihre wichtigsten Metriken im Blick")),e(r,null,e("ul",{className:"space-y-2 text-sm text-muted-foreground"},e("li",null,"• Echtzeit-Datenvisualisierung"),e("li",null,"• Anpassbare Berichte"),e("li",null,"• Export in verschiedene Formate"))),e(F,null,e(p,{className:"w-full"},"Mehr erfahren")))},u={render:()=>e("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-3"},[1,2,3].map(i=>e(a,{key:i},e(n,null,e(t,null,"Card ",i),e(s,null,"Description for card ",i)),e(r,null,e("p",null,"Content for card ",i)))))};var C,g,h;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
    </Card>
}`,...(h=(g=l.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,N,f;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Benachrichtigungen</CardTitle>
        <CardDescription>Sie haben 3 neue Nachrichten</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">Ihre wöchentliche Zusammenfassung ist bereit.</p>
          <p className="text-sm text-muted-foreground">Letzte Aktualisierung vor 2 Stunden</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Später</Button>
        <Button>Anzeigen</Button>
      </CardFooter>
    </Card>
}`,...(f=(N=d.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var v,w,y;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Projekt Status</CardTitle>
          <Badge variant="success">Aktiv</Badge>
        </div>
        <CardDescription>Klicken Sie für Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">5 Tasks abgeschlossen</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm">3 Tasks ausstehend</span>
          </div>
        </div>
      </CardContent>
    </Card>
}`,...(y=(w=c.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var k,b,T;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">€45,231.89</div>
        <p className="text-xs text-muted-foreground">
          +20.1% gegenüber letztem Monat
        </p>
      </CardContent>
    </Card>
}`,...(T=(b=o.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var D,B,S;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
        <CardDescription>
          Behalten Sie Ihre wichtigsten Metriken im Blick
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Echtzeit-Datenvisualisierung</li>
          <li>• Anpassbare Berichte</li>
          <li>• Export in verschiedene Formate</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mehr erfahren</Button>
      </CardFooter>
    </Card>
}`,...(S=(B=m.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var H,j,A;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[1, 2, 3].map(i => <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Description for card {i}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card {i}</p>
          </CardContent>
        </Card>)}
    </div>
}`,...(A=(j=u.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};const _=["Default","WithFooter","Interactive","StatsCard","FeatureCard","CardGrid"];export{u as CardGrid,l as Default,m as FeatureCard,c as Interactive,o as StatsCard,d as WithFooter,_ as __namedExportsOrder,Z as default};
