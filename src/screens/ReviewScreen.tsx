import { useNavigate } from 'react-router-dom';
import { MdLink } from 'react-icons/md';
import { TopBar } from '../components/TopBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionDivider } from '../components/SectionDivider';
import { StickyCTA } from '../components/StickyCTA';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { family, mehmaan, currentUser, type FamilyMember } from '../data/mock';

const byId = (id: string) => family.find((m) => m.id === id)!;

const pairs = [
  { banner: 'Guardian + dependent · registered together', lead: byId('yusuf'), dep: byId('nazia') },
  { banner: 'Caregiver + dependent · registered together', lead: byId('sakina'), dep: byId('amatullah') },
];

export function ReviewScreen() {
  const navigate = useNavigate();
  const total = family.length + mehmaan.length;

  return (
    <div className="screen">
      <TopBar notifications={currentUser.notifications} />

      <div className="screen-scroll pad" style={{ paddingBottom: 120 }}>
        <div style={{ padding: '14px 0' }}>
          <Breadcrumb
            items={[
              { label: 'Add people', to: () => navigate('/add-people') },
              { label: 'Summary', active: true },
            ]}
          />
        </div>

        <h1 className="review-title">Review &amp; Submit</h1>
        <p className="review-instr">
          Check your group before submitting. You can go back to edit any step.
        </p>

        <h2 className="review-sub">Participant Count</h2>
        <div className="stats">
          <Stat v={String(total)} l={'Total\nHeadcount'} color="green" />
          <Stat v="05" l={'My family\n& group'} color="gold" />
          <Stat v="05" l={'Invited\nmembers'} color="gold" />
        </div>

        <div style={{ margin: '28px 0 14px' }}>
          <SectionDivider label="Your Family" />
        </div>

        {pairs.map((p) => (
          <div className="pair" key={p.dep.id}>
            <div className="pair-banner">
              <MdLink /> {p.banner}
            </div>
            <div className="pair-body">
              <PersonRow member={p.lead} />
              <div className="connector" />
              <PersonRow member={p.dep} />
            </div>
          </div>
        ))}

        <div className="solo">
          <PersonRow member={byId('mohammed')} />
        </div>

        <div style={{ margin: '28px 0 14px' }}>
          <SectionDivider label="Invite Mehmaan" />
        </div>

        {mehmaan.map((m) => (
          <div className="mehmaan-card" key={m.id}>
            <Avatar initials={m.initials} size={36} />
            <div className="info">
              <div className="member-name">{m.name}</div>
              <div className="member-sub">Age {m.age} · ITS {m.its}</div>
            </div>
          </div>
        ))}
      </div>

      <StickyCTA
        caption={`${total} members`}
        title="Ready to submit"
        buttonLabel={`Register(${total})`}
        onClick={() => {
          window.alert(`Registration submitted — ${total} members registered for Eid-e-Ghadeer 1447H.`);
          navigate('/miqaats');
        }}
      />
    </div>
  );
}

function Stat({ v, l, color }: { v: string; l: string; color: 'green' | 'gold' }) {
  return (
    <div className="stat">
      <span className={`v ${color}`}>{v}</span>
      <span className="l">{l}</span>
    </div>
  );
}

function PersonRow({ member }: { member: FamilyMember }) {
  return (
    <div className="person-row">
      <Avatar initials={member.initials} size={36} />
      <div className="info">
        <div className="nm">{member.name}</div>
        <div className="sb">
          {member.relationship} · Age {member.age} · ITS {member.its}
        </div>
      </div>
      <Badge kind={member.badge} />
    </div>
  );
}
