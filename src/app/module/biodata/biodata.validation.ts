// import { z } from "zod";

// // Address validation schema
// const addressSchema = z.object({
//   address: z.string().default("উত্তর দেয়া হয়নি"),
//   upazila: z.string().default("উত্তর দেয়া হয়নি"),
//   district: z.string().default("উত্তর দেয়া হয়নি"),
//   division: z.string().default("উত্তর দেয়া হয়নি"),
// });

// // Education history item schema
// const educationHistorySchema = z.object({
//   level: z.string().optional(),
//   year: z.number().optional(),
//   group: z.string().optional(),
//   result: z.string().optional(),
//   subject: z.string().optional(),
//   institution: z.string().optional(),
// });

// // Income schema
// const incomeSchema = z.object({
//   amount: z.number().default(0),
//   currency: z.string().default("BDT"),
// });

// // Main biodata validation schema
// export const biodataSchema = z.object({
//   userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
//   name: z.string().min(1, "Name is required"),
//   gender: z.enum(["Male", "Female", "Other"]),
//   age: z
//     .number()
//     .min(1, "Age must be at least 1")
//     .max(120, "Age must be less than 120"),

//   address: z
//     .object({
//       present: addressSchema,
//       permanent: addressSchema,
//       grewUpAt: z.string().default("উত্তর দেয়া হয়নি"),
//     })
//     .optional(),

//   education: z
//     .object({
//       method: z.string().default("General"),
//       history: z.array(educationHistorySchema).default([]),
//       other: z.array(z.string()).default([]),
//     })
//     .optional(),

//   family: z
//     .object({
//       fatherAlive: z.boolean().default(true),
//       motherAlive: z.boolean().default(true),
//       fatherProfession: z.string().default("উত্তর দেয়া হয়নি"),
//       motherProfession: z.string().default("উত্তর দেয়া হয়নি"),
//       brothers: z.number().min(0).default(0),
//       sisters: z.number().min(0).default(0),
//       sistersInfo: z.array(z.string()).default([]),
//       unclesProfession: z.array(z.string()).default([]),
//       financialStatus: z.string().default("উত্তর দেয়া হয়নি"),
//       financialDetails: z.string().default("উত্তর দেয়া হয়নি"),
//       religiousPractice: z.string().default("উত্তর দেয়া হয়নি"),
//     })
//     .optional(),

//   personal: z
//     .object({
//       name: z.string().default("উত্তর দেওয়া হয়নি"),
//       gender: z.string().default("উত্তর দেওয়া হয়নি"),
//       dress: z.string().default("উত্তর দেয়া হয়নি"),
//       prayerHabit: z.string().default("উত্তর দেয়া হয়নি"),
//       maintainMahram: z.boolean().default(false),
//       quranReading: z.boolean().default(false),
//       fiqh: z.string().default("উত্তর দেয়া হয়নি"),
//       entertainment: z.boolean().default(false),
//       healthIssues: z.boolean().default(false),
//       specialSkills: z.string().default("উত্তর দেয়া হয়নি"),
//       favoriteBooks: z.array(z.string()).default([]),
//       hobbies: z.array(z.string()).default([]),
//     })
//     .optional(),

//   occupation: z
//     .object({
//       current: z.string().default("উত্তর দেয়া হয়নি"),
//       description: z.string().default("উত্তর দেয়া হয়নি"),
//       income: incomeSchema,
//     })
//     .optional(),

//   marriage: z
//     .object({
//       guardiansAgree: z.boolean().default(false),
//       studyContinue: z.boolean().nullable().default(null),
//       reason: z.string().default("উত্তর দেয়া হয়নি"),
//       jobStatus: z.string().default("উত্তর দেয়া হয়নি"),
//     })
//     .optional(),

//   preference: z
//     .object({
//       ageRange: z.string().default("উত্তর দেয়া হয়নি"),
//       complexion: z.string().default("উত্তর দেয়া হয়নি"),
//       height: z.string().default("উত্তর দেয়া হয়নি"),
//       education: z.string().default("উত্তর দেয়া হয়নি"),
//       location: z.string().default("উত্তর দেয়া হয়নি"),
//       maritalStatus: z.string().default("উত্তর দেয়া হয়নি"),
//       profession: z.string().default("উত্তর দেয়া হয়নি"),
//       financialCondition: z.string().default("উত্তর দেয়া হয়নি"),
//       qualities: z.array(z.string()).default([]),
//     })
//     .optional(),

//   pledge: z
//     .object({
//       parentsAware: z.boolean().default(false),
//       informationAccurate: z.boolean().default(false),
//       nikahResponsibility: z.boolean().default(false),
//     })
//     .optional(),

//   query: z.object({}).optional(),
//   params: z.object({}).optional(),
// });
