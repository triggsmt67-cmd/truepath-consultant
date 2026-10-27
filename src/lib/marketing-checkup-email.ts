import { checkupNote, getCheckupReport, type Answer } from "./marketing-checkup";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
})[character]!);
const colors = { ink: "#20251f", paper: "#f1f0e8", muted: "#5c615a", brown: "#955a32", line: "#d0d1c7" };
const labelStyle = `font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;letter-spacing:1.6px;text-transform:uppercase;font-weight:bold;color:${colors.brown};margin:0 0 10px`;
const paragraph = `font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;margin:0;color:${colors.ink}`;

export function renderCheckupEmail(answers: Answer[]) {
  const report = getCheckupReport(answers);
  const text = [
    "TRUE PATH DIGITAL\nYour Marketing Checkup", checkupNote,
    report.title, report.summary,
    `${report.startLabel.toUpperCase()}: ${report.start.topic}\n${report.startReason}\n${report.start.next}`,
    "YOUR ANSWERS & NEXT STEPS",
    ...report.items.map((item) => `${String(item.number).padStart(2, "0")}. ${item.topic}\n${item.title}\nYour answer: ${item.answer} - ${item.label}\n\nNext step: ${item.next}\n\nWhat to review: ${item.evidence}\n\nAsk your agency: ${item.ask}`),
    "MAKE THE CONVERSATION COUNT\nChoose one item to discuss first. Agree on who will take the next step, when you will review it, and what information you will look at together.",
    "Want a second set of eyes on this? https://truepath406.com/#contact",
    "You requested this copy from True Path. This does not sign you up for marketing emails.",
  ].join("\n\n");
  const cards = report.items.map((item) => {
    const background = item.answer === "No" ? "#f2e5dc" : item.answer === "Not sure" ? "#ece9df" : "#e2e6df";
    return `<tr><td class="report-pad" style="padding:30px 38px;border-bottom:1px solid ${colors.line}">
      <p style="${labelStyle}">${String(item.number).padStart(2, "0")} / ${escapeHtml(item.topic)}</p>
      <h3 style="font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:23px;line-height:1.25;margin:0 0 14px;color:${colors.ink}">${escapeHtml(item.title)}</h3>
      <p style="${paragraph};font-size:12px;margin:0 0 20px"><span style="background-color:${background};color:${colors.ink};padding:6px 10px;display:inline-block"><strong>Your answer: ${item.answer}</strong> &nbsp; / &nbsp; ${item.label}</span></p>
      <p style="${paragraph};margin-bottom:16px"><strong>Your next step</strong><br>${escapeHtml(item.next)}</p>
      <p style="${paragraph};color:${colors.muted};margin-bottom:20px"><strong style="color:${colors.ink}">What to review</strong><br>${escapeHtml(item.evidence)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:${colors.paper};border-left:3px solid ${colors.brown};padding:16px 18px">
        <p style="${labelStyle};font-size:10px;margin-bottom:6px">Ask your agency</p>
        <p style="${paragraph};font-size:16px">${escapeHtml(item.ask)}</p>
      </td></tr></table>
    </td></tr>`;
  }).join("");
  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Your Marketing Checkup</title>
<style>body{margin:0!important;padding:0!important}table{border-collapse:collapse}a{color:#955a32}a:focus-visible{outline:3px solid #955a32;outline-offset:4px}@media only screen and (max-width:600px){.outer-pad{padding:0!important}.report-pad{padding-left:22px!important;padding-right:22px!important}.hero-title{font-size:35px!important}.brand{font-size:23px!important}}</style></head>
<body style="margin:0;padding:0;background-color:#e5e4db;color:${colors.ink};-webkit-text-size-adjust:100%">
<div style="display:none;font-size:1px;line-height:1px;color:#e5e4db;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">Your seven answers, practical next steps, and specific questions for your agency.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e5e4db"><tr><td class="outer-pad" align="center" style="padding:32px 12px">
<!--[if mso]><table role="presentation" width="680" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;background-color:#ffffff">
<tr><td class="report-pad" style="background-color:${colors.ink};padding:30px 38px 34px;border-top:5px solid ${colors.brown}">
  <p class="brand" style="font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.2;color:${colors.paper};margin:0 0 36px">True Path Digital<span style="color:#d8ac88">.</span></p>
  <p style="${labelStyle};color:#d8ac88;margin-bottom:14px">For your service business</p>
  <h1 class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:45px;line-height:1.08;letter-spacing:-1px;font-weight:normal;color:${colors.paper};margin:0 0 22px">Your marketing<br>checkup.</h1>
  <p style="${paragraph};color:#d0d1c7;font-size:16px;max-width:480px">Seven answers. A clearer next step.<br>A useful conversation with your agency.</p>
</td></tr>
<tr><td class="report-pad" style="padding:34px 38px;background-color:${colors.paper}">
  <p style="${labelStyle}">The takeaway</p>
  <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:29px;line-height:1.18;font-weight:normal;margin:0 0 16px;color:${colors.ink}">${report.title}</h2>
  <p style="${paragraph};margin-bottom:26px">${report.summary}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #b4b7ac;padding-top:24px">
    <p style="${labelStyle}">${report.startLabel}</p>
    <h3 style="font-family:Georgia,'Times New Roman',serif;font-size:23px;line-height:1.3;font-weight:normal;margin:0 0 12px;color:${colors.ink}">${report.start.topic}</h3>
    <p style="${paragraph};margin-bottom:12px">${report.start.next}</p>
    <p style="${paragraph};font-size:12px;color:${colors.muted}">${report.startReason}</p>
  </td></tr></table>
</td></tr>
<tr><td class="report-pad" style="padding:28px 38px 0"><p style="${labelStyle};margin-bottom:0">Your answers &amp; next steps</p></td></tr>
${cards}
<tr><td class="report-pad" style="padding:30px 38px;background-color:${colors.paper}">
  <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.2;font-weight:normal;color:${colors.ink};margin:0 0 14px">Make the conversation count.</h2>
  <p style="${paragraph}">Choose one item to discuss first. Agree on who will take the next step, when you will review it, and what information you will look at together.</p>
</td></tr>
<tr><td class="report-pad" style="padding:30px 38px 34px;background-color:${colors.ink}">
  <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.25;font-weight:normal;color:${colors.paper};margin:0 0 20px">Want a second set of eyes on this?</h2>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:${colors.paper};mso-padding-alt:14px 22px"><a href="https://truepath406.com/#contact" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;line-height:1.4;color:${colors.ink};text-decoration:none">Contact True Path &rarr;</a></td></tr></table>
</td></tr>
<tr><td class="report-pad" style="padding:24px 38px;background-color:${colors.paper}">
  <p style="${paragraph};font-size:12px;color:${colors.muted};margin-bottom:12px">${checkupNote}</p>
  <p style="${paragraph};font-size:12px;color:${colors.muted};margin-bottom:18px">You requested this copy from True Path. This does not sign you up for marketing emails.</p>
  <p style="${paragraph};font-size:12px;font-weight:bold;color:${colors.ink}">TRUE PATH DIGITAL &nbsp; / &nbsp; MISSOULA, MONTANA</p>
</td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  return { html, text };
}
