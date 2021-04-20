// This file contains rules for form validation
import {
  required,
  confirmed,
  email,
  alpha_spaces,
  min,
  max,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required!",
});

extend("email", {
  ...email,
  message: "Email must be in a valid format!",
});

extend("confirmed", {
  ...confirmed,
  message: "Passwords must match!",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Name must be made of letters only.",
});

extend("max", {
  ...max,
  message: "Name cannot exceed 40 characters!",
});

extend("max_qty", {
  ...max,
  message: "Quantity cannot exceed 6 digits!",
});

extend("max_weight", {
  ...max,
  message: "Weight cannot exceed 4 digits!",
});

extend("password_min", {
  ...min,
  message: "Password must be at least 8 characters!",
});

extend("positive", (value) => {
  if (value >= 0) {
    return true;
  }

  return "Value must be positive!";
});

extend("greater_than_0", (value) => {
  if (value > 0) {
    return true;
  }

  return "Value must be greater than 0!";
});

extend("decimal", (value) => {
  const numStr = value.toString();
  const numSplit = numStr.split(".");
  if (numSplit.length > 1 && numSplit[1].length > 2) {
    return "Price cannot have more than 2 decimal places!";
  }

  return true;
});

extend("max_price", (value) => {
  if (value > 999999) {
    return "Exceeded maximum price!";
  }

  return true;
});
