import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>Address</h4>
            <p>District e-Governance Center, Assam</p>
          </div>
          <div>
            <h4>Helpline</h4>
            <p>1800-123-4545</p>
            <p>support@citizenportal.in</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </footer>
    </>
  );
}
