import AdmissionForm from "@/components/AdmissionForm";

export default function AdmissionPage() {
  return (
    <div className="bg-white">
      <div className="bg-blue-900 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold md:text-6xl text-center">Admission Inquiry</h1>
          <p className="mt-6 mx-auto max-w-2xl text-center text-lg text-blue-100">
            Start your journey with us. Fill out the form below and our 
            admissions counselor will get back to you with all the details.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 md:p-12">
            <AdmissionForm />
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-bold text-slate-900">Required Documents</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>High School Transcripts</li>
                <li>Valid Identification (Passport/National ID)</li>
                <li>Proof of Residency</li>
                <li>2 Passport size photographs</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-bold text-slate-900">Application Timeline</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex justify-between"><span>Spring Intake:</span> <span className="font-semibold">Nov 15</span></li>
                <li className="flex justify-between"><span>Fall Intake:</span> <span className="font-semibold">June 30</span></li>
                <li className="flex justify-between"><span>Processing Time:</span> <span className="font-semibold">7-14 Days</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
