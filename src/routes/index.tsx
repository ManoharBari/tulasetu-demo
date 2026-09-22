import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, BadgeCheck, BarChart3, Bell, BellRing, Building2, CalendarClock, Camera, Check, CheckCircle2,
  ChevronRight, CircleGauge, ClipboardCheck, Clock3, FileCheck2, FileText, Fuel,
  Gauge, Home, Info, LogOut, Mail, Menu, MessageSquare, QrCode, Route as RouteIcon, Scale, Search, Send, ShieldCheck,
  Siren, Smartphone, Sparkles, Upload, UserRoundCheck, X, XCircle,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "TulaSetu — Digital Legal Metrology Verification" },
    { name: "description", content: "Verify, certify and inspect weighing and measuring instruments through TulaSetu." },
    { property: "og:title", content: "TulaSetu — Digital Legal Metrology Verification" },
    { property: "og:description", content: "A transparent digital bridge for trusted weights and measures." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: TulaSetuApp,
});

type Screen = "owner" | "officer" | "verify" | "enforcement";
type Status = "Pending" | "Verified" | "Rejected" | "Reviewed";

const applications = [
  { id: "TS-APP-240921", instrument: "Electronic Weighing Scale", business: "Sharma General Store", location: "Karol Bagh, New Delhi", date: "18 Sep 2026", status: "Pending" as Status },
  { id: "TS-APP-240884", instrument: "Fuel Dispenser", business: "Bharat Auto Fuel", location: "Noida, Uttar Pradesh", date: "14 Sep 2026", status: "Verified" as Status },
  { id: "TS-APP-240762", instrument: "Platform Scale", business: "Azadpur Fresh Mart", location: "Azadpur, New Delhi", date: "08 Sep 2026", status: "Rejected" as Status },
  { id: "TS-APP-240635", instrument: "Jewellery Balance", business: "Mehta Jewellers", location: "Chandni Chowk, Delhi", date: "02 Sep 2026", status: "Verified" as Status },
];

const inspections = [
  { id: "TS-APP-240921", business: "Sharma General Store", type: "Electronic Weighing Scale", location: "Karol Bagh, New Delhi", submitted: "18 Sep, 10:42 AM" },
  { id: "TS-APP-240918", business: "Kisan Grain Traders", type: "Platform Scale", location: "Narela, New Delhi", submitted: "18 Sep, 09:15 AM" },
  { id: "TS-APP-240901", business: "City Care Pharmacy", type: "Precision Balance", location: "Dwarka, New Delhi", submitted: "17 Sep, 04:30 PM" },
  { id: "TS-APP-240897", business: "Highway Service Station", type: "Fuel Dispenser", location: "Gurugram, Haryana", submitted: "17 Sep, 02:18 PM" },
];

const reportsSeed = [
  { id: "RPT-1082", reason: "Scale reading differs from packaged weight", business: "Gupta Provision Store", location: "Rohini, Delhi", date: "20 Sep 2026", status: "Pending" as Status },
  { id: "RPT-1079", reason: "Fuel dispenser stopped before selected amount", business: "Metro Fuel Point", location: "Lajpat Nagar, Delhi", date: "19 Sep 2026", status: "Pending" as Status },
  { id: "RPT-1071", reason: "Verification seal appears damaged", business: "Fresh Basket Market", location: "Saket, Delhi", date: "18 Sep 2026", status: "Reviewed" as Status },
  { id: "RPT-1064", reason: "Certificate QR code not visible", business: "New India Hardware", location: "Janakpuri, Delhi", date: "16 Sep 2026", status: "Pending" as Status },
  { id: "RPT-1058", reason: "Suspected under-weighing during purchase", business: "Capital Scrap Traders", location: "Mayapuri, Delhi", date: "15 Sep 2026", status: "Reviewed" as Status },
];

const officerAlerts = [
  { id: "ALR-341", icon: Mail, channel: "Email", tone: "teal", text: "30-day expiry reminder sent to Sharma General Store — certificate ends 04 Oct 2026", time: "Today, 09:00 AM" },
  { id: "ALR-340", icon: Smartphone, channel: "SMS", tone: "teal", text: "7-day reminder sent to Bharat Auto Fuel — fuel dispenser re-verification due", time: "Today, 09:00 AM" },
  { id: "ALR-339", icon: Siren, channel: "Escalation", tone: "red", text: "Overdue: Mehta Jewellers certificate lapsed 2 days ago — flagged for field visit", time: "Today, 08:30 AM" },
];

const ownerAlertSchedule = [
  { icon: Mail, channel: "Email", when: "30 days before expiry", detail: "Renewal notice with application link" },
  { icon: Smartphone, channel: "SMS", when: "7 days before expiry", detail: "Short reminder with certificate ID" },
  { icon: MessageSquare, channel: "WhatsApp", when: "1 day before expiry", detail: "Final warning before lapsing" },
];

const navItems = [
  { id: "owner" as Screen, label: "Owner Portal", icon: Building2 },
  { id: "officer" as Screen, label: "Officer Screen", icon: ClipboardCheck },
  { id: "verify" as Screen, label: "Scan & Verify", icon: QrCode },
  { id: "enforcement" as Screen, label: "Enforcement", icon: ShieldCheck },
];

function TulaSetuApp() {
  const [screen, setScreen] = useState<Screen>("verify");
  const [mobileNav, setMobileNav] = useState(false);
  const labels: Record<Screen, [string, string]> = {
    owner: ["Owner Portal", "Submit and track instrument verification"],
    officer: ["Inspection Desk", "Review assigned verification applications"],
    verify: ["Scan & Verify", "Check an instrument certificate instantly"],
    enforcement: ["Enforcement Dashboard", "Review citizen reports and follow-up actions"],
  };
  return <div className="min-h-screen bg-background p-0 text-foreground lg:p-5 xl:p-7">
    <div className="mx-auto min-h-screen max-w-[1540px] overflow-hidden bg-card shadow-2xl lg:flex lg:min-h-[calc(100vh-2.5rem)] lg:rounded-[28px] lg:border lg:border-card xl:min-h-[calc(100vh-3.5rem)]">
    <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background text-foreground transition-transform lg:relative lg:inset-auto lg:min-h-full lg:translate-x-0", mobileNav ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-24 items-center gap-3 px-7">
        <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md"><Scale className="size-6" /></div>
        <div><div className="font-display text-xl font-bold text-primary">TulaSetu</div><div className="text-[10px] text-muted-foreground">सत्य माप • सुरक्षित व्यापार</div></div>
        <Button variant="ghost" size="icon" className="ml-auto lg:hidden" aria-label="Close menu" onClick={() => setMobileNav(false)}><X /></Button>
      </div>
      <div className="px-7 pt-4 text-[10px] font-bold uppercase text-muted-foreground">Demo workspaces</div>
      <nav className="mt-4 space-y-2 px-4">
        {navItems.map((item) => <button key={item.id} onClick={() => { setScreen(item.id); setMobileNav(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-all", screen === item.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:bg-card/60 hover:text-foreground")}><item.icon className="size-5" />{item.label}{screen === item.id && <ChevronRight className="ml-auto size-4 text-accent" />}</button>)}
      </nav>
      <div className="mt-auto p-5">
        <button className="mt-3 flex w-full items-center gap-3 px-3 py-2 text-xs text-muted-foreground"><LogOut className="size-4" />Exit demo</button>
      </div>
    </aside>
    {mobileNav && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-primary/30 lg:hidden" onClick={() => setMobileNav(false)} />}
    <main className="min-w-0 flex-1 bg-card">
      <header className="sticky top-0 z-20 flex h-20 items-center border-b border-border bg-card/95 px-4 backdrop-blur md:px-8 lg:h-24 lg:border-b-0">
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu /></Button>
        <div><h1 className="font-display text-lg font-bold md:text-xl">{labels[screen][0]}</h1><p className="hidden text-xs text-muted-foreground sm:block">{labels[screen][1]}</p></div>
        <div className="ml-auto flex items-center gap-3"><span className="hidden rounded-xl bg-muted px-3 py-2 text-[11px] font-bold text-success sm:inline-flex"><span className="mr-1.5 mt-1 size-1.5 rounded-full bg-success" />System online</span><div className="flex items-center gap-3 rounded-full border border-border bg-card p-1.5 pr-4 shadow-sm"><div className="flex size-8 items-center justify-center rounded-full bg-orange-soft font-display text-xs font-bold text-orange">TS</div><div className="hidden sm:block"><div className="text-[11px] font-bold">Demo Officer</div><div className="text-[9px] text-muted-foreground">Central Registry</div></div></div></div>
      </header>
      <div className="mx-auto max-w-[1500px] p-4 pt-1 md:p-8 md:pt-2">
        {screen === "owner" && <OwnerPortal />}
        {screen === "officer" && <OfficerScreen />}
        {screen === "verify" && <VerifyPage />}
        {screen === "enforcement" && <EnforcementDashboard />}
      </div>
    </main>
    </div>
  </div>;
}

function OwnerAlerts() {
  const [renewed, setRenewed] = useState(false);
  const [channels, setChannels] = useState({ Email: true, SMS: true, WhatsApp: false });
  return <section className="rounded-lg border border-border bg-card shadow-sm">
    <div className="flex items-start gap-3 border-b border-border p-5 md:p-6"><div className="rounded-md bg-orange-soft p-2 text-orange"><BellRing /></div><div><h2 className="font-display font-bold">Automated expiry alerts</h2><p className="mt-1 text-xs text-muted-foreground">TulaSetu notifies you automatically before a certificate lapses — no manual tracking needed.</p></div></div>
    <div className="space-y-5 p-5 md:p-6">
      <div className="flex flex-col gap-3 rounded-xl border border-orange/40 bg-orange-soft p-4 sm:flex-row sm:items-center"><div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange text-primary-foreground"><Bell className="size-5" /></div><div className="min-w-0 flex-1"><div className="text-sm font-bold">Certificate expires in 12 days</div><p className="mt-0.5 text-xs text-muted-foreground">Electronic Weighing Scale • Sharma General Store • valid until 04 Oct 2026</p></div>{renewed ? <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-xs font-bold text-success"><Check className="size-3.5" />Renewal requested</span> : <Button variant="orange" size="sm" onClick={() => setRenewed(true)}>Renew now</Button>}</div>
      <div className="grid gap-3 sm:grid-cols-3">{ownerAlertSchedule.map((step) => <div key={step.when} className="rounded-xl border border-border bg-muted/40 p-4"><div className="flex items-center gap-2 text-accent"><step.icon className="size-4" /><span className="text-[11px] font-bold uppercase">{step.channel}</span></div><div className="mt-2 text-sm font-bold">{step.when}</div><p className="mt-1 text-[11px] text-muted-foreground">{step.detail}</p></div>)}</div>
      <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center"><div className="flex-1"><div className="text-sm font-bold">Notification channels</div><p className="mt-0.5 text-xs text-muted-foreground">Choose how automated alerts reach you.</p></div><div className="flex flex-wrap gap-2">{(Object.keys(channels) as (keyof typeof channels)[]).map((name) => <button key={name} type="button" onClick={() => setChannels((prev) => ({ ...prev, [name]: !prev[name] }))} className={cn("flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all", channels[name] ? "border-accent bg-secondary text-accent" : "border-border text-muted-foreground")}><span className={cn("flex h-4 w-7 items-center rounded-full p-0.5 transition-colors", channels[name] ? "bg-accent" : "bg-border")}><span className={cn("size-3 rounded-full bg-card transition-transform", channels[name] && "translate-x-3")} /></span>{name}</button>)}</div></div>
    </div>
  </section>;
}

function OfficerAlerts() {
  return <section className="rounded-2xl border border-border bg-card shadow-sm">
    <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3"><div className="rounded-md bg-secondary p-2 text-accent"><Bell className="size-5" /></div><div><h2 className="font-display font-bold">Automated alerts</h2><p className="mt-1 text-xs text-muted-foreground">Expiry notices and escalations dispatched automatically across your jurisdiction.</p></div></div>
      <span className="w-fit rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold text-accent">3 sent today • auto</span>
    </div>
    <div className="divide-y divide-border">{officerAlerts.map((alert) => <div key={alert.id} className="flex items-start gap-3 px-5 py-4"><div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", alert.tone === "red" ? "bg-danger-soft text-destructive" : "bg-secondary text-accent")}><alert.icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{alert.text}</p><p className="mt-1 text-[11px] text-muted-foreground">{alert.id} • {alert.channel} • {alert.time}</p></div><span className={cn("mt-1 hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex", alert.tone === "red" ? "bg-danger-soft text-destructive" : "bg-success-soft text-success")}>{alert.tone === "red" ? "Action needed" : "Delivered"}</span></div>)}</div>
  </section>;
}

function OwnerPortal() {
  const [submitted, setSubmitted] = useState(false);
  function submit(e: FormEvent) { e.preventDefault(); setSubmitted(true); }
  return <div className="space-y-7">
    <section className="rounded-lg border border-border bg-card shadow-sm"><div className="flex items-start gap-3 border-b border-border p-5 md:p-6"><div className="rounded-md bg-secondary p-2 text-accent"><FileCheck2 /></div><div><h2 className="font-display font-bold">New verification request</h2><p className="mt-1 text-xs text-muted-foreground">Enter instrument and establishment details for inspection.</p></div></div>
      {submitted ? <div className="p-10 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success-soft text-success"><CheckCircle2 /></div><h3 className="mt-4 font-display text-lg font-bold">Application submitted</h3><p className="mt-1 text-sm text-muted-foreground">Reference TS-APP-241026 has been added to the inspection queue.</p><Button className="mt-5" variant="outline" onClick={() => setSubmitted(false)}>Submit another</Button></div> : <form onSubmit={submit} className="grid gap-5 p-5 md:grid-cols-2 md:p-6"><Field label="Instrument type"><select required className="input"><option>Electronic Weighing Scale</option><option>Fuel Dispenser</option><option>Platform Scale</option><option>Precision Balance</option></select></Field><Field label="Business / establishment name"><input required className="input" defaultValue="Sharma General Store" /></Field><Field label="Location"><input required className="input" defaultValue="Karol Bagh, New Delhi — 110005" /></Field><Field label="Instrument serial number"><input required className="input" defaultValue="EWS-DL-748291" /></Field><div className="md:col-span-2"><UploadBox label="Upload instrument photograph" /></div><div className="flex justify-end md:col-span-2"><Button variant="teal" type="submit"><Send className="size-4" />Submit for verification</Button></div></form>}
    </section>
    <section><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display font-bold">Your applications</h2><p className="text-xs text-muted-foreground">4 applications submitted this month</p></div><Button variant="outline" size="sm"><Search className="size-3.5" />Filter</Button></div><div className="overflow-hidden rounded-lg border border-border bg-card"><div className="hidden grid-cols-[1.1fr_1.4fr_1.2fr_.8fr] gap-4 border-b border-border bg-muted/60 px-5 py-3 text-[10px] font-bold uppercase text-muted-foreground md:grid"><span>Application</span><span>Establishment</span><span>Location</span><span>Status</span></div>{applications.map((app) => <div key={app.id} className="grid gap-2 border-b border-border px-5 py-4 last:border-0 md:grid-cols-[1.1fr_1.4fr_1.2fr_.8fr] md:items-center md:gap-4"><div><div className="text-sm font-bold">{app.instrument}</div><div className="text-[11px] text-muted-foreground">{app.id} • {app.date}</div></div><div className="text-sm font-medium">{app.business}</div><div className="text-xs text-muted-foreground">{app.location}</div><StatusBadge status={app.status} /></div>)}</div></section>
  </div>;
}

const scheduleSlots = [
  { time: "09:30 AM", app: () => inspections[1]!, travel: "Start point • Narela", duration: "45 min" },
  { time: "11:15 AM", app: () => inspections[0]!, travel: "18 km • ~40 min drive", duration: "40 min" },
  { time: "01:30 PM", app: () => inspections[2]!, travel: "14 km • ~35 min drive", duration: "35 min" },
  { time: "03:15 PM", app: () => inspections[3]!, travel: "22 km • ~50 min drive", duration: "50 min" },
];

function SmartSchedule({ onSelect }: { onSelect: (item: (typeof inspections)[number]) => void }) {
  const [planned, setPlanned] = useState(false);
  return <section className="rounded-2xl border border-border bg-card shadow-sm">
    <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3"><div className="rounded-md bg-orange-soft p-2 text-orange"><CalendarClock className="size-5" /></div><div><h2 className="font-display font-bold">Smart scheduling</h2><p className="mt-1 text-xs text-muted-foreground">Groups today's pending inspections into an optimized visit route by location and priority.</p></div></div>
      <Button variant={planned ? "outline" : "teal"} size="sm" onClick={() => setPlanned(!planned)}>{planned ? <><X className="size-3.5" />Clear plan</> : <><Sparkles className="size-3.5" />Plan my day</>}</Button>
    </div>
    {!planned ? <div className="flex items-center gap-3 p-5 text-sm text-muted-foreground"><Info className="size-4 shrink-0 text-accent" />4 pending inspections across 3 zones. One tap builds a route with estimated travel times.</div> : <div className="p-5"><div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold"><span className="rounded-full bg-secondary px-3 py-1.5 text-accent">4 visits</span><span className="rounded-full bg-secondary px-3 py-1.5 text-accent">54 km total</span><span className="rounded-full bg-secondary px-3 py-1.5 text-accent">Est. finish 04:05 PM</span><span className="rounded-full bg-success-soft px-3 py-1.5 text-success">Route optimized</span></div>
      <ol className="space-y-0">{scheduleSlots.map((slot, i) => <li key={slot.time} className="relative flex gap-4 pb-5 last:pb-0"><div className="flex flex-col items-center"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-card text-[11px] font-bold text-accent">{i + 1}</span>{i < scheduleSlots.length - 1 && <span className="w-0.5 flex-1 bg-accent/25" />}</div><button onClick={() => onSelect(slot.app()!)} className="mb-1 flex-1 rounded-xl border border-border bg-muted/40 p-4 text-left transition-all hover:border-accent/50 hover:shadow-sm"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-bold">{slot.app()!.business}</span><span className="rounded-md bg-card px-2 py-1 text-[11px] font-bold text-accent shadow-sm">{slot.time} • {slot.duration}</span></div><p className="mt-1 text-xs text-muted-foreground">{slot.app()!.type} • {slot.app()!.location}</p><p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-orange"><RouteIcon className="size-3.5" />{slot.travel}</p></button></li>)}</ol></div>}
  </section>;
}

function OfficerScreen() {
  const [selected, setSelected] = useState(inspections[0]); const [certificate, setCertificate] = useState(false); const [result, setResult] = useState("pass");
  if (!selected) return null;
  if (certificate) return <Certificate business={selected.business} type={selected.type} onBack={() => setCertificate(false)} />;
  return <div className="space-y-6"><SmartSchedule onSelect={setSelected} /><div className="grid gap-6 xl:grid-cols-[.82fr_1.18fr]"><section><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display font-bold">Pending queue</h2><p className="text-xs text-muted-foreground">4 inspections awaiting action</p></div><span className="rounded-md bg-orange-soft px-2 py-1 text-xs font-bold text-orange">4 pending</span></div><div className="space-y-3">{inspections.map((item, i) => <button key={item.id} onClick={() => setSelected(item)} className={cn("w-full rounded-lg border bg-card p-4 text-left transition-all", selected.id === item.id ? "border-accent shadow-sm ring-1 ring-accent" : "border-border hover:border-accent/40")}><div className="flex gap-3"><div className={cn("flex size-10 shrink-0 items-center justify-center rounded-md", i === 3 ? "bg-orange-soft text-orange" : "bg-secondary text-accent")}>{i === 3 ? <Fuel /> : <Scale />}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><span className="truncate text-sm font-bold">{item.business}</span><ChevronRight className="size-4 text-muted-foreground" /></div><p className="mt-0.5 text-xs text-muted-foreground">{item.type}</p><p className="mt-2 text-[11px] text-muted-foreground">{item.id} • {item.submitted}</p></div></div></button>)}</div></section>
    <section className="h-fit rounded-lg border border-border bg-card shadow-sm"><div className="border-b border-border p-5"><div className="flex items-center justify-between"><div><span className="text-[10px] font-bold uppercase text-accent">Inspection record</span><h2 className="mt-1 font-display text-lg font-bold">{selected.business}</h2></div><StatusBadge status="Pending" /></div><div className="mt-4 grid gap-3 rounded-md bg-muted p-4 text-xs sm:grid-cols-2"><span><b>Instrument:</b> {selected.type}</span><span><b>Application:</b> {selected.id}</span><span className="sm:col-span-2"><b>Location:</b> {selected.location}</span></div></div>
      <form onSubmit={(e) => { e.preventDefault(); setCertificate(true); }} className="space-y-5 p-5"><Field label="Inspection result"><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setResult("pass")} className={cn("flex items-center justify-center gap-2 rounded-md border p-3 text-sm font-bold", result === "pass" ? "border-success bg-success-soft text-success" : "border-border")}><CheckCircle2 className="size-4" />Pass</button><button type="button" onClick={() => setResult("fail")} className={cn("flex items-center justify-center gap-2 rounded-md border p-3 text-sm font-bold", result === "fail" ? "border-destructive bg-danger-soft text-destructive" : "border-border")}><XCircle className="size-4" />Fail</button></div></Field><Field label="Observed reading"><div className="relative"><input className="input pr-12" defaultValue="5.002" required /><span className="absolute right-3 top-2.5 text-xs font-bold text-muted-foreground">kg</span></div></Field><Field label="Inspection notes"><textarea className="input min-h-20 resize-none" defaultValue="Instrument tested with standard 5 kg reference weight. Reading within permissible error limit." /></Field><UploadBox label="Add inspection photograph" compact /><Button className="w-full" variant="teal" type="submit"><BadgeCheck className="size-4" />Submit result & generate certificate</Button></form>
    </section></div></div>;
}

function Certificate({ business, type, onBack }: { business: string; type: string; onBack: () => void }) {
  return <div className="mx-auto max-w-3xl"><div className="mb-4 flex items-center justify-between"><Button variant="ghost" onClick={onBack}>← Back to inspection</Button><span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">Certificate generated</span></div><div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><div className="h-2 bg-accent" /><div className="p-6 md:p-10"><div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row"><div className="flex gap-3"><div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground"><Scale /></div><div><h2 className="font-display text-2xl font-bold">Certificate of Verification</h2><p className="text-xs text-muted-foreground">Legal Metrology Department • Government of India</p></div></div><MockQr /></div><div className="grid gap-6 py-7 sm:grid-cols-2"><CertField label="Certificate ID" value="TS-CERT-DL-2026-8841" /><CertField label="Status" value="VERIFIED" success /><CertField label="Business" value={business} /><CertField label="Instrument" value={type} /><CertField label="Verified on" value="21 September 2026" /><CertField label="Valid until" value="20 September 2027" /></div><div className="flex items-start gap-3 rounded-md bg-success-soft p-4 text-success"><CheckCircle2 className="mt-0.5 size-5 shrink-0" /><p className="text-sm"><b>Instrument meets prescribed standards.</b><br/><span className="text-xs">Verified under the Legal Metrology Act, 2009.</span></p></div></div></div></div>;
}

const verifyCases = {
  "TS-CERT-DL-2026-8841": { type: "valid", title: "Certificate is valid", message: "This instrument is verified and approved for commercial use.", business: "Sharma General Store", instrument: "Electronic Weighing Scale", serial: "EWS-DL-748291", validity: "20 Sep 2027" },
  "TS-CERT-DL-2025-4192": { type: "expired", title: "Certificate expired", message: "This instrument requires re-verification before commercial use.", business: "National Grain Depot", instrument: "Platform Scale", serial: "PS-DL-284401", validity: "12 Aug 2026" },
  "TS-CERT-XX-0000": { type: "missing", title: "Certificate not found", message: "No matching certificate exists. Check the ID or report a suspected issue.", business: "—", instrument: "—", serial: "—", validity: "—" },
};

function VerifyPage() {
  const [query, setQuery] = useState("TS-CERT-DL-2026-8841"); const [active, setActive] = useState<keyof typeof verifyCases>("TS-CERT-DL-2026-8841"); const [reportOpen, setReportOpen] = useState(false); const [reported, setReported] = useState(false);
  const data = verifyCases[active];
  function verify(e: FormEvent) { e.preventDefault(); const normalized = query.trim().toUpperCase() as keyof typeof verifyCases; setActive(verifyCases[normalized] ? normalized : "TS-CERT-XX-0000"); }
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-3"><VerifyStat label="Certificates checked" value="1,284" note="Across 12 districts" tone="teal"/><VerifyStat label="Valid today" value="856" note="98.2% pass rate"/><VerifyStat label="Issues reported" value="23" note="Awaiting review" tone="orange"/></div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_340px]">
      <div className="space-y-5"><div className="overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-lg"><div className="grid items-center gap-7 p-6 md:grid-cols-[1fr_auto] md:p-8"><div><div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent"><QrCode /></div><h2 className="font-display text-2xl font-bold">Verify an instrument</h2><p className="mt-2 max-w-lg text-sm text-primary-foreground/65">Enter the certificate ID printed beside the QR code to check its current legal status.</p><form onSubmit={verify} className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><input aria-label="Certificate ID" className="h-11 w-full rounded-lg bg-card pl-10 pr-3 text-sm font-semibold text-foreground outline-none ring-offset-2 focus:ring-2 focus:ring-accent" value={query} onChange={(e) => setQuery(e.target.value)} /></div><Button variant="teal" className="h-11" type="submit">Verify now</Button></form></div><MockQr large /></div></div>
      <section className={cn("overflow-hidden rounded-2xl border bg-card shadow-sm", data.type === "valid" ? "border-success/35" : data.type === "expired" ? "border-orange/40" : "border-destructive/35")}><div className={cn("flex flex-col gap-4 p-6 sm:flex-row sm:items-center", data.type === "valid" ? "bg-success-soft" : data.type === "expired" ? "bg-orange-soft" : "bg-danger-soft")}><div className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", data.type === "valid" ? "bg-success text-primary-foreground" : data.type === "expired" ? "bg-orange text-primary-foreground" : "bg-destructive text-destructive-foreground")}>{data.type === "valid" ? <Check /> : data.type === "expired" ? <Clock3 /> : <X />}</div><div><h3 className="font-display text-xl font-bold">{data.title}</h3><p className="mt-1 text-sm text-muted-foreground">{data.message}</p></div>{data.type === "valid" && <div className="sm:ml-auto"><span className="inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-xs font-bold text-primary-foreground"><BadgeCheck className="size-4" />VALID</span></div>}</div><div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4"><CertField label="Registered business" value={data.business}/><CertField label="Instrument" value={data.instrument}/><CertField label="Serial number" value={data.serial}/><CertField label="Valid until" value={data.validity}/></div><div className="flex flex-col items-start justify-between gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-xs text-muted-foreground"><Info className="size-4" />Last checked: just now • Official TulaSetu record</p><Button variant="outline" size="sm" onClick={() => { setReportOpen(true); setReported(false); }}><AlertTriangle className="size-3.5" />Report an issue</Button></div></section></div>
      <aside className="space-y-5"><div className="rounded-2xl bg-muted p-5"><div className="flex items-center justify-between"><h3 className="font-display text-sm font-bold">Quick verification</h3><CircleGauge className="size-5 text-accent"/></div><p className="mt-1 text-xs text-muted-foreground">Try a sample certificate outcome.</p><div className="mt-5 space-y-2">{Object.keys(verifyCases).map((id, index) => <button key={id} onClick={() => { setQuery(id); setActive(id as keyof typeof verifyCases); }} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all", active === id ? "border-accent bg-card shadow-sm" : "border-transparent bg-card/55 hover:border-border")}><span className={cn("flex size-8 items-center justify-center rounded-lg text-xs font-bold", index === 0 ? "bg-success-soft text-success" : index === 1 ? "bg-orange-soft text-orange" : "bg-danger-soft text-destructive")}>{index === 0 ? <Check className="size-4"/> : index === 1 ? <Clock3 className="size-4"/> : <X className="size-4"/>}</span><span className="min-w-0"><span className="block truncate text-[11px] font-bold">{id}</span><span className="text-[10px] text-muted-foreground">{index === 0 ? "Valid record" : index === 1 ? "Expired record" : "Unknown record"}</span></span></button>)}</div></div><div className="rounded-2xl border border-border bg-card p-5"><h3 className="font-display text-sm font-bold">Recent checks</h3><div className="mt-4 space-y-4"><Activity label="Fuel dispenser" place="Noida • 2 min ago" valid/><Activity label="Platform scale" place="Narela • 8 min ago" valid/><Activity label="Jewellery balance" place="Delhi • 14 min ago"/></div></div></aside>
    </div>
    {reportOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/45 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) setReportOpen(false); }}><div role="dialog" aria-modal="true" aria-label="Report an issue" className="w-full max-w-md rounded-lg bg-card shadow-xl"><div className="flex items-center justify-between border-b border-border p-5"><div><h3 className="font-display font-bold">Report an issue</h3><p className="text-xs text-muted-foreground">Certificate {active}</p></div><Button variant="ghost" size="icon" onClick={() => setReportOpen(false)} aria-label="Close"><X /></Button></div>{reported ? <div className="p-8 text-center"><CheckCircle2 className="mx-auto size-12 text-success"/><h4 className="mt-3 font-display font-bold">Report received</h4><p className="mt-1 text-sm text-muted-foreground">Your reference is RPT-1088. An enforcement officer will review it.</p><Button className="mt-5" onClick={() => setReportOpen(false)}>Done</Button></div> : <form onSubmit={(e) => { e.preventDefault(); setReported(true); }} className="space-y-4 p-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Your name"><input required maxLength={80} className="input" placeholder="e.g. Priya Sharma" /></Field><Field label="Email address"><input required type="email" maxLength={120} className="input" placeholder="you@example.com" /></Field></div><p className="text-[11px] leading-relaxed text-muted-foreground">Contact details are required so officers can follow up. Fake or misleading reports are punishable under the Legal Metrology Act.</p><Field label="What seems wrong?"><select className="input"><option>Instrument reading seems incorrect</option><option>Certificate details do not match</option><option>Seal is missing or damaged</option><option>Other concern</option></select></Field><Field label="Additional details"><textarea className="input min-h-20 resize-none" placeholder="Briefly describe what you noticed…" /></Field><UploadBox label="Add a photo (optional)" compact/><Button className="w-full" variant="teal" type="submit">Submit report</Button></form>}</div></div>}
  </div>;
}

function VerifyStat({ label, value, note, tone }: { label: string; value: string; note: string; tone?: "teal" | "orange" }) { return <div className={cn("rounded-2xl border border-border bg-card p-5", tone === "teal" && "border-accent bg-accent text-accent-foreground", tone === "orange" && "bg-orange-soft")}><div className={cn("text-[10px] font-bold uppercase text-muted-foreground", tone === "teal" && "text-accent-foreground/70", tone === "orange" && "text-orange")}>{label}</div><div className="mt-3 font-display text-3xl font-bold">{value}</div><div className={cn("mt-1 text-[11px] text-muted-foreground", tone === "teal" && "text-accent-foreground/70")}>{note}</div></div>; }
function Activity({ label, place, valid = false }: { label: string; place: string; valid?: boolean }) { return <div className="flex items-start gap-3"><span className={cn("mt-1 size-2 rounded-full", valid ? "bg-success" : "bg-orange")}/><div><div className="text-xs font-bold">{label}</div><div className="text-[10px] text-muted-foreground">{place}</div></div></div>; }

function EnforcementDashboard() {
  const [reports, setReports] = useState(reportsSeed);
  const pending = reports.filter((r) => r.status === "Pending").length;
  return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-3"><Stat icon={<FileText/>} label="Total reports" value={String(reports.length)} note="This review cycle"/><Stat icon={<Clock3/>} label="Pending review" value={String(pending)} note="Requires attention" accent/><Stat icon={<CheckCircle2/>} label="Reviewed" value={String(reports.length-pending)} note="Action recorded" success/></div><section><div className="mb-4"><h2 className="font-display font-bold">Citizen reports</h2><p className="text-xs text-muted-foreground">Review issues submitted from public certificate checks.</p></div><div className="overflow-hidden rounded-lg border border-border bg-card"><div className="hidden grid-cols-[.8fr_2fr_1.2fr_.8fr_.8fr] gap-4 border-b border-border bg-muted/60 px-5 py-3 text-[10px] font-bold uppercase text-muted-foreground lg:grid"><span>Report</span><span>Issue</span><span>Location</span><span>Status</span><span>Action</span></div>{reports.map((report) => <div key={report.id} className="grid gap-3 border-b border-border p-5 last:border-0 lg:grid-cols-[.8fr_2fr_1.2fr_.8fr_.8fr] lg:items-center lg:gap-4"><div><div className="text-sm font-bold">{report.id}</div><div className="text-[11px] text-muted-foreground">{report.date}</div></div><div><div className="text-sm font-semibold">{report.reason}</div><div className="text-xs text-muted-foreground">{report.business}</div></div><div className="text-xs text-muted-foreground">{report.location}</div><StatusBadge status={report.status}/><Button variant={report.status === "Pending" ? "teal" : "outline"} size="sm" onClick={() => setReports((prev) => prev.map((r) => r.id === report.id ? {...r, status: r.status === "Pending" ? "Reviewed" : "Pending"} : r))}>{report.status === "Pending" ? <><Check className="size-3.5"/>Mark reviewed</> : <>Reopen</>}</Button></div>)}</div></section></div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-2 block text-xs font-bold text-foreground">{label}</span>{children}</label>; }
function UploadBox({ label, compact = false }: { label: string; compact?: boolean }) { return <label className={cn("flex cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/40 text-muted-foreground hover:border-accent hover:text-accent", compact ? "h-16" : "h-24")}><input type="file" accept="image/*" className="sr-only"/><Camera className="size-5"/><span className="text-xs font-semibold">{label}</span><Upload className="size-4"/></label>; }
function StatusBadge({ status }: { status: Status }) { const style = status === "Verified" || status === "Reviewed" ? "bg-success-soft text-success" : status === "Rejected" ? "bg-danger-soft text-destructive" : "bg-warning-soft text-warning"; return <span className={cn("w-fit rounded-full px-2.5 py-1 text-[10px] font-bold", style)}>{status}</span>; }
function CertField({ label, value, success = false }: { label: string; value: string; success?: boolean }) { return <div><div className="text-[10px] font-bold uppercase text-muted-foreground">{label}</div><div className={cn("mt-1 text-sm font-bold", success && "text-success")}>{value}</div></div>; }
function MockQr({ large = false }: { large?: boolean }) { const bits = [1,1,1,0,1,1,1,1,0,1,0,1,0,0,1,1,1,0,1,1,1,0,0,1,0,1,0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,0]; return <div aria-label="Mock QR code" className={cn("grid shrink-0 grid-cols-7 gap-0.5 rounded-md bg-card p-2", large ? "size-32" : "size-24")}>{bits.map((on,i)=><span key={i} className={on ? "bg-primary" : "bg-card"}/>)}</div>; }
function Stat({ icon, label, value, note, accent, success }: { icon: ReactNode; label: string; value: string; note: string; accent?: boolean; success?: boolean }) { return <div className="rounded-lg border border-border bg-card p-5"><div className="flex items-center justify-between"><div className={cn("flex size-9 items-center justify-center rounded-md bg-secondary text-accent", accent && "bg-orange-soft text-orange", success && "bg-success-soft text-success")}>{icon}</div><BarChart3 className="size-4 text-muted-foreground"/></div><div className="mt-4 font-display text-3xl font-bold">{value}</div><div className="mt-1 text-sm font-bold">{label}</div><div className="text-[11px] text-muted-foreground">{note}</div></div>; }