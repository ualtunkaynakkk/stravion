"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { topicOptions } from "@/lib/contact/topics";

export default function ContactForm({ locale, t }: { locale: Locale; t: Dictionary["contact"] }) {
  const topics = topicOptions(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("kvkkConsent") !== "on") {
      setStatus("error");
      setErrorMsg(t.errors.kvkk);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          phone: fd.get("phone"),
          topic: fd.get("topic"),
          message: fd.get("message"),
          locale,
          kvkkConsent: true,
          website: fd.get("website"), // honeypot
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.error === "rate_limited" ? t.errors.rate : data.error === "kvkk" ? t.errors.kvkk : t.errors.fields);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.errors.generic);
    }
  }

  if (status === "success") {
    return (
      <div className="cf-success" role="status">
        <div className="cf-success-icon" aria-hidden="true">✓</div>
        <h3>{t.success}</h3>
        <p>{t.successSub}</p>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={onSubmit} noValidate>
      {/* honeypot — görünmez, botlar doldurur */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="cf-hp" aria-hidden="true" />

      <div className="cf-row">
        <label className="cf-field">
          <span>{t.name} *</span>
          <input name="name" type="text" required minLength={2} maxLength={120} autoComplete="name" />
        </label>
        <label className="cf-field">
          <span>{t.email} *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>

      <div className="cf-row">
        <label className="cf-field">
          <span>{t.company} <em>({t.optional})</em></span>
          <input name="company" type="text" maxLength={160} autoComplete="organization" />
        </label>
        <label className="cf-field">
          <span>{t.phone} <em>({t.optional})</em></span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
      </div>

      <label className="cf-field">
        <span>{t.topic} *</span>
        <select name="topic" required defaultValue={topics[0].code}>
          {topics.map((o) => (
            <option key={o.code} value={o.code}>{o.label}</option>
          ))}
        </select>
      </label>

      <label className="cf-field">
        <span>{t.message} *</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} />
      </label>

      <label className="cf-consent">
        <input type="checkbox" name="kvkkConsent" required />
        <span>
          {t.kvkk} <a href="#" onClick={(e) => e.preventDefault()}>{t.kvkkLink}</a>{" "}
          {locale === "tr" ? "okudum, kabul ediyorum." : "."}
        </span>
      </label>

      {status === "error" && <p className="cf-error" role="alert">{errorMsg}</p>}

      <button className="btn btn-primary cf-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit} <span className="arr">→</span>
      </button>
    </form>
  );
}
