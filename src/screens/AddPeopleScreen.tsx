import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdWarningAmber,
  MdArrowForward,
  MdCheckCircle,
} from 'react-icons/md';
import { TopBar } from '../components/TopBar';
import { Breadcrumb } from '../components/Breadcrumb';
import { SectionDivider } from '../components/SectionDivider';
import { StickyCTA } from '../components/StickyCTA';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { AssignSheet } from '../components/AssignSheet';
import { family, currentUser, type FamilyMember } from '../data/mock';

type SheetState = { member: FamilyMember; kind: 'guardian' | 'caregiver' } | null;

export function AddPeopleScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, boolean>>(
    () => Object.fromEntries(family.map((m) => [m.id, true]))
  );
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [sheet, setSheet] = useState<SheetState>(null);

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const toggle = (id: string) => setSelected((p) => ({ ...p, [id]: !p[id] }));

  const candidates = useMemo(
    () => (sheet ? family.filter((m) => m.id !== sheet.member.id && Number(m.age) >= 18) : []),
    [sheet]
  );

  return (
    <div className="screen">
      <TopBar notifications={currentUser.notifications} />

      <div className="screen-scroll" style={{ paddingBottom: 120 }}>
        <div className="detail-crumbs">
          <Breadcrumb
            items={[
              { label: 'Miqaat list', to: () => navigate('/miqaats') },
              { label: 'Miqaat detail page', to: () => navigate('/detail') },
              { label: 'Add people', active: true },
            ]}
          />
        </div>

        <div className="invite-card">
          <div className="grow">
            <div className="invite-title">Invite Mehmaan</div>
            <div className="invite-pill">
              <span className="d" />
              <span>2 of 2 invitations remaining</span>
            </div>
          </div>
          <button className="invite-btn">Invite now</button>
        </div>

        <h2 className="ap-heading">Add People to group</h2>

        <div className="search-row">
          <input className="search-input" inputMode="numeric" maxLength={8} placeholder="Enter 8-digit ITS ID" />
          <button className="add-btn">Add</button>
        </div>

        <div style={{ margin: '24px 16px 14px' }}>
          <SectionDivider label="Your Family" />
        </div>

        <div className="member-list">
          {family.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              checked={!!selected[m.id]}
              assignedTo={assignments[m.id]}
              onToggle={() => toggle(m.id)}
              onAssign={() => setSheet({ member: m, kind: m.warning!.kind })}
            />
          ))}
        </div>
      </div>

      <StickyCTA
        caption={`${String(selectedCount).padStart(2, '0')} members selected`}
        title="Family & group"
        buttonLabel="Confirm"
        disabled={selectedCount === 0}
        onClick={() => navigate('/review')}
      />

      <AssignSheet
        open={sheet !== null}
        title={sheet?.kind === 'guardian' ? 'Assign guardian' : 'Assign Care'}
        subtitle={
          sheet
            ? `For ${sheet.member.name} · ${sheet.member.relationship} · Age ${sheet.member.age} · Choose an adult family member`
            : ''
        }
        candidates={candidates}
        confirmLabel={sheet?.kind === 'guardian' ? 'Add guardian' : 'Add care'}
        onClose={() => setSheet(null)}
        onConfirm={(memberId) => {
          const assignee = family.find((m) => m.id === memberId);
          if (sheet && assignee) {
            setAssignments((p) => ({ ...p, [sheet.member.id]: assignee.name }));
          }
          setSheet(null);
        }}
      />
    </div>
  );
}

function MemberRow({
  member,
  checked,
  assignedTo,
  onToggle,
  onAssign,
}: {
  member: FamilyMember;
  checked: boolean;
  assignedTo?: string;
  onToggle: () => void;
  onAssign: () => void;
}) {
  const showWarning = !!member.warning && !assignedTo;
  const assignedLabel = member.warning?.kind === 'guardian' ? 'Guardian' : 'Under Care of';

  return (
    <div className="member">
      <div className="member-head">
        <button className={`member-check${checked ? ' on' : ''}`} onClick={onToggle} aria-label="Select member">
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
        <Avatar initials={member.initials} size={36} />
        <div className="member-info">
          <div className="member-name">{member.name}</div>
          <div className="member-sub">
            {member.relationship} · Age {member.age} · ITS {member.its}
          </div>
        </div>
        <Badge kind={member.badge} />
      </div>

      {showWarning && (
        <div className="warning">
          <MdWarningAmber />
          <p>{member.warning!.message}</p>
          <button className="assign-btn" onClick={onAssign}>
            Assign <MdArrowForward />
          </button>
        </div>
      )}

      {assignedTo && (
        <div className="assigned">
          <MdCheckCircle />
          <p>
            {assignedLabel}: <b>{assignedTo}</b>
          </p>
          <button className="change" onClick={onAssign}>Change</button>
        </div>
      )}
    </div>
  );
}
