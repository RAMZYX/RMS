import { useNavigate } from 'react-router-dom';
import { MdDateRange, MdSchedule } from 'react-icons/md';
import { Logo } from '../components/Logo';
import { Bell } from '../components/Bell';
import { events, currentUser, type MiqaatEvent } from '../data/mock';

export function MiqaatListScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <div className="mq-header">
        <Logo width={38} height={60} />
        <div className="who">
          <div className="its">ITS ID {currentUser.its}</div>
          <div className="name">{currentUser.name}</div>
        </div>
        <Bell count={currentUser.notifications} color="#fff" />
      </div>

      <div className="screen-scroll pad" style={{ paddingTop: 0 }}>
        <h1 className="mq-heading">All Miqaats</h1>
        {events.map((event) => (
          <EventCard key={event.id} event={event} onOpen={() => navigate('/detail')} />
        ))}
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

function EventCard({ event, onOpen }: { event: MiqaatEvent; onOpen: () => void }) {
  const live = event.status === 'live';
  const units: [string, string][] = [
    [event.countdown.days, 'Days'],
    [event.countdown.hours, 'Hours'],
    [event.countdown.mins, 'Min'],
    [event.countdown.secs, 'Sec'],
  ];
  const tileStyle = live
    ? { background: 'var(--count-peach-bg)', border: '1px solid var(--count-peach-border)' }
    : { background: 'var(--count-blue-bg)' };
  const numColor = live ? 'var(--count-peach-num)' : 'var(--count-blue-num)';
  const labColor = live ? 'var(--count-peach-lab)' : 'var(--count-blue-lab)';

  return (
    <div className="mq-card">
      <div className="mq-hero">
        {live && <span className="live-badge">Live</span>}
        <div className="mq-title">{event.title}</div>
        <div className="mq-meta">
          <span className="item"><MdDateRange /> {event.date}</span>
          <span className="item"><MdSchedule /> {event.time}</span>
        </div>
      </div>
      <div className="mq-body">
        <div className="mq-status">
          <span
            className="mq-dot"
            style={{ background: live ? 'var(--count-peach-lab)' : 'var(--count-blue-lab)' }}
          />
          <span>{event.statusLine}</span>
        </div>
        <div className="countdown">
          {units.map(([value, label]) => (
            <div className="tile" key={label} style={tileStyle}>
              <span className="num" style={{ color: numColor }}>{value}</span>
              <span className="lab" style={{ color: labColor }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="btn-zone">
          <button className={`btn-pill ${live ? 'filled' : 'outline'}`} onClick={onOpen}>
            {event.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
