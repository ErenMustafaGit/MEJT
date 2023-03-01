import DataGridData from "./data-grid-data";

export default interface SessionData extends DataGridData {
  id: string;
  name: string;
  date: string;
  location: string;
  feedback: boolean;
}
