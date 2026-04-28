'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-green-50 p-12 text-center border border-green-100">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h3 className="mt-6 text-2xl font-bold text-green-900">Application Received!</h3>
        <p className="mt-2 text-green-700">
          Thank you for your interest. Our admissions team will contact you shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 font-bold text-green-900 underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input
            {...register('name')}
            className={`w-full rounded-xl border bg-slate-50 px-4 py-3 focus:outline-none focus:ring-4 transition-all ${
              errors.name ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input
            {...register('email')}
            className={`w-full rounded-xl border bg-slate-50 px-4 py-3 focus:outline-none focus:ring-4 transition-all ${
              errors.email ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
        <input
          {...register('phone')}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 focus:outline-none focus:ring-4 transition-all ${
            errors.phone ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
          }`}
          placeholder="+1 (123) 456-7890"
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Message / Enquiry Details</label>
        <textarea
          {...register('message')}
          rows={4}
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3 focus:outline-none focus:ring-4 transition-all ${
            errors.message ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
          }`}
          placeholder="Tell us about your interests or questions..."
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-6 py-4 text-lg font-bold text-white transition-all hover:bg-blue-800 disabled:opacity-70 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}
