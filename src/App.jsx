import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const [gender, setGender] = useState();
  const [sport, setSport] = useState([]);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRadio = (e) => {
    setGender(e.target.value);
  };

  const handleSport = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSport([...sport, value]);
    } else {
      setSport(sport.filter((s) => s !== value));
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
    alert("Submited Successfully");
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">Registration Form</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className={errors.firstName ? "input-error" : ""}
              {...register("firstName", {
                required: "First Name Required",
                minLength: { value: 3, message: "Min 3 Chars" },
                maxLength: { value: 10, message: "Max 10 Chars Only" },
              })}
            />
            {errors.firstName && (
              <p className="error-msg">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className={errors.lastName ? "input-error" : ""}
              {...register("lastName", {
                required: "Last Name Required",
                minLength: { value: 3, message: "Min 3 Chars" },
                maxLength: { value: 10, message: "Max 10 Chars" },
              })}
            />
            {errors.lastName && (
              <p className="error-msg">{errors.lastName.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              className={errors.number ? "input-error" : ""}
              {...register("number", {
                required: "Phone Number Required",
                minLength: {
                  value: 10,
                  message: "Please Enter Valid 10-digit Number",
                },
                maxLength: {
                  value: 10,
                  message: "Please Enter Valid 10-digit Number",
                },
              })}
            />
            {errors.number && (
              <p className="error-msg">{errors.number.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={errors.Email ? "input-error" : ""}
              {...register("Email", {
                required: "Email Required",
              })}
            />
            {errors.Email && (
              <p className="error-msg">{errors.Email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className={errors.Password ? "input-error" : ""}
              {...register("Password", {
                required: "Password Required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Min 8 chars, 1 uppercase, 1 number & 1 special char",
                },
              })}
            />
            {errors.Password && (
              <p className="error-msg">{errors.Password.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Select Gender:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  value="Male"
                  {...register("gender", { required: "Select Gender" })}
                  onChange={handleRadio}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  {...register("gender", { required: "Select Gender" })}
                  onChange={handleRadio}
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="error-msg">{errors.gender.message}</p>
            )}
          </div>

          {/* Sports */}
          <div className="form-group">
            <label>Select Sport(s):</label>
            <label>
              <input
                type="checkbox"
                value="Cricket"
                {...register("sports", {
                  required: "Select at least one sport",
                })}
                onChange={handleSport}
              />{" "}
              Cricket
            </label>
            <label>
              <input
                type="checkbox"
                value="FootBall"
                {...register("sports", {
                  required: "Select at least one sport",
                })}
                onChange={handleSport}
              />{" "}
              Football
            </label>
            <label>
              <input
                type="checkbox"
                value="VollyBall"
                {...register("sports", {
                  required: "Select at least one sport",
                })}
                onChange={handleSport}
              />{" "}
              Volleyball
            </label>
            {errors.sports && (
              <p className="error-msg">{errors.sports.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              {...register("image", { required: "Please upload an image" })}
              onChange={handleImage}
            />
            {errors.image && (
              <p className="error-msg">{errors.image.message}</p>
            )}

            {image && (
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="form-group">
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Submitting..." : "Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
