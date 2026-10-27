export const questions = [
  {
    title: "Are inquiries coming from people in your service area who need work you want to do?",
    help: "Think about recent calls and requests, including the location and type of work.",
    followup: "How are we checking that inquiries come from our service area and match the work we want to do?",
  },
  {
    title: "Do you know exactly what your agency counts as a lead?",
    help: "A reported lead could mean a call, a form, or something else. Make sure you know which.",
    followup: "What counts as a lead in this report, and are repeat calls or spam included?",
  },
  {
    title: "Can you follow an inquiry through to a response, estimate, or booked job?",
    help: "You should be able to see what happened after someone first got in touch.",
    followup: "How can we follow an inquiry from the first call or request through to a response, estimate, or booked job?",
  },
  {
    title: "Is it easy to call or request service from your website on a phone?",
    help: "Open your site on a phone and try finding the number and the service request form.",
    followup: "Can we walk through calling and requesting service on a phone, and fix any steps that get in the way?",
  },
  {
    title: "Can you separate advertising spend from agency fees and other charges?",
    help: "Look for a clear breakdown of what pays for ads and what pays for other work.",
    followup: "Can you show advertising spend, agency fees, and other charges separately so I can understand what each covers?",
  },
  {
    title: "Do you know who owns your marketing accounts and how to get the information you need?",
    help: "Know who controls your website, ad accounts, and business listings, and how to access reports.",
    followup: "Who owns our website, advertising accounts, and business listings, and how can I access the information I need?",
  },
  {
    title: "Can your agency explain what it is working on and what it plans to do next?",
    help: "You should be able to understand the current work, why it matters, and the next step.",
    followup: "What are you working on now, why is it a priority, and what do you plan to do next?",
  },
];
export const choices = ["Yes", "No", "Not sure"] as const;
export type Answer = (typeof choices)[number];


const direction: { topic: string; advice: Record<Answer, { next: string; evidence: string; ask: string }> }[] = [
  {
    topic: "The right kind of inquiries",
    advice: {
      Yes: { next: "Keep a simple check on lead fit. Review a small sample of recent inquiries with whoever answers the phone, especially after a campaign or service-area change.", evidence: "The location, requested work, and outcome of those inquiries, with customer details removed.", ask: "Can we review which locations and types of work are producing inquiries we actually want?" },
      No: { next: "Sort a small sample of recent inquiries into outside our area, work we do not offer, and work we want. Review that pattern before changing the advertising budget.", evidence: "A breakdown of why inquiries were a poor fit, compared with the locations and services being promoted.", ask: questions[0].followup },
      "Not sure": { next: "Start with recent calls and service requests. Have the person handling them note the location and type of work so you can see whether there is a pattern.", evidence: "A small sample showing service-area fit and requested work. You do not need to share customer details with your agency.", ask: questions[0].followup },
    },
  },
  {
    topic: "What counts as a lead",
    advice: {
      Yes: { next: "Keep the lead definition beside the report. Check that it stays consistent when campaigns, tracking, or reporting tools change.", evidence: "A written definition and separate counts for new inquiries, repeat contacts, and spam where the tools allow it.", ask: "Has anything changed in how leads are counted, filtered, or combined since our last review?" },
      No: { next: "Ask for the lead definition in writing before using the total to judge performance. Find out whether several calls from one person can count more than once.", evidence: "What triggers a lead count and how repeat calls, missed calls, and spam are handled.", ask: questions[1].followup },
      "Not sure": { next: "Pick one recent report and ask your agency to walk through how its lead total was built. Make sure the explanation matches the calls and requests you recognize.", evidence: "A plain-language definition, with examples of what is included and excluded.", ask: questions[1].followup },
    },
  },
  {
    topic: "What happens after the inquiry",
    advice: {
      Yes: { next: "Review the path regularly with your team. Look for inquiries waiting on a reply, estimates without follow-up, and jobs with no recorded outcome.", evidence: "A few recent inquiries with a response, current status, and next follow-up recorded.", ask: "Where are inquiries getting stuck between the first contact and a booked job, and who owns the next step?" },
      No: { next: "Choose one place to record each new inquiry, who will respond, and what happened next. A shared sheet or your existing job system can be enough to start.", evidence: "A clear handoff between marketing and the person handling the call or request, plus an outcome recorded by your team.", ask: questions[2].followup },
      "Not sure": { next: "Trace a few recent inquiries with your office team. Follow each one from first contact to its current status and note where the trail stops.", evidence: "An example that connects the inquiry to a response, estimate, or booked job without relying on the marketing report alone.", ask: questions[2].followup },
    },
  },
  {
    topic: "Calling or requesting service",
    advice: {
      Yes: { next: "Repeat the phone check after website changes. Test both the call button and service form, then confirm your team actually receives the request.", evidence: "A working tap-to-call number, a completed test request, and a clear expectation for when someone will respond.", ask: "When did we last test the call and service-request paths from a phone all the way through to our team?" },
      No: { next: "Write down the first step that gets in the way on a phone. Have that fixed, then retest the full path rather than stopping when the page looks better.", evidence: "An easy-to-find phone number, a usable form, and confirmation that calls or requests reach the right person.", ask: questions[3].followup },
      "Not sure": { next: "Use your own phone to find the number, tap to call, and send a clearly labeled test service request. Ask your office team to confirm what arrived.", evidence: "The actual call and request reaching your team, not just a button or a thank-you screen.", ask: questions[3].followup },
    },
  },
  {
    topic: "Where the marketing money goes",
    advice: {
      Yes: { next: "Keep the breakdown consistent each month. Review it alongside the inquiries and booked work your team records, while allowing for delays between an inquiry and a job.", evidence: "Separate advertising spend, agency fees, and other charges for the same reporting period.", ask: "Are these charges for the same period, and has anything changed in what each fee covers?" },
      No: { next: "Request an itemized breakdown before deciding whether to raise or cut spending. Make sure you can distinguish money paid to ad platforms from fees for managing the work.", evidence: "Advertising spend, management fees, website or software charges, and one-time work listed separately.", ask: questions[4].followup },
      "Not sure": { next: "Compare your latest invoice with the agency report for the same period. Ask your agency to explain any amount you cannot match to a service or advertising charge.", evidence: "A breakdown showing what was paid to platforms, what was paid to the agency, and what other charges cover.", ask: questions[4].followup },
    },
  },
  {
    topic: "Account ownership and access",
    advice: {
      Yes: { next: "Keep an account list and check your access after staff or agency changes. Confirm that your business can retrieve the reports and information it needs.", evidence: "The account owner, an appropriate business contact, and a working access path for each main account. Do not share passwords.", ask: "Can we confirm our account list and access are current, including how we retrieve reports if the relationship changes?" },
      No: { next: "Make a list of your website, domain, ad accounts, and business listings. Ask who owns each one and what access or transfer rights your agreement provides.", evidence: "Named owners and roles, plus a documented way for your business to get the information it needs. Do not request shared passwords.", ask: questions[5].followup },
      "Not sure": { next: "Ask for an account list and check which accounts your business can access directly. Confirm ownership and access against your agreement before assuming anything is missing.", evidence: "The owner, your business’s access level, and the process for retrieving information for each main account.", ask: questions[5].followup },
    },
  },
  {
    topic: "The work and the next step",
    advice: {
      Yes: { next: "Keep a short record of the current priority, who is responsible, and when you will review it. Ask what evidence would support continuing or changing the work.", evidence: "A clear link between the work, the problem it addresses, and the next review date.", ask: "What will we look at during the next review to decide whether this work should continue or change?" },
      No: { next: "Ask for a short work plan in plain language. Agree on one current priority, who owns it, and a review date before adding more activity.", evidence: "What is being done, why it comes first, and what you should be able to review next time.", ask: questions[6].followup },
      "Not sure": { next: "Use your next agency conversation to connect the activity report to the actual plan. Ask which problem the current work is meant to address.", evidence: "A current priority, the reason for it, the next step, and a date to review progress.", ask: questions[6].followup },
    },
  },
];

export const answerLabels: Record<Answer, string> = {
  Yes: "Keep checking",
  No: "An area to address",
  "Not sure": "Something to clarify",
};
export const checkupNote = "This is a first-pass check, not a complete audit or a verdict on an agency.";

export function getCheckupReport(answers: Answer[]) {
  if (answers.length !== questions.length || !answers.every((answer) => choices.includes(answer))) {
    throw new Error("A report requires seven valid answers.");
  }
  const items = questions.map((question, index) => ({
    ...question,
    number: index + 1,
    topic: direction[index].topic,
    answer: answers[index],
    label: answerLabels[answers[index]],
    ...direction[index].advice[answers[index]],
  }));
  const allYes = answers.every((answer) => answer === "Yes");
  const start = items.find((item) => item.answer === "No") ?? items.find((item) => item.answer === "Not sure") ?? items[0];
  return {
    items, start, allYes,
    title: allYes ? "You have visibility into these seven areas." : "Turn your answers into a useful next conversation.",
    summary: allYes
      ? "Your answers suggest you can see what is happening in these areas. Keep checking the evidence behind them. This does not tell us whether your marketing is profitable or effective."
      : "A No identifies an area you want to address. Not sure means you need more information before drawing a conclusion. Use the steps below to make the next conversation specific.",
    startLabel: allYes ? "Keep this useful" : "One place to start",
    startReason: allYes ? "Keep a regular review of the inquiries behind your reports." : start.answer === "No"
      ? "This is the first area you marked No. Start with one clear request, then work through the rest at a pace your team can manage."
      : "You did not mark any area No. Start by checking the first thing you were unsure about before deciding whether it needs a change.",
  };
}
