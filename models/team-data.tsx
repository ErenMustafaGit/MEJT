import DataGridData from "./data-grid-data";

export default interface TeamData extends DataGridData {
  teamId: string;
  name: string;
  trainerId: string;
  sessionNumber: number;
  athleteNumber: number;
}
