import { FormattedMessage } from "react-intl";

import styles from "./styles/styles.module.scss";

const CustomTable = ({ cols = [], rows = [] }) => {
  return (
    <div className={styles["table-wrapper"]}>
      <table className="custom-table">
        <thead>
          <tr>
            {cols.map((col, idx) => (
              <th key={idx}>
                <FormattedMessage id={col.name} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.length > 0 ? (
            rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {cols.map((col, colIdx) => {
                  const value = row[col.name];

                  return (
                    <td key={colIdx}>
                      {col.render ? col.render(row, rowIdx) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={cols.length} className="text-center">
                <FormattedMessage id="noData" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
