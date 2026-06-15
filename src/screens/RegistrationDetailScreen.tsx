import { useNavigate } from 'react-router-dom';
import { MdDateRange, MdSchedule, MdLocationOn, MdPlayArrow } from 'react-icons/md';
import { TopBar } from '../components/TopBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionDivider } from '../components/SectionDivider';
import { StickyCTA } from '../components/StickyCTA';
import { miqaatDetail, currentUser } from '../data/mock';

export function RegistrationDetailScreen() {
  const navigate = useNavigate();
  const d = miqaatDetail;

  return (
    <div className="screen">
      <TopBar notifications={currentUser.notifications} />

      <div className="screen-scroll" style={{ paddingBottom: 120 }}>
        <div className="detail-crumbs">
          <Breadcrumb
            items={[
              { label: 'Miqaat list', to: () => navigate('/miqaats') },
              { label: 'Miqaat detail page', active: true },
            ]}
          />
        </div>

        <div className="hero">
          <h1 className="hero-title">{d.title}</h1>
          <div className="hero-meta">
            <span className="item"><MdDateRange /> {d.date}</span>
            <span className="vline" />
            <span className="item"><MdSchedule /> {d.time}</span>
          </div>

          <div className="fasal">
            <span className="fasal-eyebrow">Official Fasal Announcement</span>
            <p className="salawat">{d.salawat}</p>
            <p className="fasal-sub">{d.fasal}</p>
            <div className="host-pill">
              <MdLocationOn />
              <span className="l">Host City</span>
              <span className="v">{d.hostCity}</span>
            </div>
            <span className="relay-heading">Relay Centers</span>
            <div className="relay-grid">
              {d.relayCenters.map((city) => (
                <div className="relay-chip" key={city}>
                  <span className="orn">۞</span>
                  <span className="city">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <SectionDivider label="Important Notice" align="left" />
          <div className="notice-card">
            {d.notices.map((notice, i) => (
              <div className="notice-row" key={i}>
                <span className="notice-badge">{i + 1}</span>
                <span className="notice-text">{notice}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="video">
            <div className="play"><MdPlayArrow /></div>
            <div className="video-caption">{d.videoCaption}</div>
          </div>
        </div>

        <div className="section">
          <SectionDivider label="About" />
        </div>
      </div>

      <StickyCTA
        caption="Eid-e-Ghadeer 1447H"
        title="Registration open"
        buttonLabel="Register Now"
        onClick={() => navigate('/add-people')}
      />
    </div>
  );
}
