import { useState } from "react";
import { Card, Stack, Nav } from "react-bootstrap";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import { useSchedule } from "../../hooks/use-schedule";
import MeetingCard from "./meeting-card";
import MonthNavigater from "../shared/month-navigater";

const TABS = ["Meetings", "Events", "Holiday"];

export default function Schedule() {
  const { meetings } = useSchedule();
  const [activeTab, setActiveTab] = useState("Meetings");

  return (
    <Card className="border-0 rounded-4 h-100 d-flex flex-column overflow-hidden">
      <Card.Body className="p-3 d-flex flex-column">
        <Stack direction="horizontal" className="justify-content-between mb-3">
          <span className="fw-bold text-primary-custom">Schedule</span>
          <Stack direction="horizontal" gap={2}>
            <button className="btn p-0 border-0 btn-link text-decoration-none fw-semibold text-primary-custom fs-10">
              See All
            </button>
            <button className="btn p-0 border-0 ms-1">
              <LuSearch size={13} />
            </button>
          </Stack>
        </Stack>

        <MonthNavigater />

        <Nav variant="underline" className="mb-3 justify-content-between text-center" activeKey={activeTab} onSelect={(k) => setActiveTab(k ?? "Meetings")}>
          {TABS.map((tab) => (
            <Nav.Item key={tab} className="flex-grow-1">
              <Nav.Link eventKey={tab} className="px-0 small fw-medium text-secondary-custom">
                {tab}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="flex-grow-1 overflow-auto pe-1">
          {activeTab === "Meetings" ?
            <div className="d-flex flex-column gap-2 mt-2">
              {meetings.map((meeting, i) => (
                <MeetingCard key={i} meeting={meeting} />
              ))}
            </div>
          : <p className="text-center text-muted small py-3 mb-0">No {activeTab.toLowerCase()} scheduled</p>}
        </div>
      </Card.Body>
    </Card>
  );
}
