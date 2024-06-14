import { SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoCheckbox, IoCloudUpload, IoSquareOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

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
  reference: z.any(),
  specs: z.string(),
});

type FormFields = z.infer<typeof schema>;

const endpoint = `http://127.0.0.1:8000/app/inquiry-submission/`;

const Booking = () => {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (state?.flashImg) {
      console.log(state.flashImg);
      setImages([state.flashImg]);
    }
  }, []);

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
            <p>Please fill out this form to inquire for a tattoo.</p>
            <p>
              If your project gets accepted, we'll reach out to you via email.
              Please be ready to place a booking fee to secure your appointment.
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
                      <p>
                        Choose a ready-made design from my flash. Flash can be
                        modified.
                      </p>
                      <div className="flash-button">
                        <NavLink to="/flash" className="view-flash-link">
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
                        You show up and a design is drawn directly on skin and
                        is then tattooed.
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
            <h3>Contact Info</h3>
            <div className="contact-input-group">
              <div className="form-control">
                <label>Full Name *</label>
                <input {...register("name")} type="text" />
                {errors.name && (
                  <div className="text-error">{errors.name.message}</div>
                )}
              </div>
              <div className="form-control">
                <label>Email</label>
                <input {...register("email")} type="text" />
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

          <button
            disabled={isSubmitting}
            type="submit"
            className="submit-button"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </section>
    </>
  );
};

export default Booking;
