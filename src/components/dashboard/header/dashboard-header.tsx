import { LuBell } from "react-icons/lu";
import { LuCalendarDays, LuDownload, LuSearch, LuSlidersHorizontal, LuX } from "react-icons/lu";
import { useAuth } from "../../../context/auth-context";

export default function DashboardHeader({ notificationCount = 0 }: { notificationCount?: number }) {
  const { user } = useAuth();

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
      <div>
        <h1 className="m-0 fw-bold fs-5">
          Welcome Back {user?.firstName} {user?.lastName}
        </h1>
        <div className="d-flex align-items-center gap-2 mt-2 text-muted-custom fs-8">
          <LuBell size={16} />
          <span>
            You have {notificationCount} unread notification{notificationCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="d-flex align-items-center flex-wrap gap-2 ms-auto">
        <div className="d-flex align-items-center gap-2 px-3 py-2 bg-white rounded-pill" style={{ minWidth: 260 }}>
          <LuSearch size={16} className="text-muted" />
          <input type="text" placeholder="Search..." className="border-0 bg-transparent flex-grow-1 fs-9" style={{ outline: "none" }} aria-label="Search" />
          <button type="button" className="btn btn-sm p-0 border-0 bg-transparent text-muted">
            <LuX size={14} />
          </button>
        </div>

        <button type="button" className="btn btn-light rounded-pill px-3 py-2 d-flex align-items-center gap-2">
          <span className="fw-semibold fs-9">Date</span>
          <LuCalendarDays size={14} className="text-muted" />
        </button>

        <button type="button" className="btn btn-light rounded-pill px-3 py-2 d-flex align-items-center gap-2">
          <span className="fw-semibold fs-9">Export Document</span>
          <LuDownload size={14} className="text-muted" />
        </button>

        <button
          type="button"
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 38, height: 38 }}
          aria-label="Filter"
        >
          <LuSlidersHorizontal size={16} className="text-muted" />
        </button>
      </div>
    </div>
  );
}
