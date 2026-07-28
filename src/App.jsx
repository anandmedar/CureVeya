import { useEffect, useState } from 'react'
import AppointmentModal from './AppointmentModal.jsx'
import { careTopics, faqs, journey, specialities } from './data.js'

const PHONE = '+919036631244'
const WHATSAPP = `https://wa.me/${PHONE.replace('+', '')}`

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>
}

function App() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', concern: '', time: '' })

  useEffect(() => {
    const listen = () => setShowTop(window.scrollY > 620)
    window.addEventListener('scroll', listen, { passive: true })
    return () => window.removeEventListener('scroll', listen)
  }, [])

  useEffect(() => {
    const modalTimer = window.setTimeout(() => setAppointmentModalOpen(true), 5000)
    return () => window.clearTimeout(modalTimer)
  }, [])

  const startWhatsApp = (message = 'Hello Coordinator, I would like guidance about planned surgery.') => {
    window.open(`${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const submitForm = (event) => {
    event.preventDefault()
    const details = [
      'Hello Coordinator, I would like to request a callback from CureVeya.',
      `Name: ${form.name || 'Not provided'}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Concern: ${form.concern || 'Not provided'}`,
      `Preferred time: ${form.time || 'Not provided'}`,
    ].join('\n')
    startWhatsApp(details)
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="CureVeya Surgical Care home">
          <img src="/cureveya-mark.png" alt="" />
          <span><strong>CureVeya</strong><small>Surgical Care</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-nav">
          <span></span><span></span><span></span><b className="sr-only">Toggle menu</b>
        </button>
        <nav id="site-nav" className={menuOpen ? 'open' : ''}>
          {['Specialities', 'Care Journey', 'Why Us', 'FAQs', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <button className="nav-cta" type="button" onClick={() => { setMenuOpen(false); setAppointmentModalOpen(true) }}>Book Appointment <Arrow /></button>
        </nav>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span></span>Bangalore · Hyderabad · planned surgical care</p>
            <h1>The right care path,<br /><em>from first call to recovery.</em></h1>
            <p className="hero-text">CureVeya helps you find the right specialist, understand your options and coordinate each next step with calm, personal guidance.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => startWhatsApp()}>Talk to Coordinator <Arrow /></button>
              <a className="button button-outline" href="#specialities">Explore specialities <Arrow /></a>
            </div>
            <div className="trust-row" aria-label="CureVeya service values">
              <span>Specialist-led care</span><span>Clear guidance</span><span>Recovery support</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Your care path illustration">
            <div className="sun"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
            <div className="path-card"><span className="path-number">01</span><span>Start with<br /><b>one clear call</b></span></div>
            <div className="coordinator-card">
              <div className="avatar">A</div>
              <div><p>Your care</p><strong>Coordinator</strong><a href={`tel:${PHONE}`}>+91-9036631244</a></div>
              <button onClick={() => startWhatsApp('Hello Coordinator, I would like to speak with you about a planned surgery.')} aria-label="Message Coordinator on WhatsApp">↗</button>
            </div>
            <img className="hero-mark" src="/cureveya-mark.png" alt="" />
          </div>
        </section>

        <section id="specialities" className="section-shell section-space specialities">
          <div className="section-heading"><p className="eyebrow"><span></span>Where we can help</p><h2>Care designed around<br /><em>your concern.</em></h2><p>Explore a clearer route to consultation, treatment planning and recovery support across planned surgical care.</p></div>
          <div className="service-grid">
            {specialities.map((service, index) => <article className="service-card" key={service.title} style={{ '--delay': `${index * 45}ms` }}><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact">Explore care <Arrow /></a></article>)}
          </div>
          <p className="disclaimer">Treatment suitability is determined only after a qualified clinician’s consultation.</p>
        </section>

        <section id="care-journey" className="journey section-space">
          <div className="section-shell journey-grid">
            <div className="journey-intro"><p className="eyebrow light"><span></span>How it works</p><h2>A simpler way<br />through <em>planned care.</em></h2><p>Every journey is different. Our role is to make the process feel more organised, understandable and human.</p><button className="button button-sand" onClick={() => startWhatsApp()}>Start your care path <Arrow /></button></div>
            <ol className="journey-list">
              {journey.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section id="why-us" className="section-shell section-space why-us">
          <div className="section-heading compact"><p className="eyebrow"><span></span>The CureVeya approach</p><h2>Care coordination<br />that feels <em>personal.</em></h2></div>
          <div className="promise-layout">
            <article className="promise-feature"><div className="feature-mark">✦</div><p className="feature-kicker">From the first conversation</p><h3>Clarity without<br />the confusion.</h3><p>You deserve plain-language explanations, time to ask questions and a sense of what happens next.</p><a href="#contact">Speak with Coordinator <Arrow /></a></article>
            <div className="promise-list">
              {[['Listen first', 'Your concern and priorities come before recommendations.'], ['Explain clearly', 'Understand possible next steps without unnecessary jargon.'], ['Coordinate thoughtfully', 'Get practical assistance with visits, schedules and documents.'], ['Respect privacy', 'Sensitive concerns are handled with empathy and discretion.']].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="featured-care section-space">
          <div className="section-shell feature-grid">
            <div className="feature-copy"><p className="eyebrow"><span></span>Featured care paths</p><h2>From uncertainty to<br /><em>a clear next step.</em></h2><p>Choose a common care path to see how a consultation and care coordination can begin.</p><div className="topic-tabs">{careTopics.map((topic, index) => <button key={topic.name} onClick={() => setSelectedTopic(index)} className={selectedTopic === index ? 'active' : ''}>{topic.name}</button>)}</div></div>
            <article className="topic-detail"><p className="topic-label">{careTopics[selectedTopic].name}</p><div><span>Common concern</span><p>{careTopics[selectedTopic].concern}</p></div><div><span>What a consultation may cover</span><p>{careTopics[selectedTopic].consultation}</p></div><div><span>How CureVeya can support</span><p>{careTopics[selectedTopic].support}</p></div><button className="text-button" onClick={() => startWhatsApp(`Hello Coordinator, I would like guidance about ${careTopics[selectedTopic].name}.`)}>Talk to Coordinator <Arrow /></button></article>
          </div>
        </section>

        <section className="section-shell section-space expectations">
          <div className="expectation-heading"><p className="eyebrow"><span></span>Our patient-first promise</p><h2>What to expect from<br /><em>the first call.</em></h2></div>
          <div className="expectation-list">{[['01', 'Listen first', 'Your needs and questions guide the conversation.'], ['02', 'Explain clearly', 'We make the practical path easier to understand.'], ['03', 'Coordinate thoughtfully', 'Move forward at a pace that feels right for you.']].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="testimonials"><div className="section-shell"><p className="eyebrow light"><span></span>Patient experience placeholders</p><div className="quote-grid">{['“The process felt far less overwhelming once I knew whom to call and what to expect next.”', '“Every question was answered calmly, which made it easier to take the first step.”', '“The guidance was clear, respectful and very well coordinated.”'].map((quote, index) => <blockquote key={quote}><span>“</span><p>{quote}</p></blockquote>)}</div></div></section>

        <section id="faqs" className="section-shell section-space faq-section">
          <div className="section-heading compact"><p className="eyebrow"><span></span>Helpful answers</p><h2>Questions deserve<br /><em>clear answers.</em></h2></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? 'faq-open' : ''}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</article>)}</div>
        </section>

        <section id="contact" className="contact-section"><div className="section-shell contact-grid"><div className="contact-copy"><p className="eyebrow light"><span></span>Let’s find your next best step</p><h2>Begin with<br /><em>one conversation.</em></h2><p>Whether you are exploring a procedure or simply looking for clarity, Coordinator is available to help you begin with confidence.</p><div className="contact-details"><a href={`tel:${PHONE}`}><span>Call Coordinator</span><strong>+91-9036631244 <Arrow /></strong></a><span className="location"><b>Based in</b> Bangalore & Hyderabad </span></div></div><form className="contact-form" onSubmit={submitForm}><h3>Request a callback</h3><p>We’ll take the conversation at your pace.</p><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your full name" /></label><label>Phone number<input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Your phone number" /></label><label>Your concern<select required value={form.concern} onChange={(event) => setForm({ ...form, concern: event.target.value })}><option value="">Select a speciality</option>{specialities.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label>Preferred callback time<select value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}><option value="">Select a time</option><option>Morning · 9am–12pm</option><option>Afternoon · 12pm–4pm</option><option>Evening · 4pm–8pm</option></select></label><button className="button button-primary" type="submit">Continue on WhatsApp <Arrow /></button><small>Please do not share emergency or highly sensitive medical information through this form.</small></form></div></section>
      </main>

      <footer className="site-footer section-shell"><a className="brand footer-brand" href="#home"><img src="/cureveya-mark.png" alt="" /><span><strong>CureVeya</strong><small>Surgical Care</small></span></a><p>Thoughtful guidance for planned healthcare.</p><div><a href="#specialities">Specialities</a><a href="#care-journey">Care journey</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} CureVeya Surgical Care. Information provided here does not replace professional medical advice, diagnosis or emergency care.</small></footer>
      <a className="whatsapp-float" href={`${WHATSAPP}?text=${encodeURIComponent('Hello Coordinator, I would like guidance about planned surgery.')}`} target="_blank" rel="noreferrer" aria-label="Chat with Coordinator on WhatsApp">⌁<span>WhatsApp</span></a>
      {showTop && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>}
      <AppointmentModal isOpen={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} />
    </>
  )
}

export default App
