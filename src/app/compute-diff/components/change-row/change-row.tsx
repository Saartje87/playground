import type { Change, JsonValue } from '../../lib/compute-diff.ts';
import { formatPath } from '../../lib/format-path.ts';
import * as styles from './change-row.css.ts';

const show = (v: JsonValue) => JSON.stringify(v);

export function ChangeRow({ change }: { change: Change }) {
  return (
    <li className={`${styles.row} ${styles.rowVariant[change.op]}`}>
      <span className={`${styles.op} ${styles.opVariant[change.op]}`}>
        {change.op}
      </span>
      <code className={styles.code}>{formatPath(change.path)}</code>
      <div className={styles.values}>
        {change.op !== 'add' && (
          <div className={styles.value}>
            {change.op === 'replace' && (
              <span className={styles.valueLabel}>Old</span>
            )}
            <code className={styles.code}>{show(change.oldValue)}</code>
          </div>
        )}
        {change.op !== 'remove' && (
          <div className={styles.value}>
            {change.op === 'replace' && (
              <span className={styles.valueLabel}>New</span>
            )}
            <code className={styles.code}>{show(change.newValue)}</code>
          </div>
        )}
      </div>
    </li>
  );
}
