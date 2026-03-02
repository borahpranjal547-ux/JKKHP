import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>Assam Inspired Digital Citizen Service Portal</h1>
        <p>Apply, track, and manage government and public utility services from one platform.</p>
        <Link to="/services" className="btn">Explore Services</Link>
      </section>
      <section>
        <h2>How It Works</h2>
        <div className="grid three">
          <article><h3>1. Register</h3><p>Create account with OTP verification.</p></article>
          <article><h3>2. Apply</h3><p>Select service, upload documents, and pay securely.</p></article>
          <article><h3>3. Track</h3><p>Monitor status from submitted to completed.</p></article>
        </div>
      </section>
    </div>
  );
}
