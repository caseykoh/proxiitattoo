import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

const DesignTypeEnum = z.enum(["Flash", "Custom", "Freehand"]);
type DesignTypeEnum = z.infer<typeof DesignTypeEnum>;

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
  reference: z.any(),
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

  moment.tz.setDefault("America/Toronto");

  // availabilityData is array of {date, start_time, end_time}
  const [availabilityData, setAvailabilityData] = useState<any[]>([]);
  const [, setDate] = useState(new Date());
  const available = (date: Date) =>
    // new Date() < date &&
    availabilityData.some(
      (availableData) =>
        new Date(availableData.date + "T00:00").toDateString() ===
        date.toDateString()
    );

  const fetchAvailableDates = async () => {
    try {
      const response = await axios.get(availabilityEndpoint);
      const data = response.data;
      setAvailabilityData(data);
      setDate(new Date(data[0].date + "T00:00"));
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error fetching available dates", error);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const [images, setImages] = useState<string[]>([]);

  const onImageChange = (event: any) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      console.log(fileList);
      setImages(fileList.map((file: any) => file && URL.createObjectURL(file)));
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // const formData = {
    //   first_name: data.firstName,
    //   email: data.email,
    // };
    //formdata is for uploading files of different types, like images/files
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("instagram", data.instagram);

    formData.append("design_type", data.designType);
    formData.append("description", data.description);
    formData.append("images", data.reference);
    formData.append("date", data.date.toISOString().split("T")[0]);
    const response = await axios
      .post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
            <label htmlFor="reference">Reference photos</label>
            <input
              {...register("reference")}
              id="reference"
              name="reference"
              accept="image/*"
              type="file"
              multiple
              onChange={onImageChange}
            />
            {images.map((imageURL) => (
              <img alt="preview image" src={imageURL} />
            ))}
          </div>
          <div className="form-control">
            <label htmlFor="date">Select a preferred date</label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  filterDate={available}
                  onChange={(date) => {
                    date && setDate(date);
                    field.onChange(date);
                  }}
                  inline
                />
              )}
            />
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
