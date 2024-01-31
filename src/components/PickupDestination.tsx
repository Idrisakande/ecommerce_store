import { FC, FormEvent, useCallback, useMemo, useState } from "react";
import { Model } from "@/components/Model";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import * as RadioGroup from "@radix-ui/react-radio-group";
import ItemPicker from "@/components/ItemPicker";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "./widgets/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { FieldValue } from "react-hook-form";

interface PickupDestinationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PickupDestination: FC<PickupDestinationProps> = ({
  isOpen,
  onClose,
}) => {
  const pickuo = true
  const { currentActiveUsersData, isActive } = useSelector(
    (state: RootState) => state.users
  );

  const [selectedLocation, setSelectedLocation] =
    useState<string>("Niger State");

  const agency = useMemo(
    () =>
      [
        {
          location: "Kaduna state",
          agency: ["gog", "CND", "Fed-x"],
        },
        {
          location: "FCT",
          agency: ["gog", "Fed-x"],
        },
        {
          location: "Osun state",
          agency: ["gog", "Fed-x"],
        },
        {
          location: "Lagos state",
          agency: ["gog", "Fed-x", "Elary"],
        },
        {
          location: "Oyo state",
          agency: ["gog", "Fed-x", "Elary", "No 12 ajayi store"],
        },
        {
          location: "Ogun State",
          agency: [
            "gog",
            "Fed-x",
            "Elary",
            "No 12 ajayi store Fed-x hskkkk kdfh top",
          ],
        },
      ].filter((item) => {
        if (item.location === selectedLocation) {
          return item.agency;
        }
      }),
    [selectedLocation]
  );

  const [selectedPickupStation, setSelectedPickupStation] = useState<
    string | null
  >(null);
  const [selectedPayOptRadio, setSelectedPayOptRadio] = useState<string | null>(
    null
  );
  const [minnaBES, setMinnaBES] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handlePayOptChange = useCallback(
    (value: string) => setSelectedPayOptRadio(value),
    []
  );
  const handleSubmit = (
    data: FieldValue<{
      selectedPayOptRadio: string;
      selectedLocation: string;
      selectedPickupStation: string;
      minnaBES: string;
    }>,
    e: FormEvent<HTMLFormElement> 
  ) => {
    e.preventDefault();
    if (!selectedLocation) {
      setError("Please select your location");
      return;
    }
    if (selectedPayOptRadio === null) {
      setError("Please select a pick up station");
      return;
    }
    if (selectedPayOptRadio === null) {
      setError("Please select a pay option");
      return;
    }
    if (selectedPayOptRadio === null) {
      setError("Please select the mina bes ");
      return;
    }
    // console.log(data);
    // Clear any previous error
    setError(null);
    // Close the feedback form
    onClose();
  };


  return (
    <Model
      isOpen={isOpen}
      onclose={onClose}
      rootClassName="sm:max-w-[80%] md:max-w-[85%] lg:max-w-[75%]"
      pickup={pickuo}
    >
      
      <div className="lg:max-w-[65rem] md:max-w-[50rem] mx-auto w-full">
        <div className="px-4 pb-2 mt-1 sm:mt-6 lg:mt-8 flex justify-start sm:max-w-[90%] w-full md:max-w-[87%] sm:mx-auto items-start">
          <h2 className="font-bold text-start text-lg md:text-2xl lg:text-3xl leading-6 w-full max-w-[80%]">
            Select a pickup station that closest to you
          </h2>
        </div>
        <ScrollArea.Root className="w-full h-[50vh] lg:h-[56vh] sm:max-w-[90%] md:max-w-[85%] sm:mx-auto px-4 pt-3 bg-white rounded-xl">
          <ScrollArea.Viewport className="w-full h-full ">
            <form className="flex flex-col gap-6 px-2 pb-6">
              <div className="flex flex-col gap-6 md:gap-8 w-full mt-2 md:mt-4 lg:mt-6 md:flex-row">
                <fieldset className="flex w-full flex-col gap-1 md:gap-2">
                  <span className="text-[#0C0E3B] text-start font-bold lg:text-lg">
                    Current Location
                  </span>
                  <ItemPicker
                    items={[
                      "Kaduna state",
                      "FCT",
                      "Osun state",
                      "Oyo state",
                      "Lagos state",
                      "Ogun State",
                    ]}
                    placeholder={
                      selectedLocation ? selectedLocation : "Niger State"
                    }
                    getSelected={(val) => setSelectedLocation(val as string)}
                    // contentClassName={"p-2 bg-white text-xs"}
                    contentClassName="z-40"
                    triggerClassName="p-[10px] rounded-lg z-50"
                  />
                </fieldset>
                <fieldset className="flex w-full flex-col gap-1 md:gap-2">
                  <span className="text-[#0C0E3B] text-start font-bold lg:text-lg">
                    Prefered Pickup Station
                  </span>
                  <ItemPicker
                    items={agency[0]?.agency ?? []}
                    placeholder={"Bosso estate minnna class 1baluba"}
                    getSelected={(value) => {}}
                    contentClassName="z-40"
                    triggerClassName="p-[10px] rounded-lg z-50"
                  />
                </fieldset>
              </div>
              <div className="flex flex-col w-full gap-6 md:gap-8 lg:mt-3 md:flex-row">
                <RadioGroup.Root
                  className="flex gap-2 w-full rounded-md justify-start items-start bg-white"
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div>
                    <RadioGroup.Item
                      className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                      value="Pay with Cards"
                      id="r1"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                    </RadioGroup.Item>
                  </div>

                  <label
                    className="flex flex-col gap-1 justify-start text-start items-start"
                    htmlFor="r1"
                  >
                    <h4 className="font-bold mt-1 text-sm lg:text-base">
                      Minna BES
                    </h4>
                    <p className="text-[#0C0E3B] text-[0.8rem] lg:max-w-[85%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exer
                    </p>
                  </label>
                </RadioGroup.Root>

                <div className="flex w-full flex-col gap-1 justify-start text-start items-start">
                  <h4 className="font-bold text-sm lg:text-base">
                    Payment Options:
                  </h4>
                  {/* <p className="text-[#0C0E3B] text-[0.8rem] lg:max-w-[85%]">
                    Pay on Delivery, Bulk Pay On Delivery , Pay with Cards, Bank
                    Transfer or USSD
                  </p> */}
                  <RadioGroup.Root
                    defaultValue="Pay with Cards"
                    aria-label="View density"
                    value={selectedPayOptRadio || undefined}
                    onValueChange={handlePayOptChange}
                    className="flex flex-col gap-1 ml-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                        value="Pay with Cards"
                        id="r1"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                      </RadioGroup.Item>
                      <label
                        className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                        htmlFor="r1"
                      >
                        Pay with Cards
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                        value="Pay on Delivery"
                        id="r2"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                      </RadioGroup.Item>
                      <label
                        className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                        htmlFor="r2"
                      >
                        Pay on Delivery
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                        value="Bank Transfer or USSD"
                        id="r3"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                      </RadioGroup.Item>
                      <label
                        className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                        htmlFor="r3"
                      >
                        Bank Transfer or USSD
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        className="bg-white w-[16px] h-[16px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                        value="Bulk pay on Delivery"
                        id="r4"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
                      </RadioGroup.Item>
                      <label
                        className=" text-[#0C0E3B] text-[0.77rem] leading-none"
                        htmlFor="r4"
                      >
                        Bulk pay on Delivery
                      </label>
                    </div>
                  </RadioGroup.Root>
                  {/* Error message for pay options */}
                  {error && (
                    <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1">
                      {error}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between items-center lg:mt-1 md:justify-center md:gap-8">
                <div className="flex flex-col w-full gap-1 items-start justify-start">
                  <h4 className="font-bold text-sm lg:text-base">Contact</h4>
                  <span className="text-xs text-[#0C0E3B] md:text-sm">
                    {currentActiveUsersData && isActive
                      ? currentActiveUsersData.phoneNumber
                      : "Add phone number"}
                  </span>
                </div>
                <div className="flex flex-col w-full items-start gap-1 justify-start">
                  <h4 className="font-bold text-sm lg:text-base">
                    Opening hours
                  </h4>
                  <span className="text-xs text-[#0C0E3B] md:text-sm">
                    08 : 30AM to 06 : 00PM
                  </span>
                </div>
              </div>
            </form>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex rounded-xl select-none touch-none p-0.5 bg-slate-100 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-xl relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[35px] before:min-h-[35px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar className="" orientation="horizontal">
            <ScrollArea.Thumb className="" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="" />
        </ScrollArea.Root>
        {/* <div className="mt-4" /> */}
        <div className="flex my-4 lg:mb-6 flex-col gap-3 sm:gap-5 md:flex-row md:justify-center max-w-[85%] sm:max-w-[47%] md:max-w-[73%] lg:max-w-[60%] w-full mx-auto">
          <Button
            fullWidth
            className="rounded-md  lg:text-lg border border-[#FFC584]"
          >
            Cancel
          </Button>
          <Button
            primary
            fullWidth
            type="submit"
            // onClick={(e) => handleSubmit({ selectedPayOptRadio, details }, e)}
            className="rounded-md py-3"
          >
            Save selected pickup station
          </Button>
        </div>
      </div>
    </Model>
  );
};

// selectedPayOptRadio
