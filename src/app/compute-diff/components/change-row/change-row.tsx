import type { Change, JsonValue } from '../../lib/compute-diff.ts';
import { formatPath } from '../../lib/format-path.ts';
import * as styles from './change-row.css.ts';

const show = (v: JsonValue) => JSON.stringify(v);

export function ChangeRow({ change }: { change: Change }) {
  return (
    <li className={`${styles.row} ${styles.rowVariant[change.op]}`}>
      <span className={styles.op}>{change.op}</span>
      <code className={styles.code}>{formatPath(change.path)}</code>
      <code className={styles.code}>
        {change.op === 'add' && show(change.newValue)}
        {change.op === 'remove' && show(change.oldValue)}
        {change.op === 'replace' &&
          `${show(change.oldValue)} → ${show(change.newValue)}`}
      </code>
    </li>
  );
}
