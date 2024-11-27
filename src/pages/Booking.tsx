import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./Booking.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
          <div className="flex flex-col gap-8">
            <div className="form-control">
              <label className="font-semibold">
                I'm Looking To Get... <span className="required-q">*</span>
              </label>
              <div className="flex flex-row gap-2">
                {Object.values(DesignTypeEnum.enum).map((designType) => (
                  <div key={designType}>
                    <label htmlFor={`${designType}-select`}>
                      <input
                        {...register("designType")}
                        className="peer hidden"
                        type="radio"
                        value={designType}
                        id={`${designType}-select`}
                      />
                      <div
                        className={`cursor-pointer  border-slate-950 hover:bg-slate-200 peer-checked:bg-slate-950 peer-checked:text-white peer-checked:border-slate-950 border-solid p-2 rounded-xl border-2  ${
                          errors.designType ? "card-error" : ""
                        }`}
                      >
                        <div className="card-info text-base">{designType}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.designType && (
                <div className="text-error">{errors.designType.message}</div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="reference" className="font-semibold">
                Upload Image References (Max 3){" "}
                <span className="required-q">*</span>
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
                Where do you want it? <span className="required-q">*</span>
              </label>
              <input
                {...register("placement")}
                type="text"
                className={errors.placement ? "text-input-error" : ""}
                placeholder="Placement, Left/Right/Middle"
              />
              {errors.placement && (
                <div className="text-error">{errors.placement.message}</div>
              )}
            </div>
            <div className="form-control">
              <label className="font-semibold">
                How big? <span className="required-q">*</span>
              </label>
              <input
                {...register("size")}
                type="text"
                className={errors.size ? "text-input-error" : ""}
                placeholder="Size (can be in inches)"
              />
              {errors.size && (
                <div className="text-error">{errors.size.message}</div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="description" className="font-semibold">
                What's your vision for the piece?{" "}
                <span className="required-q">*</span>
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
          <hr className="border-t-2 border-gray-300 my-4" />
          <div className="form-group">
            <h2 className="text-black font-bold text-2xl font-mono mb-5">
              Contact Info
            </h2>
            <div className="contact-input-group">
              <div className="form-control">
                <label className="font-semibold">
                  Full Name <span className="required-q">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className={errors.name ? "text-input-error" : ""}
                  placeholder="Name"
                />
                {errors.name && (
                  <div className="text-error">{errors.name.message}</div>
                )}
              </div>
              <div className="form-control">
                <label className="font-semibold">
                  Email <span className="required-q">*</span>
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className={errors.email ? "text-input-error" : ""}
                  placeholder="youremail@gmail.com"
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
