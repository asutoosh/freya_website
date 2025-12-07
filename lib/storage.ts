import fs from "fs/promises";
import path from "path";
import { IPSession, Signal } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const IP_SESSIONS_FILE = path.join(DATA_DIR, "ip-sessions.json");
const SIGNALS_FILE = path.join(DATA_DIR, "signals.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// IP Sessions
export async function readIPSessions(): Promise<Record<string, IPSession>> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(IP_SESSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function writeIPSessions(
  sessions: Record<string, IPSession>
): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(IP_SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

// Signals
export async function readSignals(): Promise<Signal[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SIGNALS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeSignals(signals: Signal[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SIGNALS_FILE, JSON.stringify(signals, null, 2));
}
