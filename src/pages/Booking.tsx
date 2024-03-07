import { Control, SubmitHandler, useForm, useWatch } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DesignTypeEnum = z.enum(["Flash", "Custom", "Freehand"]);
type DesignTypeEnum = z.infer<typeof DesignTypeEnum>;

const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";

// const schema = z.object({
//   firstName: z
//     .string({ invalid_type_error, required_error })
//     .min(1, required_error),
//   lastName: z.string().min(1),
//   email: z.string().email(),
//   instagram: z.string().min(1),
//   designType: DesignTypeEnum,
//   description: z.string().min(1),
// });

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  instagram: z.string(),
  designType: DesignTypeEnum,
  description: z.string(),
  date: z.coerce.date(),
  toggles: z.array(z.boolean()),
});

type FormFields = z.infer<typeof schema>;

const endpoint = `http://127.0.0.1:8000/app/inquiry-submission/`;

const availabilityEndpoint = `http://127.0.0.1:8000/app/availability/`;

const Booking = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      designType: DesignTypeEnum.enum.Custom,
    },
    resolver: zodResolver(schema),
  });

  const [availabilityData, setAvailabilityData] = useState<any[]>([]);

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get(availabilityEndpoint);
      const data = response.data;
      setAvailabilityData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error fetching available dates", error);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const toggles = useWatch({
    control,
    name: "toggles",
    defaultValue: [],
  });
  const checkedCount = toggles.filter(Boolean).length;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //formdata is for uploading files of different types, like images/files
    // var bodyFormData = new FormData();
    // bodyFormData.append("first_name", data.firstName);
    // bodyFormData.append("email", data.email);

    const formData = {
      first_name: data.firstName,
      email: data.email,
    };
    const response = await axios
      .post(endpoint, formData)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response);
    // const newData = await postData();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <>
      <section className="form-section">
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label>First Name</label>
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
            />
            {errors.firstName && (
              <div className="text-error">{errors.firstName.message}</div>
            )}
          </div>
          <div className="form-control">
            <label>Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input {...register("email")} type="text" placeholder="Email" />
            {errors.email && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
          <div className="form-control">
            <label>Instagram Handle</label>
            <input
              {...register("instagram", { required: true })}
              type="text"
              placeholder="Instagram Handle"
            />
          </div>
          <div className="form-control">
            <label>Design Type</label>
            <label htmlFor="designType">
              <input
                {...register("designType")}
                type="radio"
                value={DesignTypeEnum.enum.Flash}
                id="designType"
              />
              Flash
            </label>
            <label htmlFor="designType">
              <input
                {...register("designType")}
                type="radio"
                value={DesignTypeEnum.enum.Custom}
                id="designType"
              />
              Custom
            </label>
            <label htmlFor="designType">
              <input
                {...register("designType")}
                type="radio"
                value={DesignTypeEnum.enum.Freehand}
                id="designType"
              />
              Freehand
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="description">Placement and design ideas</label>
            {/* check that this textarea also goes in data on submit */}
            <textarea
              {...register("description")}
              id="description"
              name="description"
              placeholder="Description"
              rows={4}
            />
          </div>
          <div className="form-control">
            <p>Select 2 preferred dates. I will book you in for one of them.</p>
            <ul>
              {availabilityData.map((el, i) => (
                <li key={i} className="day-slot">
                  <input
                    {...register(`toggles[${i}]` as any)}
                    // name={`toggles[${i}]`}
                    type="checkbox"
                    id={el.date}
                    disabled={!toggles[i] && checkedCount >= 2}
                  />
                  <label htmlFor={el.date}>
                    {new Date(el.date).toDateString()}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Booking;
