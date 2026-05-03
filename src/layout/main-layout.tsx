import type { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./main-layout.module.css";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Header />
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
