import DataGridData from "./data-grid-data";

export default interface AthleteData extends DataGridData {
  userId: number;
  name: string;
  fitness: number;
  tiredness: number;
  stress: number;
  lastUpdate: string;
}
