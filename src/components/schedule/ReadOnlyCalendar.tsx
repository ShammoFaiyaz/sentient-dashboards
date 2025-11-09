"use client";

import * as React from "react";
import { Calendar, CalendarDays, CalendarRange, MapPin, Plus, X } from "lucide-react";

type View = "Day" | "Week" | "Month";

type EventItem = {
  id: string;
  title: string;
  when: string; // e.g., "10:00—11:15"
  where: string; // e.g., "Room 204"
  date: string; // YYYY-MM-DD
};

const demoEvents: EventItem[] = [
  { id: "e1", title: "Algorithms", when: "10:00—11:15", where: "Room 204", date: "2025-11-10" },
  { id: "e2", title: "Office Hours", when: "13:00—14:00", where: "Faculty Lounge", date: "2025-11-10" },
  { id: "e3", title: "Ethics", when: "09:00—10:15", where: "Hall B", date: "2025-11-11" },
];

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function ReadOnlyCalendar({ allowAdd = true, onAdd }: { allowAdd?: boolean; onAdd?: (e: EventItem) => void }) {
  const [view, setView] = React.useState<View>("Week");
  const [events, setEvents] = React.useState<EventItem[]>(demoEvents);
  const [showForm, setShowForm] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [where, setWhere] = React.useState("");

  return (
    <div>
      <div className="mt-2 mb-4 flex items-center justify-between">
        <div className="inline-flex rounded-md border border-line/60 bg-white p-1 text-sm shadow-elevation-sm">
          <button onClick={() => setView("Day")} className={classNames("flex items-center gap-1 rounded-md px-3 py-1", view === "Day" ? "bg-primary/10 text-ink" : "text-muted hover:bg-primary/5")}>
            <Calendar className="h-4 w-4" /> Day
          </button>
          <button onClick={() => setView("Week")} className={classNames("flex items-center gap-1 rounded-md px-3 py-1", view === "Week" ? "bg-primary/10 text-ink" : "text-muted hover:bg-primary/5")}>
            <CalendarRange className="h-4 w-4" /> Week
          </button>
          <button onClick={() => setView("Month")} className={classNames("flex items-center gap-1 rounded-md px-3 py-1", view === "Month" ? "bg-primary/10 text-ink" : "text-muted hover:bg-primary/5")}>
            <CalendarDays className="h-4 w-4" /> Month
          </button>
        </div>
        {allowAdd && (
          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-primary text-white px-3 py-1.5 text-sm shadow-elevation-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={showForm ? "Close add event" : "Add event"}
          >
            {showForm ? <X className="h-4 w-4 text-white" /> : <Plus className="h-4 w-4 text-white" />}
            <span>{showForm ? "Close" : "Add event"}</span>
          </button>
        )}
      </div>

      {showForm && allowAdd && (
        <AddEventForm
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          where={where}
          setWhere={setWhere}
          onSubmit={() => {
            if (!title || !date || !start || !end) return;
            const newEvent: EventItem = {
              id: Math.random().toString(36).slice(2),
              title,
              when: `${start}—${end}`,
              where: where || "TBD",
              date,
            };
            setEvents((ev) => [newEvent, ...ev]);
            setShowForm(false);
            setTitle(""); setDate(""); setStart(""); setEnd(""); setWhere("");
            onAdd?.(newEvent);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {view === "Month" ? <MonthGrid events={events} /> : <ListView events={events} view={view} />}
    </div>
  );
}

function AddEventForm(props: {
  title: string;
  setTitle: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  start: string;
  setStart: (v: string) => void;
  end: string;
  setEnd: (v: string) => void;
  where: string;
  setWhere: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const { title, setTitle, date, setDate, start, setStart, end, setEnd, where, setWhere, onSubmit, onCancel } = props;
  return (
    <div className="mb-4 rounded-md border border-line/60 bg-white p-3 shadow-elevation-sm">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm">Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Event title" />
        </label>
        <label className="text-sm">Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" />
        </label>
        <label className="text-sm">Start
          <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" />
        </label>
        <label className="text-sm">End
          <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" />
        </label>
        <label className="text-sm sm:col-span-2">Location
          <input value={where} onChange={(e) => setWhere(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Location (optional)" />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button onClick={onCancel} className="rounded-md border border-line/60 bg-white px-3 py-1.5 text-sm hover:bg-primary/5">Cancel</button>
        <button onClick={onSubmit} className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90">Add</button>
      </div>
    </div>
  );
}

function ListView({ events, view }: { events: EventItem[]; view: Exclude<View, "Month"> }) {
  // For demo, Day shows events for first date; Week shows all listed
  const dayDate = events[0]?.date;
  const list = view === "Day" ? events.filter((e) => e.date === dayDate) : events;
  return (
    <div className="mt-3 grid gap-2 md:grid-cols-2">
      {list.map((e) => (
        <div key={e.id} className="rounded-md border border-line/60 p-3">
          <div className="font-medium text-ink">{e.title}</div>
          <div className="text-xs text-muted">{e.date} • {e.when}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-sm text-neutral-dark/80"><MapPin className="h-3.5 w-3.5" /> {e.where}</div>
        </div>
      ))}
    </div>
  );
}

function MonthGrid({ events }: { events: EventItem[] }) {
  // Draw a 5x7 grid for demo month; mark days that have events with dots
  const dates = generateMonthDays();
  const eventDates = new Set(events.map((e) => e.date));
  return (
    <div className="mt-3 grid grid-cols-7 gap-2 text-sm">
      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
        <div key={d} className="text-center text-xs text-muted">{d}</div>
      ))}
      {dates.map((d) => (
        <div key={d.key} className={classNames("min-h-[72px] rounded-md border p-2", d.inMonth ? "border-line/60" : "border-line/30 bg-neutral-light/40")}> 
          <div className="text-xs text-muted">{d.day}</div>
          {eventDates.has(d.iso) && (
            <div className="mt-2 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function generateMonthDays() {
  // Demo: fixed 5-week grid for Nov 2025 starting on Monday (assumed)
  const daysInMonth = 30;
  const startOffset = 5; // number of leading days from previous month to align Mon-start
  const grid: Array<{ key: string; day: number; inMonth: boolean; iso: string }> = [];
  let dayCounter = 27; // previous month trailing start
  for (let i = 0; i < startOffset; i++) {
    const iso = `2025-10-${String(dayCounter++).padStart(2, "0")}`;
    grid.push({ key: `p-${i}`, day: dayCounter - 1, inMonth: false, iso });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `2025-11-${String(d).padStart(2, "0")}`;
    grid.push({ key: `m-${d}`, day: d, inMonth: true, iso });
  }
  while (grid.length % 7 !== 0) {
    const next = grid.length - (startOffset + daysInMonth) + 1;
    const iso = `2025-12-${String(next).padStart(2, "0")}`;
    grid.push({ key: `n-${next}`, day: next, inMonth: false, iso });
  }
  return grid;
}
