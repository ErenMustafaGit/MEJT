import ms from "ms";
import {} from "constants";
import {
  BLUE_LINE_GRAPH,
  ORANGE_LINE_GRAPH,
  VIOLET_LINE_GRAPH,
} from "./constants";
import { DateTime, DateTimeOptions } from "luxon";
import { Color } from "chart.js";
import { toast } from "react-toastify";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const filterData = (
  data: any,
  allXValues: number[],
  allYValues: number[],
  deltaMonth?: number,
  deltaYear?: number,
) => {
  const infDate: number = DateTime.now()
    .minus({ month: deltaMonth, year: deltaYear })
    .toMillis();
  const newLabels: number[] = allXValues.filter(
    (label: number) => label >= infDate,
  );
  const newYValues: number[] = allYValues.slice(
    allYValues.length - newLabels.length,
  );

  return {
    labels: newLabels,
    datasets: [
      {
        data: newYValues,
        borderColor: data.datasets[0].borderColor,
        fill: {
          target: "origin",
          above: data.datasets[0].fill.above,
        },
      },
    ],
    position: "right",
  };
};

export const displayToaster = (type: "success" | "error", message: string) => {
  if (type === "success") {
    toast.success(message, {
      theme: "colored",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else {
    toast.error(message, {
      theme: "colored",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const mailMatcher = (mail: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return mail.toLowerCase().match(emailRegex);
};

export const formatPrettyDate = (
  dateString: string,
  showHours: boolean = true,
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  if (showHours) {
    options["hour"] = "numeric";
    options["minute"] = "numeric";
    options["second"] = "numeric";
  }
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formatDateYYYYMMDD = (dateString: any): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
