"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./checkup.module.css";
import { questions, choices, getCheckupReport, type Answer } from "@/lib/marketing-checkup";
import EmailResults from "./EmailResults";


export default function Checkup() {
  const [answers, setAnswers] = useState<Partial<Record<number, Answer>>>({});
  const [validated, setValidated] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [edited, setEdited] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const resetRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const answered = Object.keys(answers).length;
  const report = generated ? getCheckupReport(questions.map((_, index) => answers[index]!)) : null;

  function showResults(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidated(true);
    const missing = questions.findIndex((_, index) => !answers[index]);
    if (missing !== -1) {
      formRef.current?.querySelector<HTMLInputElement>(`input[name="question-${missing}"]`)?.focus();
      return;
    }
    setGenerated(true);
    setEdited(false);
    // Wait for React to mount the results before moving keyboard focus.
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setResetRequested(false);
    setAnswers({});
    setValidated(false);
    setGenerated(false);
    setEdited(false);
    formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }

  return (
    <>
      <form ref={formRef} onSubmit={showResults} noValidate>
        <div className={styles.worksheetTop}>
          <h2 className="font-serif text-3xl">Seven things to look at.</h2>
          <p className={styles.screenOnly} aria-live="polite">{answered} of 7 answered</p>
        </div>
        <p className={styles.instructions}>Choose one answer for each question. Your answers stay in this page’s memory unless you choose to email them. Reloading or resetting clears this page. No customer details or financial figures needed.</p>
        {questions.map((question, index) => {
          const missing = validated && !answers[index];
          return (
            <fieldset key={question.title} className={styles.question} aria-describedby={`help-${index}${missing ? ` error-${index}` : ""}`} aria-invalid={missing || undefined}>
              <legend><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{question.title}</legend>
              <p id={`help-${index}`} className={styles.help}>{question.help}</p>
              <div className={styles.options}>
                {choices.map((choice) => (
                  <label key={choice} className={styles.option}>
                    <input type="radio" required name={`question-${index}`} value={choice} checked={answers[index] === choice} aria-describedby={`help-${index}${missing ? ` error-${index}` : ""}`} onChange={() => {
                      setAnswers((previous) => ({ ...previous, [index]: choice }));
                      if (generated) setEdited(true);
                      setGenerated(false);
                    }} />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
              <p className={styles.printAnswer}>Your answer: {answers[index] ?? "Not answered"}</p>
              {missing && <p id={`error-${index}`} className={styles.error}>Choose Yes, No, or Not sure for question {index + 1}.</p>}
            </fieldset>
          );
        })}
        <div className={styles.actions}>
          {validated && answered < 7 && <p role="alert" className={styles.error}>Please answer all seven questions. {7 - answered} still need an answer.</p>}
          <p role="status">{edited ? "Answers changed. Select Show my questions to update your takeaway." : ""}</p>
          <div className={styles.buttons}>
            <Button type="submit">Show my questions</Button>
            <button ref={resetRef} type="button" className={styles.textButton} aria-expanded={resetRequested} aria-controls="reset-confirmation" onClick={() => {
              setResetRequested(true);
              requestAnimationFrame(() => cancelRef.current?.focus());
            }}>Reset answers</button>
          </div>
          {resetRequested && <div id="reset-confirmation" className={styles.resetConfirmation} role="group" aria-labelledby="reset-title">
            <p id="reset-title">Clear all seven answers and your follow-up questions?</p>
            <div className={styles.buttons}>
              <button ref={cancelRef} type="button" className={styles.textButton} onClick={() => {
                setResetRequested(false);
                resetRef.current?.focus();
              }}>Keep my answers</button>
              <button type="button" className={styles.textButton} onClick={reset}>Yes, clear answers</button>
            </div>
          </div>}
        </div>
      </form>
      {report && (
        <section ref={resultRef} tabIndex={-1} aria-labelledby="results-title" className={styles.results}>
          <p className={styles.eyebrow}>Your takeaway</p>
          <h2 id="results-title">{report.title}</h2>
          <p>{report.summary}</p>
          <div className={styles.startHere}>
            <p className={styles.eyebrow}>{report.startLabel}</p>
            <h3>{report.start.topic}</h3>
            <p>{report.start.next}</p>
            <p className={styles.resultLabel}>{report.startReason}</p>
          </div>
          <ol className={styles.followups}>
            {report.items.map((item) => <li key={item.number}>
              <p className={styles.eyebrow}>{String(item.number).padStart(2, "0")} / {item.topic}</p>
              <h3>{item.title}</h3>
              <p className={styles.answerTag}>Your answer: {item.answer} · {item.label}</p>
              <p><strong>Your next step</strong><br />{item.next}</p>
              <p><strong>What to review</strong><br />{item.evidence}</p>
              <div className={styles.agencyAsk}>
                <p className={styles.eyebrow}>Ask your agency</p>
                <p>{item.ask}</p>
              </div>
            </li>)}
          </ol>
          <div className={styles.conversation}>
            <h3>Make the conversation count.</h3>
            <p>Choose one item to discuss first. Agree on who will take the next step, when you will review it, and what information you will look at together.</p>
          </div>
          <div className={styles.printControls}>
            <Button variant="secondary" onClick={() => window.print()}>Print / Save as PDF</Button>
            <p>Opens your browser’s print dialog. Choose Save as PDF there if available.</p>
          </div>
          <EmailResults answers={questions.map((_, index) => answers[index]!)} />
          <div className={styles.contact}>
            <h3><Link href="/#contact">Want a second set of eyes on this?</Link></h3>
          </div>
        </section>
      )}
      <noscript><p className={styles.note}>Turn on JavaScript to select answers and generate your follow-up questions.</p></noscript>
    </>
  );
}
