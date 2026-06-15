import { Fragment } from 'react';
import { MdChevronRight } from 'react-icons/md';

export type Crumb = { label: string; to?: () => void; active?: boolean };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs">
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          <span className={`crumb${item.active ? ' active' : ''}`}>
            {item.to ? <button onClick={item.to}>{item.label}</button> : item.label}
          </span>
          {i < items.length - 1 && <MdChevronRight />}
        </Fragment>
      ))}
    </nav>
  );
}
