import { Dispatch, SetStateAction, useState } from "react";
import DataHeader from "models/data-header";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/router";
import { Mail, PlusCircle } from "lucide-react";
import DataCreationModel from "models/data-creation-model";
import { mailMatcher } from "@/lib/utils";

export default function DataCreation({
  header,
  dataModel,
  onSubmitClick,
  data,
  dataSetter,
}: {
  header: DataHeader[];
  dataModel: DataCreationModel[];
  onSubmitClick: {
    path: string;
  };
  data: DataCreationModel[];
  dataSetter: Dispatch<SetStateAction<DataCreationModel[]>>;
}) {
  const router = useRouter();

  const handleOnChange = (
    index: number,
    value: string,
    e: HTMLInputElement,
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      value: value,
    };
    dataSetter(newData);

    if (value && value.length > 10) {
      setTimeout(() => {
        handleOnBlur(e);
      }, 5000);
    }
  };

  const handleOnRemove = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    dataSetter(newData);
  };

  const handleOnBlur = (e: HTMLInputElement) => {
    if (e.value !== "" && e.value !== null && mailMatcher(e.value)) {
      e.style.border = "1px solid #d1d5db";
    } else {
      e.style.border = "1px solid red";
    }
  };

  const handleOnAdd = () => {
    const newData = [...data];
    newData.push({
      value: "",
      key: "email",
    });
    dataSetter(newData);
  };

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

      {data?.map((item, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className={`flex h-auto items-center justify-center ${
              rowIndex % 2 === 1 ? "bg-rblue-100/30" : "bg-white"
            } `}
          >
            {header
              .filter((v) => v.show)
              .map((header, columnIndex) => {
                return (
                  <div
                    key={columnIndex + " " + rowIndex}
                    className={`flex h-full w-full items-center justify-center gap-4 border-b border-gray-200 py-2 text-sm text-gray-500`}
                  >
                    {rowIndex != 0 ? (
                      <div className="w-1/4 sm:w-1/3"></div>
                    ) : (
                      ""
                    )}
                    <div className={`flex  ${rowIndex != 0 ? "w-1-3" : ""}`}>
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <Mail className="w-1/2 text-lg text-gray-400"></Mail>
                      </div>
                      <input
                        type="email"
                        value={item.value}
                        onBlur={(e) => {
                          handleOnBlur(e.target);
                        }}
                        onChange={(e) =>
                          handleOnChange(rowIndex, e.target.value, e.target)
                        }
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 bg-white/20 py-2 pl-10 pr-3 outline-none placeholder:text-gray-400/70 focus:border-rblue-500"
                        placeholder="oliver.kahn@example.com"
                      />
                    </div>
                    {rowIndex != 0 ? (
                      <div className="flex w-1/3 items-center justify-center">
                        <button
                          onClick={() => {
                            // Delete current data
                            handleOnRemove(rowIndex);
                          }}
                          className="flex items-center justify-center rounded-full bg-red-400/50 px-4 py-1 text-sm text-red-600/80"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </div>
        );
      })}
      <div
        className={`my-2 flex h-12 w-full items-center justify-center bg-white`}
      >
        <button
          onClick={() => handleOnAdd()}
          className="flex gap-6 rounded-lg border-2 border-dashed border-gray-400 p-2 outline-none transition-all duration-150 hover:bg-gray-100"
        >
          <PlusCircle className="mx-2 text-lg text-gray-400"></PlusCircle>
          <p className="w-full text-gray-400">Add a new athlete in the team</p>
        </button>
      </div>
    </div>
  );
}
