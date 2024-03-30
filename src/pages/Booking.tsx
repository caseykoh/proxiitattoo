import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { custom, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoCloudUpload,
  IoSquareOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

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
  name: z.string(),
  email: z.string(),
  instagram: z.string(),
  designType: DesignTypeEnum,
  description: z.string(),
  date: z.coerce.date(),
  reference: z.any(),
  specs: z.string(),
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
    defaultValues: {},
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
    formData.append("first_name", data.name);
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

  const [flashSelected, setFlashSelected] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);
  const [freehandSelected, setFreehandSelected] = useState(false);

  return (
    <>
      <section className="form-section">
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-header">
            <h2>Booking Form</h2>
            <p>
              Please fill out this form to inquire for a tattoo. If your project
              gets accepted, we'll reach out to you via email. Please be ready
              to place a booking fee to secure your appointment.
            </p>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>I'm looking for a... *</label>
              <div className="design-type-container">
                <input
                  {...register("designType")}
                  type="radio"
                  value={DesignTypeEnum.enum.Flash}
                  id="flash-select"
                />
                <input
                  {...register("designType")}
                  type="radio"
                  value={DesignTypeEnum.enum.Custom}
                  id="custom-select"
                />
                <input
                  {...register("designType")}
                  type="radio"
                  value={DesignTypeEnum.enum.Freehand}
                  id="freehand-select"
                />
                <label
                  htmlFor="flash-select"
                  onClick={() => {
                    if (!flashSelected) {
                      setFlashSelected(!flashSelected);
                      setCustomSelected(false);
                      setFreehandSelected(false);
                    }
                  }}
                >
                  <div className="card">
                    <span className="check-btn">
                      {flashSelected ? <IoCheckbox /> : <IoSquareOutline />}
                    </span>
                    <div className="card-info">
                      <h2 className="card-title">Flash</h2>
                      <p>Choose a ready-made design from my flash.</p>
                      <div className="flash-button">
                        <NavLink to="/gallery" className="view-flash-link">
                          view flash
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </label>
                <label
                  htmlFor="custom-select"
                  onClick={() => {
                    if (!customSelected) {
                      setFlashSelected(false);
                      setCustomSelected(!customSelected);
                      setFreehandSelected(false);
                    }
                  }}
                >
                  <div className="card">
                    <span className="check-btn">
                      {customSelected ? <IoCheckbox /> : <IoSquareOutline />}
                    </span>
                    <div className="card-info">
                      <h2 className="card-title">Custom</h2>
                      <p>
                        Specify a placement and size with references, and a
                        design will be custom made for you.
                      </p>
                    </div>
                  </div>
                </label>
                <label
                  htmlFor="freehand-select"
                  onClick={() => {
                    if (!freehandSelected) {
                      setFlashSelected(false);
                      setCustomSelected(false);
                      setFreehandSelected(!freehandSelected);
                    }
                  }}
                >
                  <div className="card">
                    <span className="check-btn">
                      {freehandSelected ? <IoCheckbox /> : <IoSquareOutline />}
                    </span>
                    <div className="card-info">
                      <h2 className="card-title">Freehand</h2>
                      <p>
                        For the spontaneous and utmost fan of my work: you show
                        up and a design is drawn directly on skin and is then
                        tattooed.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label>Image references *</label>
              <input
                {...register("reference")}
                id="reference"
                name="reference"
                accept="image/*"
                type="file"
                multiple
                onChange={onImageChange}
              />
              {images.length === 0 ? (
                <label htmlFor="reference" className="empty-references">
                  <IoCloudUpload className="upload-icon" />
                  <span>Choose file</span>
                </label>
              ) : (
                <label htmlFor="reference" className="add-references">
                  {images.map((imageURL) => (
                    <img alt="preview image" src={imageURL} />
                  ))}

                  <div className="add-image-btn">
                    <IoCloudUpload className="upload-icon" />
                    <span>Add image</span>
                  </div>
                </label>
              )}
            </div>
            <div className="form-control">
              <label>Where do you want it and how big? *</label>
              <input
                {...register("specs")}
                type="text"
                placeholder="Size + Placement"
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">
                What's your vision for the piece?
              </label>
              {/* check that this textarea also goes in data on submit */}
              <textarea
                {...register("description")}
                id="description"
                name="description"
                placeholder="Describe your vision"
                rows={4}
              />
            </div>
          </div>
          <div className="form-group">
            <h3>Preferred Date</h3>
            <div className="form-control">
              <label htmlFor="date">
                Select a date that works for your appointment *
              </label>
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
          </div>

          <div className="form-group">
            <h3>Contact Info</h3>
            <div className="contact-input-group">
              <div className="form-control">
                <label>Full Name *</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="First Name"
                />
                {errors.name && (
                  <div className="text-error">{errors.name.message}</div>
                )}
              </div>
              <div className="form-control">
                <label>Email</label>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <div className="text-error">{errors.email.message}</div>
                )}
              </div>
              <div className="form-control">
                <label>Instagram Handle *</label>
                <input
                  {...register("instagram", { required: true })}
                  type="text"
                  placeholder="@"
                />
              </div>
            </div>
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
