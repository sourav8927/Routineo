const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username can have a maximum of 20 characters" }),

  roll: z
    .string({ required_error: "Roll number is required" })
    .trim()
    .min(2, { message: "Roll number must be at least 2 characters long" })
    .max(50, { message: "Roll number can have a maximum of 50 characters" }),

  registrationNo: z
    .string({ required_error: "Registration number is required" })
    .trim()
    .min(5, { message: "Registration number must be at least 5 characters long" })
    .max(50, { message: "Registration number can have a maximum of 50 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(20, { message: "Phone number can have a maximum of 20 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(10, { message: "Email must be at least 10 characters long" })
    .max(200, { message: "Email can have a maximum of 200 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least 7 characters long" })
    .max(255, { message: "Password can have a maximum of 255 characters" }),

  currentyear: z
    .string({ required_error: "Current year is required" })
    .trim()
    .min(1, { message: "Current year must be at least 1 character long" })
    .max(10, { message: "Current year can have a maximum of 10 characters" }),

  semester: z
    .string({ required_error: "Semester is required" })
    .trim()
    .min(1, { message: "Semester must be at least 1 character long" })
    .max(10, { message: "Semester can have a maximum of 10 characters" }),

  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(2, { message: "Department must be at least 2 characters long" })
    .max(50, { message: "Department can have a maximum of 50 characters" }),
});

module.exports = signupSchema;
