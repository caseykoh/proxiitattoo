import { SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCheckbox, IoCloudUpload, IoSquareOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  size: z.string(),
  placement: z.string(),
});

type FormFields = z.infer<typeof schema>;

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

  const [images, setImages] = useState<{ file: File; id: any }[] | null>([]);

  useEffect(() => {
    if (state?.flashImg) {
      console.log(state.flashImg);
      setImages([{ file: state.flashImg, id: uuidv4() }]);
    }
  }, []);

  const onImageChange = (event: any) => {
    if (event.target.files) {
      console.log(event.target.files);
      const fileList = Array.from(event.target.files as ArrayLike<File>);
      if (fileList.length > 3) {
        console.log(event.target.files);
        alert("Maximum of 3 files are allowed.");
        console.log("Maximum of 3 files are allowed.");
        const imageInput: HTMLInputElement | null = document.getElementById(
          "reference"
        ) as HTMLInputElement;
        if (imageInput) {
          imageInput.value = "";
        }
        console.log(event.target.files);
        return;
      }
      const uniqueList = fileList.map((file) => {
        return {
          file,
          id: uuidv4(),
        };
      });
      console.log(uniqueList);
      setImages(uniqueList);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //validate form to ensure:
    if (!images || images.length === 0) {
      return;
    }
    try {
      //get image urls
      const payload = {
        imageList: images.map(({ id }) => {
          return id;
        }),
      };
      console.log("payload that is being sent to lambda: " + payload);
      const response = await axios.post(
        import.meta.env.VITE_AWS_PRESIGNED_URLS,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const presignedUrls = response.data.presignedUrls;
      console.log(presignedUrls);
      // got back {imageId, url}
      // find through images array for imageid and upload accordingly

      // const urls = await Promise.all(
      //   presignedUrls.map(async (imageData: { imageId: any; url: any }) => {
      //     const imgToUpload = images.find(
      //       (image) => image.id.toString() === imageData.imageId.toString()
      //     )?.file;
      //     if (imgToUpload) {
      //       await uploadFileToS3(imgToUpload, imageData.url);
      //     } else {
      //       throw "No matching image with id";
      //     }
      //     return imageData.url;
      //   })
      // );
      // console.log(urls);

      const finalFormData = new FormData();
      finalFormData.append("full_name", data.name);
      finalFormData.append("email", data.email);
      finalFormData.append("instagram", data.instagram);
      finalFormData.append("design_type", data.designType);
      finalFormData.append("size", data.size);
      finalFormData.append("placement", data.placement);
      finalFormData.append("description", data.description);
      // finalFormData.append("images", JSON.stringify(urls));

      // await submitForm(finalFormData);
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
              <label>Include up to 3 image references. *</label>
              <input
                {...register("reference")}
                id="reference"
                name="reference"
                accept="image/*"
                type="file"
                multiple
                onChange={onImageChange}
              />
              {images && images.length > 0 ? (
                <div className="reference-list">
                  {images.map(({ file, id }) => (
                    <div className="image-preview">
                      <img
                        alt="preview image"
                        src={URL.createObjectURL(file)}
                        key={id}
                      />
                    </div>
                  ))}
                  {images.length < 3 && (
                    <label htmlFor="reference">
                      <div className="add-image-btn">
                        <IoCloudUpload className="upload-icon" />
                        <span>Add image</span>
                      </div>
                    </label>
                  )}
                </div>
              ) : (
                <label htmlFor="reference" className="empty-references">
                  <IoCloudUpload className="upload-icon" />
                  <span>Choose file</span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label>Where do you want it? *</label>
              <input
                {...register("placement")}
                type="text"
                placeholder="Placement"
              />
            </div>
            <div className="form-control">
              <label>How big? *</label>
              <input {...register("size")} type="text" placeholder="Size" />
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
