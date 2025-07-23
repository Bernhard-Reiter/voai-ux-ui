import{r as N,j as e}from"./iframe-BXdc-fV8.js";import{c as U,a as x}from"./createLucideIcon-DNeJQIBI.js";import{C as r,b as u,c as o,d as b,a as l}from"./Card-k2Ui1ekC.js";import{B as Z}from"./Badge-DGz86kPQ.js";import{B as c}from"./Button-B7D7_xWV.js";import{U as q}from"./user-C9ely6kw.js";import{B as K}from"./bell-C29qaNhO.js";import{S as O}from"./settings-CL2ww7nT.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=U("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);function g(){return g=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var d=arguments[a];for(var i in d)({}).hasOwnProperty.call(d,i)&&(n[i]=d[i])}return n},g.apply(null,arguments)}const w=N.createContext(void 0);function p({defaultValue:n,value:a,onValueChange:d,className:i,children:m,...P}){const[M,L]=N.useState(n||""),_=a??M,G=d??L;return e(w.Provider,{value:{value:_,onValueChange:G}},e("div",g({className:x("w-full",i)},P),m))}function C({className:n,...a}){return e("div",g({className:x("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",n),role:"tablist"},a))}function t({value:n,className:a,...d}){const i=N.useContext(w);if(!i)throw new Error("TabsTrigger must be used within Tabs");const m=i.value===n;return e("button",g({type:"button",role:"tab","aria-selected":m,"data-state":m?"active":"inactive",className:x("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50","data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",a),onClick:()=>i.onValueChange(n)},d))}function s({value:n,className:a,...d}){const i=N.useContext(w);if(!i)throw new Error("TabsContent must be used within Tabs");const m=i.value===n;return m?e("div",g({role:"tabpanel","data-state":m?"active":"inactive",className:x("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",a)},d)):null}p.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};C.__docgenInfo={description:"",methods:[],displayName:"TabsList"};t.__docgenInfo={description:"",methods:[],displayName:"TabsTrigger",props:{value:{required:!0,tsType:{name:"string"},description:""}}};s.__docgenInfo={description:"",methods:[],displayName:"TabsContent",props:{value:{required:!0,tsType:{name:"string"},description:""}}};const ne={title:"Molecules/Tabs",component:p,parameters:{layout:"centered",docs:{description:{component:"Eine Tab-Komponente zur Organisation von Inhalten in verschiedenen Ansichten."}}},tags:["autodocs"],decorators:[n=>e("div",{className:"w-full max-w-3xl"},e(n,null))]},v={render:()=>e(p,{defaultValue:"tab1",className:"w-full"},e(C,null,e(t,{value:"tab1"},"Tab 1"),e(t,{value:"tab2"},"Tab 2"),e(t,{value:"tab3"},"Tab 3")),e(s,{value:"tab1"},e(r,null,e(u,null,e(o,null,"Tab 1 Inhalt"),e(b,null,"Dies ist der Inhalt von Tab 1.")),e(l,null,e("p",null,"Hier können Sie beliebige Inhalte einfügen.")))),e(s,{value:"tab2"},e(r,null,e(u,null,e(o,null,"Tab 2 Inhalt"),e(b,null,"Dies ist der Inhalt von Tab 2.")),e(l,null,e("p",null,"Verschiedene Tabs können unterschiedliche Inhalte anzeigen.")))),e(s,{value:"tab3"},e(r,null,e(u,null,e(o,null,"Tab 3 Inhalt"),e(b,null,"Dies ist der Inhalt von Tab 3.")),e(l,null,e("p",null,"Die Navigation zwischen Tabs ist nahtlos.")))))},T={render:()=>e(p,{defaultValue:"profile",className:"w-full"},e(C,{className:"grid w-full grid-cols-4"},e(t,{value:"profile"},e(q,{className:"mr-2 h-4 w-4"}),"Profil"),e(t,{value:"billing"},e(F,{className:"mr-2 h-4 w-4"}),"Abrechnung"),e(t,{value:"notifications"},e(K,{className:"mr-2 h-4 w-4"}),"Benachrichtigungen"),e(t,{value:"security"},e(O,{className:"mr-2 h-4 w-4"}),"Sicherheit")),e(s,{value:"profile"},e(r,null,e(u,null,e(o,null,"Profil"),e(b,null,"Verwalten Sie Ihre persönlichen Informationen.")),e(l,{className:"space-y-4"},e("div",{className:"grid gap-2"},e("label",{className:"text-sm font-medium"},"Name"),e("input",{type:"text",defaultValue:"Max Mustermann",className:"h-9 rounded-md border border-input bg-background px-3 text-sm"})),e("div",{className:"grid gap-2"},e("label",{className:"text-sm font-medium"},"E-Mail"),e("input",{type:"email",defaultValue:"max@beispiel.de",className:"h-9 rounded-md border border-input bg-background px-3 text-sm"})),e(c,null,"Änderungen speichern")))),e(s,{value:"billing"},e(r,null,e(u,null,e(o,null,"Abrechnung"),e(b,null,"Verwalten Sie Ihre Zahlungsmethoden und Abonnements.")),e(l,null,e("div",{className:"space-y-4"},e("div",{className:"flex items-center justify-between"},e("div",null,e("p",{className:"font-medium"},"Aktueller Plan"),e("p",{className:"text-sm text-muted-foreground"},"Professional")),e(Z,null,"Aktiv")),e("div",{className:"flex items-center justify-between"},e("div",null,e("p",{className:"font-medium"},"Nächste Zahlung"),e("p",{className:"text-sm text-muted-foreground"},"€29.99 am 15. Februar 2024")),e(c,{variant:"outline",size:"sm"},"Ändern")))))),e(s,{value:"notifications"},e(r,null,e(u,null,e(o,null,"Benachrichtigungen"),e(b,null,"Konfigurieren Sie, wie Sie benachrichtigt werden möchten.")),e(l,null,e("div",{className:"space-y-4"},e("div",{className:"flex items-center justify-between"},e("div",null,e("p",{className:"font-medium"},"E-Mail-Benachrichtigungen"),e("p",{className:"text-sm text-muted-foreground"},"Erhalten Sie Updates per E-Mail")),e("input",{type:"checkbox",className:"h-4 w-4",defaultChecked:!0})),e("div",{className:"flex items-center justify-between"},e("div",null,e("p",{className:"font-medium"},"Push-Benachrichtigungen"),e("p",{className:"text-sm text-muted-foreground"},"Erhalten Sie Push-Benachrichtigungen")),e("input",{type:"checkbox",className:"h-4 w-4"})))))),e(s,{value:"security"},e(r,null,e(u,null,e(o,null,"Sicherheit"),e(b,null,"Verwalten Sie Ihre Sicherheitseinstellungen.")),e(l,null,e("div",{className:"space-y-4"},e(c,{variant:"outline",className:"w-full"},"Passwort ändern"),e(c,{variant:"outline",className:"w-full"},"Zwei-Faktor-Authentifizierung"),e(c,{variant:"outline",className:"w-full"},"Aktive Sitzungen"))))))},f={render:()=>e("div",{className:"flex gap-8"},e(p,{defaultValue:"overview",className:"flex gap-8"},e(C,{className:"flex h-auto flex-col"},e(t,{value:"overview",className:"w-full justify-start"},"Übersicht"),e(t,{value:"analytics",className:"w-full justify-start"},"Analysen"),e(t,{value:"reports",className:"w-full justify-start"},"Berichte"),e(t,{value:"settings",className:"w-full justify-start"},"Einstellungen")),e("div",{className:"flex-1"},e(s,{value:"overview"},e(r,null,e(u,null,e(o,null,"Übersicht")),e(l,null,e("p",null,"Dashboard-Übersicht mit wichtigen Metriken.")))),e(s,{value:"analytics"},e(r,null,e(u,null,e(o,null,"Analysen")),e(l,null,e("p",null,"Detaillierte Analysedaten und Visualisierungen.")))),e(s,{value:"reports"},e(r,null,e(u,null,e(o,null,"Berichte")),e(l,null,e("p",null,"Generierte Berichte und Exporte.")))),e(s,{value:"settings"},e(r,null,e(u,null,e(o,null,"Einstellungen")),e(l,null,e("p",null,"Konfigurationsoptionen für das Dashboard.")))))))},h={render:()=>{const[n,a]=React.useState("tab1");return e("div",{className:"space-y-4"},e("div",{className:"flex gap-2"},e(c,{variant:"outline",size:"sm",onClick:()=>a("tab1")},"Gehe zu Tab 1"),e(c,{variant:"outline",size:"sm",onClick:()=>a("tab2")},"Gehe zu Tab 2"),e(c,{variant:"outline",size:"sm",onClick:()=>a("tab3")},"Gehe zu Tab 3")),e(p,{value:n,onValueChange:a},e(C,null,e(t,{value:"tab1"},"Tab 1"),e(t,{value:"tab2"},"Tab 2"),e(t,{value:"tab3"},"Tab 3")),e(s,{value:"tab1"},e(r,null,e(l,{className:"pt-6"},e("p",null,"Aktueller Tab: ",n)))),e(s,{value:"tab2"},e(r,null,e(l,{className:"pt-6"},e("p",null,"Aktueller Tab: ",n)))),e(s,{value:"tab3"},e(r,null,e(l,{className:"pt-6"},e("p",null,"Aktueller Tab: ",n))))))}};var y,k,B;v.parameters={...v.parameters,docs:{...(y=v.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <CardHeader>
            <CardTitle>Tab 1 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 1.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Hier können Sie beliebige Inhalte einfügen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Tab 2 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 2.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Verschiedene Tabs können unterschiedliche Inhalte anzeigen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>
          <CardHeader>
            <CardTitle>Tab 3 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 3.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Die Navigation zwischen Tabs ist nahtlos.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
}`,...(B=(k=v.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var S,V,D;T.parameters={...T.parameters,docs:{...(S=T.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">
          <User className="mr-2 h-4 w-4" />
          Profil
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard className="mr-2 h-4 w-4" />
          Abrechnung
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Benachrichtigungen
        </TabsTrigger>
        <TabsTrigger value="security">
          <Settings className="mr-2 h-4 w-4" />
          Sicherheit
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre persönlichen Informationen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <input type="text" defaultValue="Max Mustermann" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">E-Mail</label>
              <input type="email" defaultValue="max@beispiel.de" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
            </div>
            <Button>Änderungen speichern</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Abrechnung</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre Zahlungsmethoden und Abonnements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Aktueller Plan</p>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
                <Badge>Aktiv</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nächste Zahlung</p>
                  <p className="text-sm text-muted-foreground">€29.99 am 15. Februar 2024</p>
                </div>
                <Button variant="outline" size="sm">Ändern</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Benachrichtigungen</CardTitle>
            <CardDescription>
              Konfigurieren Sie, wie Sie benachrichtigt werden möchten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">E-Mail-Benachrichtigungen</p>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Updates per E-Mail
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push-Benachrichtigungen</p>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Push-Benachrichtigungen
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Sicherheit</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre Sicherheitseinstellungen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">Passwort ändern</Button>
              <Button variant="outline" className="w-full">Zwei-Faktor-Authentifizierung</Button>
              <Button variant="outline" className="w-full">Aktive Sitzungen</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
}`,...(D=(V=T.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var I,A,H;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8">
      <Tabs defaultValue="overview" className="flex gap-8">
        <TabsList className="flex h-auto flex-col">
          <TabsTrigger value="overview" className="w-full justify-start">
            Übersicht
          </TabsTrigger>
          <TabsTrigger value="analytics" className="w-full justify-start">
            Analysen
          </TabsTrigger>
          <TabsTrigger value="reports" className="w-full justify-start">
            Berichte
          </TabsTrigger>
          <TabsTrigger value="settings" className="w-full justify-start">
            Einstellungen
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Übersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Dashboard-Übersicht mit wichtigen Metriken.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analysen</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detaillierte Analysedaten und Visualisierungen.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Berichte</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Generierte Berichte und Exporte.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Einstellungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Konfigurationsoptionen für das Dashboard.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
}`,...(H=(A=f.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var z,j,E;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setValue("tab1")}>
            Gehe zu Tab 1
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue("tab2")}>
            Gehe zu Tab 2
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue("tab3")}>
            Gehe zu Tab 3
          </Button>
        </div>
        
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>;
  }
}`,...(E=(j=h.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};const ae=["Default","AccountSettings","VerticalTabs","Controlled"];export{T as AccountSettings,h as Controlled,v as Default,f as VerticalTabs,ae as __namedExportsOrder,ne as default};
