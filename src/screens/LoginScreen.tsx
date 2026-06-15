import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheck } from 'react-icons/md';
import { Logo } from '../components/Logo';

export function LoginScreen() {
  const navigate = useNavigate();
  const [its, setIts] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <div className="screen login">
      <div className="login-hero">
        <div className="login-hero-content">
          <Logo width={56} height={89} />
          <div className="login-welcome">
            <span className="top">Welcome to</span>
            <span className="gold">Miqāt Registration</span>
          </div>
          <div className="login-divider">
            <span className="line left" />
            <span className="ornament">۞</span>
            <span className="line right" />
          </div>
        </div>
      </div>

      <div className="login-card">
        <h1 className="login-title">Login to Continue</h1>
        <p className="login-subtitle">Use your ITS credentials to access the portal</p>

        <label className="field-label" htmlFor="its">ITS ID</label>
        <input
          id="its"
          className="field-input"
          inputMode="numeric"
          maxLength={8}
          placeholder="Enter your ITS ID"
          value={its}
          onChange={(e) => setIts(e.target.value)}
        />

        <label className="field-label" htmlFor="pwd" style={{ marginTop: 18 }}>
          Password
        </label>
        <input
          id="pwd"
          className="field-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="remember"
          onClick={() => setRemember((r) => !r)}
        >
          <span className={`checkbox${remember ? ' on' : ''}`}>
            <MdCheck size={15} />
          </span>
          <span>Remember Me</span>
        </button>

        <button className="login-button" onClick={() => navigate('/miqaats')}>
          Login
        </button>
      </div>
    </div>
  );
}
