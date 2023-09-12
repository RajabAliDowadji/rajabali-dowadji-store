const emailReg =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordReg =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,16}$/;

export const onChangeInputFieldValidations = (event: any) => {
  if (
    event.target.value.trim() !== "" &&
    event.target.value.trim().length > 0
  ) {
    if (event.target.name === "email") {
      if (!emailReg.test(event.target.value)) {
        return { error: true, message: `Enter a valid email.` };
      } else {
        return { error: false, message: `` };
      }
    } else if (event.target.name === "password") {
      if (!passwordReg.test(event.target.value)) {
        return {
          error: true,
          message: `The ${capatalizeString(
            event.target.name
          )} should contain atleast 8 letters, one uppercase, one lowercase and one special character.`,
        };
      } else {
        return { error: false, message: `` };
      }
    } else {
      return { error: false, message: `` };
    }
  } else {
    return {
      error: true,
      message: `${capatalizeString(event.target.name)} is required.`,
    };
  }
};
export const capatalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const isEmpty = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else {
    return { status: false, message: "" };
  }
};
export const emailValidate = (fieldName: string, val: string) => {
  if (val.trim().length === 0 && val.trim() === "") {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (!emailReg.test(val)) {
    return { status: true, message: `Invalid email address.` };
  }
  return { status: false, message: "" };
};

export const passwordValidate = (fieldName: string, password: string = "") => {
  if (password === "" || password === undefined || password === null) {
    return {
      status: true,
      message: `${capatalizeString(fieldName)} is required.`,
    };
  } else if (!passwordReg.test(password)) {
    return {
      status: true,
      message: `The ${capatalizeString(
        fieldName
      )} should contain atleast 8 letters, one uppercase, one lowercase and one special character.`,
    };
  }

  return { status: false, message: "" };
};
