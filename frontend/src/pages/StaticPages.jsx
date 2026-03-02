import { useState } from 'react';
import client from '../api/client';

export const ApplyOnlinePage = () => <h1>Use Citizen Dashboard to apply online after login.</h1>;

export const TrackPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const search = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await client.get(`/applications/track/${trackingId}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch status');
    }
  };

  return (
    <div className="card">
      <h1>Track Application</h1>
      <form onSubmit={search}>
        <input
          placeholder="Enter tracking ID (e.g. ASM-...)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          required
        />
        <button className="btn">Track</button>
      </form>
      {error ? <p>{error}</p> : null}
      {result ? (
        <article className="card">
          <p><strong>Tracking ID:</strong> {result.trackingId}</p>
          <p><strong>Applicant:</strong> {result.applicant}</p>
          <p><strong>Service:</strong> {result.serviceName}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Payment:</strong> {result.paymentStatus}</p>
          <p><strong>Remarks:</strong> {result.remarks || 'NA'}</p>
        </article>
      ) : null}
    </div>
  );
};

export const ContactPage = () => <h1>Contact: 1800-123-4545 | support@citizenportal.in</h1>;
