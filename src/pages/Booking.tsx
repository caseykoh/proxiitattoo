import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import goToTop from "../GoToTop";
import { uploadFileToS3, submitForm } from "../api.ts";
import { ImageUpload } from "../components/ImageUpload.tsx";

const imageReferencesAccessBase = import.meta.env.VITE_AWS_IMAGE_REFERENCES_URL;
const presignedApiUrl = import.meta.env.VITE_AWS_PRESIGNED_URLS;

const DesignTypeEnum = z.enum(["Flash", "Custom", "Freehand"], {
  errorMap: () => ({ message: "Please select an option" }),
});
type DesignTypeEnum = z.infer<typeof DesignTypeEnum>;

const imageReferenceSchema = z.object({
  file: z.any(),
  id: z.any(),
});

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" })
    .max(70, { message: "Name is over 70 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" })
    .min(1, { message: "Valid email is required" })
    .max(254, { message: "Email is over 254 characters" }),
  instagram: z
    .union([
      z
        .string()
        .max(30, { message: "Instagram handle is over 30 characters" })
        .refine((val) => !val.trim().includes(" "), {
          message: "Instagram handle cannot contain spaces",
        }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  designType: DesignTypeEnum,
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description is over 500 characters" }),
  reference: z
    .array(imageReferenceSchema)
    .refine((files) => files?.length > 0, {
      message: "At least one image reference is required.",
    }),
  size: z
    .string({ required_error: "Size is required" })
    .min(1, { message: "Size is required" })
    .max(100, { message: "Size is over 100 characters" }),
  placement: z
    .string({ required_error: "Placement is required" })
    .min(1, { message: "Placement is required" })
    .max(200, { message: "Placement is over 200 characters" }),
});

type FormFields = z.infer<typeof formSchema>;

const Booking = () => {
  const { state } = useLocation();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      reference: [], // Initialize as an empty array
    },
    resolver: zodResolver(formSchema),
  });

  const [images, setImages] = useState<{ file: File; id: any }[] | null>([]);

  useEffect(() => {
    goToTop();
    if (state?.flashImg) {
      // console.log(state.flashImg);
      setImages([{ file: state.flashImg, id: uuidv4() }]);
    }
  }, []);

  const onImageChange = (selectedImages: File[] | null) => {
    if (selectedImages) {
      const uniqueList = selectedImages.map((file) => {
        return {
          file,
          id: uuidv4(),
        };
      });
      setImages(uniqueList);
      if (uniqueList.length > 0) {
        setValue("reference", uniqueList);
        clearErrors(["reference"]);
      }
    }
  };

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("onsubmit called");
    if (!images || images.length === 0) {
      return;
    }
    try {
      //get image urls
      const payload = {
        imageList: images.map(({ id, file }) => {
          const lowExtension = file.type.split("/")[1].toLowerCase();
          const extension = lowExtension === "jpeg" ? "jpg" : lowExtension;
          return { id, extension };
        }),
      };
      // console.log("payload that is being sent to lambda: " + payload);
      const response = await axios.post(presignedApiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const presignedUrls = response.data.presignedUrls;
      // console.log(presignedUrls);
      // const urls = presignedUrls.map((obj: { url: any }) => obj.url);
      // got back {imageId, url}
      // find through images array for imageid and upload accordingly

      const urls = await Promise.all(
        presignedUrls.map(
          async (imageData: { imageId: any; url: any; key: any }) => {
            // console.log(imageData);
            const imgToUpload = images.find(
              (image) => image.id.toString() === imageData.imageId.toString()
            )?.file;
            if (imgToUpload) {
              await uploadFileToS3(imgToUpload, imageData.url);
            } else {
              throw "No matching image with id";
            }
            const accessUrl = imageReferencesAccessBase + imageData.key;
            return accessUrl;
          }
        )
      );
      // console.log(urls);

      const formFields = {
        full_name: data.name,
        email: data.email,
        instagram: data.instagram || null,
        design_type: data.designType,
        size: data.size,
        placement: data.placement,
        description: data.description,
        urls: urls,
      };

      await submitForm(formFields);
      console.log("Form submitted successfully!");
      navigate("/confirmation");
    } catch (error) {
      setError("root", {
        message: "Form could not be submitted.",
      });
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
            <h2 className="font-bold text-3xl font-mono mb-5">
              Books are currently: [OPEN]
            </h2>
            <p className="mb-3 text-gray-500">
              To request an appointment with <span>proxii_dream</span>, please
              fill out this form.
            </p>
            <p className="text-gray-500">
              If your project gets accepted, we'll reach out to you via email.
              Please be ready to place a booking fee (50) to secure your
              appointment.
            </p>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label className="font-semibold">I'm looking for a... *</label>
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
                  <div
                    className={
                      "card " + (errors.designType ? "card-error" : "")
                    }
                  >
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
                  <div
                    className={
                      "card " + (errors.designType ? "card-error" : "")
                    }
                  >
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
                  <div
                    className={
                      "card " + (errors.designType ? "card-error" : "")
                    }
                  >
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
              {errors.designType && (
                <div className="text-error">{errors.designType.message}</div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="reference" className="font-semibold">
                Upload Image References (Max 3)*
              </label>

              <Controller
                name="reference"
                control={control}
                render={() => (
                  <ImageUpload
                    onChange={onImageChange}
                    maxImages={3}
                    acceptTypes={["image/jpeg", "image/png"]}
                  />
                )}
              />
              {errors.reference && (
                <div className="text-error">
                  {errors.reference.message?.toString()}
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="font-semibold">
                Where do you want it? (Left or right side) *
              </label>
              <input
                {...register("placement")}
                type="text"
                className={errors.placement ? "text-input-error" : ""}
                placeholder="Placement"
              />
              {errors.placement && (
                <div className="text-error">{errors.placement.message}</div>
              )}
            </div>
            <div className="form-control">
              <label className="font-semibold">How big? *</label>
              <input
                {...register("size")}
                type="text"
                className={errors.size ? "text-input-error" : ""}
                placeholder="Size"
              />
              {errors.size && (
                <div className="text-error">{errors.size.message}</div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="description" className="font-semibold">
                What's your vision for the piece? *
              </label>
              {/* check that this textarea also goes in data on submit */}
              <textarea
                {...register("description")}
                id="description"
                name="description"
                className={errors.description ? "text-input-error" : ""}
                placeholder="Describe your vision"
                rows={4}
              />
              {errors.description && (
                <div className="text-error">{errors.description.message}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <h3>Contact Info</h3>
            <div className="contact-input-group">
              <div className="form-control">
                <label className="font-semibold">Full Name *</label>
                <input
                  {...register("name")}
                  type="text"
                  className={errors.name ? "text-input-error" : ""}
                />
                {errors.name && (
                  <div className="text-error">{errors.name.message}</div>
                )}
              </div>
              <div className="form-control">
                <label className="font-semibold">Email *</label>
                <input
                  {...register("email")}
                  type="text"
                  className={errors.email ? "text-input-error" : ""}
                />
                {errors.email && (
                  <div className="text-error">{errors.email.message}</div>
                )}
              </div>
              <div className="form-control">
                <label className="font-semibold">Instagram Handle</label>
                <input
                  {...register("instagram")}
                  type="text"
                  className={errors.instagram ? "text-input-error" : ""}
                  placeholder="@"
                />
                {errors.instagram && (
                  <div className="text-error">{errors.instagram.message}</div>
                )}
              </div>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={
              "submit-button " + (isSubmitting ? "disabled-button" : "")
            }
          >
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
          {errors.root && (
            <div className="text-error">{errors.root.message}</div>
          )}
        </form>
      </section>
    </>
  );
};

export default Booking;
