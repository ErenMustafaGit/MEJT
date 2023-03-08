import DataGridData from "models/data-grid-data";
import DataHeader from "models/data-header";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/router";
import BooleanChips from "./boolean-chips";

export default function DataGrid({
  header,
  data,
  onRowClick,
  emptyString = "No data",
  clickCondition,
}: {
  header: DataHeader[];
  data: DataGridData[];
  emptyString?: string;
  clickCondition?: DataHeader["slug"];
  onRowClick?:
    | {
        slug: string;
        path: string;
      }
    | undefined;
}) {
  const router = useRouter();
  return (
    <div
      className={`relative col-span-1 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white`}
    >
      <div className="flex w-full items-center justify-center ">
        {header
          .filter((v) => v.show)
          .map((item, index) => {
            return (
              <div
                key={index}
                className={`flex h-12 w-full items-center justify-center border-b-4 border-gray-200 bg-gray-50 text-sm font-bold font-medium text-gray-500`}
              >
                <Balancer className="text-xs font-bold md:text-base lg:text-lg">
                  {item.name}
                </Balancer>
              </div>
            );
          })}
      </div>
      {data.length === 0 && (
        <div className="flex h-full w-full items-center justify-center p-2">
          <Balancer className="text-italic text-sm italic text-gray-400 md:text-base lg:text-lg">
            {emptyString}
          </Balancer>
        </div>
      )}

      {data &&
        data.map((item, rowIndex) => {
          return (
            <div
              key={rowIndex}
              onClick={() => {
                if (
                  (onRowClick && !clickCondition) ||
                  (onRowClick && clickCondition && item[clickCondition])
                ) {
                  router.push(
                    `${onRowClick.path}${item[onRowClick.slug]}`,
                    undefined,
                    { shallow: true },
                  );
                }
              }}
              className={`flex h-12 items-center justify-center ${
                rowIndex % 2 === 1 ? "bg-rblue-100/30" : "bg-white"
              } ${
                (onRowClick && !clickCondition) ||
                (onRowClick && clickCondition && item[clickCondition])
                  ? `cursor-pointer ${
                      rowIndex % 2 === 1
                        ? "hover:bg-rblue-100/60"
                        : "hover:bg-gray-50"
                    }`
                  : ""
              } `}
            >
              {header
                .filter((v) => v.show)
                .map((header, columnIndex) => {
                  return (
                    <div
                      key={columnIndex + " " + rowIndex}
                      className={`flex h-full w-full items-center justify-center border-b border-gray-200 text-sm text-gray-500`}
                    >
                      {typeof item[header.slug] === "boolean" ? (
                        <BooleanChips
                          value={item[header.slug]}
                          trueString="Yes"
                          falseString="No"
                        />
                      ) : (
                        <Balancer className="truncate text-ellipsis xl:overflow-visible">
                          {item[header.slug]}
                        </Balancer>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
