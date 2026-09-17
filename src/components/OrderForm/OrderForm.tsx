import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useId } from "react";
import css from "./OrderForm.module.css";
import * as Yup from "yup";

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
  delivery: string;
  restrictions: string[];
  message: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  deliveryTime: "",
  delivery: "pickup",
  restrictions: [],
  message: "",
};

export default function OrderForm() {
  const fieldId = useId();

  const Schema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name is too long")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    delivery: Yup.string()
      .oneOf(["pickup", "courier", "drone"], "Invalid delivery method")
      .required("Delivery method is required"),
    restrictions: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one restriction"),
    deliveryTime: Yup.string().required("Select delivery time"),
    message: Yup.string()
      .min(5, "Message too short")
      .max(300, "Message too long"),
  });

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    console.log("Order data", values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>

          <label className={css.label} htmlFor={`${fieldId}-username`}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id={`${fieldId}-username`}
          />
          <ErrorMessage
            name="username"
            component="span"
            className={css.error}
          />

          <label className={css.label} htmlFor={`${fieldId}-email`}>
            Email
          </label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={`${fieldId}-email`}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Delivery method</legend>

          <label>
            <Field type="radio" name="delivery" value="pickup" />
            Pickup
          </label>
          <label>
            <Field type="radio" name="delivery" value="courier" />
            Courie
          </label>
          <label>
            <Field type="radio" name="delivery" value="drone" />
            Drone
          </label>
          <ErrorMessage
            name="delivery"
            component="span"
            className={css.error}
          />
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Dietary restrictions</legend>

          <label>
            <Field type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label>
            <Field type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
          <ErrorMessage
            name="restrictions"
            component="span"
            className={css.error}
          />
        </fieldset>

        <label htmlFor={`${fieldId}-deliveryTime`}>
          Preferred delivery time
        </label>
        <Field
          as="select"
          name="deliveryTime"
          className={css.field}
          id={`${fieldId}-deliveryTime`}
        >
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00-12:00)</option>
          <option value="afternoon">Afternoon (12:00-16:00)</option>
          <option value="evening">Evening (16:00-20:00)</option>
        </Field>
        <ErrorMessage
          name="deliveryTime"
          component="span"
          className={css.error}
        />

        <label htmlFor={`${fieldId}-message`} className={css.label}>
          Additional message
        </label>
        <Field
          as="textarea"
          name="message"
          id={`${fieldId}-message`}
          rows="5"
          className={css.textarea}
        />
        <ErrorMessage name="message" component="span" className={css.error} />

        <button className={css.btn} type="submit">
          Place order
        </button>
      </Form>
    </Formik>
  );
}
