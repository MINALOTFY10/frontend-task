import type { Meeting } from "../../hooks/use-schedule";
import { LuChevronRight } from "react-icons/lu";

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <div className="border-custom" style={{ borderRadius: "10px", overflow: "hidden" }}>
      <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-1">
        <span
          className="rounded-pill px-2 py-0.5 fs-11"
          style={{
            background: meeting.categoryBg,
            color: meeting.categoryColor,
            fontWeight: 500,
          }}
        >
          {meeting.category}
        </span>

        <button className="btn p-0 border-0 text-muted">
          <LuChevronRight size={14} />
        </button>
      </div>

      <div className="px-3 pb-2">
        <p className="fw-semibold mb-0 small text-primary-custom">
          {meeting.title}
        </p>
        <p className="mb-0 small text-secondary fs-10">{meeting.time}</p>
      </div>

      {meeting.platform && <div className="px-3 pb-2 small text-secondary">{meeting.platform}</div>}
    </div>
  );
}