import { useState, useEffect } from "react";
import meetingsData from "../utils/meetings.json";

export interface Meeting {
  id: number;
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  time: string;
  platform: string | null;
  extraCount: number;
}

export function useSchedule() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  // DummyJSON doesn't have meetings endpoint, so i'm using data from a JSON file
  useEffect(() => {
    const mappedMeetings = meetingsData.map((t) => ({
      id: t.id,
      category: t.category,
      categoryColor: t.categoryColor,
      categoryBg: t.categoryBg,
      title: t.title,
      time: t.time,
      platform: t.platform,
      extraCount: t.extraCount,
    }));

    setMeetings(mappedMeetings);
    setLoading(false);
  }, []);

  return { meetings, loading };
}