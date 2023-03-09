import DataGridData from "./data-grid-data";

export default interface SessionData extends DataGridData {
  sessionId: number;
  teamId: number;
  description: string;
  teamName: string;
  date: string;
  place: string;
  feedbackProvided: boolean;
}
