import styles from "./header.module.css";
import { MdFullscreen } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import avaterImg from "../assets/header-avater.png";
import siteImg from "../assets/icon.svg";
import darkSiteImg from "../assets/dark-icon.svg";
import { useTheme } from "../context/theme-context";
import { useNavigate } from "react-router";

export default function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className={`d-flex align-items-center justify-content-between px-3 py-2 ${styles.header}`}>
      <button className="d-flex align-items-center bg-transparent border-0 p-0" onClick={() => navigate("/dashboard")}>
        <img src={theme === "light" ? siteImg : darkSiteImg} alt="Site icon" width={32} height={32} className="me-2" />
        <div className="fs-6">
          <span className="fw-bold">Sugar</span>
          <span className="fw-semibold">panel</span>
        </div>
      </button>

      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className={`${styles.langBtn} btn btn-sm d-flex align-items-center gap-2 px-2 py-1 rounded-3 fw-medium border-0`}
          aria-label="Change language"
        >
          <span className="small">EN</span>
          <FaChevronDown size={10} aria-hidden="true" />
        </button>

        <button type="button" className={`${styles.iconBtn} btn rounded-circle p-0`} aria-label="Fullscreen">
          <MdFullscreen size={16} />
        </button>
        <button type="button" className={`${styles.iconBtn} btn rounded-circle p-0`} aria-label="Chat">
          <IoChatbubblesOutline size={16} />
        </button>
        <button type="button" className={`${styles.iconBtn} btn rounded-circle p-0`} aria-label="Notifications">
          <FaRegBell size={16} />
        </button>

        <div className="rounded-circle overflow-hidden ms-1" style={{ width: "30px", height: "30px" }} aria-label="User profile">
          <img src={avaterImg} alt="User profile" className="w-100 h-100 object-fit-cover" />
        </div>
      </div>
    </header>
  );
}
