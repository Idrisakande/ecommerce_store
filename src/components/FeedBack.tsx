import { FC, useRef, useState } from "react";
import { Model } from "@/components/Model";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "./widgets/Button";
import { FieldValue } from "react-hook-form";

interface FeedBackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedBack: FC<FeedBackProps> = ({ isOpen, onClose }) => {
  const feedBack = true;
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
    // console.log(value);
  };
  const handleSubmit = (
    data: FieldValue<{ selectedRadio: string; details: string }>,
    e: { preventDefault: () => void }
  ) => {
    e.preventDefault();
    if (selectedRadio === null) {
      setError("Please select a radio option");
    } else {
      // Log the selected radio and textarea values
      // // console.log("Selected Radio:", selectedRadio);
      // // console.log("Textarea Content:", details);
      // console.log(data);
      // Clear any previous error
      setError(null);
      // Close the feedback form
      onClose();
    }
  };
  return (
    <Model
      isOpen={isOpen}
      onclose={onClose}
      title="Was what you Ordered for you got?"
      rootClassName="sm:max-w-[80%] md:max-w-[65%] lg:max-w-[50%]"
      className="border-b border-[#D5D5E6] pb-6"
      feedBack={feedBack}
    >
      <form
        onSubmit={(e) => handleSubmit({ selectedRadio, details }, e)}
        className=" w-full md:max-w-[40rem] mt-6 pb-8 px-8 md:px-20"
      >
        <RadioGroup.Root
          className="flex flex-col gap-3"
          value={selectedRadio || undefined}
          onValueChange={handleRadioChange}
          defaultValue="Yes, Got what I ordered for"
          aria-label="View density"
        >
          <div className="flex gap-2 rounded-md justify-start items-center bg-white pt-3">
            <RadioGroup.Item
              className="bg-white w-[18px] h-[18px] rounded-full border border-slate-500 hover:bg- focus: outline-none cursor-default"
              value="Yes, Got what I ordered for"
              id="r1"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
            </RadioGroup.Item>
            <label
              className="text-sm leading-none text-start text-[#0C0E3B]"
              htmlFor="r1"
            >
              Yes, Got what I ordered for
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item
              className="bg-white w-[18px] h-[18px] rounded-full border border-slate-500 hover:bg- focus: outline-none cursor-default"
               value="No, another item(s)"
              id="r2"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[6px] after:h-[6px] after:rounded-[50%] after:bg-afruna-blue" />
            </RadioGroup.Item>
            <label
              className="text-sm leading-none text-start text-[#0C0E3B]"
              htmlFor="r2"
            >
              No, another item(s)
            </label>
          </div>
        </RadioGroup.Root>
        {/* Error message for radio selection */}
        {error && (
          <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1">
            {error}
          </span>
        )}
        <fieldset className="w-full mt-6 flex flex-col gap-2 justify-start items-start">
          <label className="text-sm text-[#0C0E3B]">Details(Optional)</label>
          <textarea
            rows={5}
            value={details}
            ref={textareaRef}
            onChange={(e) => setDetails(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit({ selectedRadio, details }, e);
              }
            }}
            placeholder="Tell us more about it..."
            style={{ resize: "none" }}
            className="p-3 w-full text-sm placeholder:text-sm placeholder:text-[#CBCBCB] border border-slate-300 rounded-md"
          />
        </fieldset>
        {details === "" && (
          <span
            ref={textareaRef}
            className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
          ></span>
        )}
        {/* Submit button */}
        <div className="mt-6 flex justify-end w-full">
          <Button
            type="submit"
            primary
            className="rounded-md px-6 md:px-10 md:py-3"
          >
            Submit
          </Button>
        </div>
      </form>
    </Model>
  );
};
