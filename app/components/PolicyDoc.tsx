import type { Block } from "@/lib/privacy";

// 개인정보 처리방침·이용약관처럼 '제목 + 문단/목록/표'로 된 문서를 보여 줍니다.
export default function PolicyDoc({ sections }: { sections: { title: string; body: Block[] }[] }) {
  return (
    <div className="policy-doc">
      {sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.body.map((b, i) =>
            typeof b === "string" ? (
              <p key={i}>{b}</p>
            ) : Array.isArray(b) ? (
              <ul key={i}>
                {b.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <div className="table-wrap" key={i}>
                <table>
                  <thead>
                    <tr>
                      {b.table[0].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.table.slice(1).map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          )}
        </section>
      ))}
    </div>
  );
}
