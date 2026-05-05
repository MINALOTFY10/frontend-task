import { useNavigate, useLocation } from "react-router";
import styles from "./sidebar.module.css";
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineSettings } from "react-icons/md";
import { useTheme } from "../context/theme-context";
import { navItems } from "../utils/nav-items";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={`${styles.sidebar} d-flex flex-column flex-md-column flex-row align-items-center justify-content-between py-2`} aria-label="Primary navigation">
      <nav
        className={`${styles.navList} d-flex flex-md-column flex-row align-items-center justify-content-around gap-md-3 gap-0 pt-md-4 w-100`}
        aria-label="Main navigation"
      >
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = path && location.pathname === path;
          return (
            <button
              key={label}
              type="button"
              className={`${styles.navItem} btn d-flex align-items-center justify-content-center rounded-circle border-0 p-0 my-md-1 ${isActive ? styles.active : ""}`}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => path && navigate(path)}
            >
              <Icon className="fs-6 lh-1" aria-hidden />
            </button>
          );
        })}
      </nav>

      <div className={`${styles.bottomActions} d-none d-md-flex flex-column align-items-center gap-3 pb-2`}>
        <button
          type="button"
          className={`${styles.themeButton} btn d-flex align-items-center justify-content-center rounded-circle border-0 p-0`}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          onClick={toggleTheme}
        >
          {theme === "light" ?
            <MdOutlineLightMode className="fs-6 lh-1" aria-hidden />
          : <MdOutlineDarkMode className="fs-6 lh-1" aria-hidden />}
        </button>

        <button
          type="button"
          className={`${styles.settingsButton} btn d-flex align-items-center justify-content-center rounded-circle border-0 p-0 shadow-sm`}
          aria-label="Settings"
        >
          <MdOutlineSettings className="fs-6 lh-1" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
