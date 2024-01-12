import { systemContactNumber } from "../../const";

export default function BankAccount() {
  return (
    <div className="mt-8">
      <div className="font-semibold"> Bank account</div>

      <div className="flex flex-row justify-center mt-4">
        <div className="w-full md:w-1/2">
          <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
            <div className="font-medium w-full text-right">Bank</div>
            <div className="w-full">Bank of Ceylon</div>
          </div>
          <div className="flex flex-row gap-4 py-2">
            <div className="font-medium w-full text-right">Branch</div>
            <div className="w-full">Embilipitiya city (312)</div>
          </div>
          <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
            <div className="font-medium w-full text-right">Account Number</div>
            <div className="w-full">920 80 857</div>
          </div>
          <div className="flex flex-row gap-4 py-2">
            <div className="font-medium w-full text-right">Name</div>
            <div className="w-full">J R D D G Dissanayaka</div>
          </div>
        </div>
      </div>

      <div className="mt-12 italic">
        Any help {systemContactNumber} via whatsApp
      </div>
    </div>
  );
}
