export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password required";
  } else if (data.password.length < 6) {
    errors.password = "Password atleast needs 6 character";
  } else {
    delete errors.password;
  }

  if (type === "signup") {
    if (!data.name.trim()) {
      errors.name = "Username is required";
    } else {
      delete errors.name;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm password";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Password is not match";
    } else {
      delete errors.confirmPassword;
    }

    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "Accept our regulations";
    }
  }

  return errors;
};
