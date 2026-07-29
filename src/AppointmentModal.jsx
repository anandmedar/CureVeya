import { useEffect, useRef, useState } from "react";
import "./AppointmentModal.css";

const EMAIL_ENDPOINT = "https://formsubmit.co/ajax/cureveya@gmail.com";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredTime: "",
  message: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.service) errors.service = "Please choose a speciality.";
  return errors;
}

export default function AppointmentModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(
      () => modalRef.current?.querySelector("input")?.focus(),
      50,
    );
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError("");
  };

  const submitAppointment = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitError(
        "Please complete the highlighted fields before booking your appointment.",
      );
      return;
    }

    setStatus("sending");
    setSubmitError("");
    try {
      const response = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          speciality: form.service,
          preferred_callback_time: form.preferredTime || "Not specified",
          message: form.message.trim() || "No additional note provided.",
          _subject: `New CureVeya appointment enquiry from ${form.name.trim()}`,
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("Unable to submit appointment");
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError(
        "We could not send your request. Please try again or call Coordinator on +91-9036631244.",
      );
    }
  };

  return (
    <div
      className="appointment-modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="appointment-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
      >
        <button
          className="appointment-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close appointment form"
        >
          ×
        </button>
        {status === "success" ? (
          <div className="appointment-success" role="status">
            <span className="appointment-success-icon">✓</span>
            <p className="appointment-kicker">Request received</p>
            <h2 id="appointment-modal-title">
              Thank you, {form.name.split(" ")[0]}.
            </h2>
            <p>
              Your appointment enquiry has been sent. Coordinator will contact
              you using the details you provided.
            </p>
            <button
              className="appointment-submit"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="appointment-kicker">
              CureVeya Surgical Care · Bangalore · Hyderabad
            </p>
            <h2 id="appointment-modal-title">Book your appointment</h2>
            <p className="appointment-intro">
              Share your details and Coordinator will guide you towards the
              right next step.
            </p>
            <form
              className="appointment-form"
              noValidate
              onSubmit={submitAppointment}
            >
              <div className="appointment-field">
                <label htmlFor="appointment-name">
                  Full name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="appointment-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "appointment-name-error" : undefined
                  }
                  placeholder="Your full name"
                />
                {errors.name && (
                  <small id="appointment-name-error" className="field-error">
                    {errors.name}
                  </small>
                )}
              </div>
              <div className="appointment-field-grid">
                <div className="appointment-field">
                  <label htmlFor="appointment-phone">
                    Phone number <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="appointment-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "appointment-phone-error" : undefined
                    }
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <small id="appointment-phone-error" className="field-error">
                      {errors.phone}
                    </small>
                  )}
                </div>
                <div className="appointment-field">
                  <label htmlFor="appointment-email">
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="appointment-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "appointment-email-error" : undefined
                    }
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <small id="appointment-email-error" className="field-error">
                      {errors.email}
                    </small>
                  )}
                </div>
              </div>
              <div className="appointment-field-grid">
                <div className="appointment-field">
                  <label htmlFor="appointment-service">
                    Treatments <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="appointment-service"
                    name="service"
                    value={form.service}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "appointment-service-error" : undefined
                    }
                  >
                    <option value="">Choose a Treatment</option>
                    <option>Gynaecomastia</option>
                    <option>Circumcision</option>
                    <option>Lipoma</option>
                    <option>Piles</option>
                    <option>Hernia</option>
                    <option>Varicose Vein</option>
                    <option>Gallstones</option>
                    <option>Liposuction</option>
                    <option>Hair Transplant</option>
                    <option>Knee Replacement</option>
                    <option>Cataract</option>
                  </select>
                  {errors.service && (
                    <small
                      id="appointment-service-error"
                      className="field-error"
                    >
                      {errors.service}
                    </small>
                  )}
                </div>
                <div className="appointment-field">
                  <label htmlFor="appointment-time">
                    Preferred callback time
                  </label>
                  <select
                    id="appointment-time"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={updateField}
                  >
                    <option value="">Choose a time</option>
                    <option>Morning · 9am–12pm</option>
                    <option>Afternoon · 12pm–4pm</option>
                    <option>Evening · 4pm–8pm</option>
                  </select>
                </div>
              </div>
              <div className="appointment-field">
                <label htmlFor="appointment-message">
                  Additional note{" "}
                  <span className="appointment-optional">(optional)</span>
                </label>
                <textarea
                  id="appointment-message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows="3"
                  placeholder="Tell us how we can help"
                />
              </div>
              {submitError && (
                <p className="appointment-form-error" role="alert">
                  {submitError}
                </p>
              )}
              <button
                className="appointment-submit"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending request…" : "Book Appointment"}
              </button>
              <p className="appointment-consent">
                By submitting, you agree to be contacted about this appointment
                request. Please do not share emergency or highly sensitive
                medical information here.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
