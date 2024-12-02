import HttpError from "http-errors";
import Joi from "joi";
const validate = (schema) => (req, res, next) => {
  try {
    const { error } = Joi.object(schema)
      .unknown()
      .validate(req, {
        abortEarly: false,
        errors: {
          label: "key",
        },
      });

    if (error) {
        console.log(JSON.stringify(error.details));
      const errors = {};
    //   eslint-disable-next-line no-shadow,array-callback-return
      error.details.map((error) => {
        error.path.shift();
        errors[error.path.join(".")] = [error.message][0].replace(/"/g, "");
      });
      console.log(errors)
      return res.status(401).json(errors);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validate;
