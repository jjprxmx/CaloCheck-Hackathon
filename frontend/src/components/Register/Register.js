import React, { useState, useEffect } from "react";
import Complete from "./Complete";
import Gender from "./Gender";
import Bmi from "./Bmi";


function Register() {


  const [userData, setUserData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    bmi: "",
  });

  const [currentStep, setCurrentStep] = useState("Gender");

  const handleGenderSubmit = (gender) => {
    setUserData({ ...userData, gender });
    setCurrentStep("Bmi");

  };

  const handleBmiSubmit = (age, weight, height) => {
    const bmi = calculateBMI(weight, height);
    setUserData({ ...userData, age, weight, height, bmi });
    setCurrentStep("Complete");
    addProsonalInfo();
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
    console.log(currentStep);

  };

  function calculateBMI(weight, height) {
    weight = parseFloat(weight);
    height = parseFloat(height);
    const BMI = weight / ((height * height) / 10000);
    return parseFloat(BMI).toFixed(2);
  }

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const addProsonalInfo = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`, {
      method: "PUT", // เปลี่ยน method เป็น PUT
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        gender:userData.gender,
        age:userData.age,
        weight:userData.weight,
        height:userData.height,
        bmi:userData.bmi
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }



  return (
    <>
      <div>
        {currentStep === "Gender" && (
          <Gender data={userData.gender} onSubmit={handleGenderSubmit} />
        )}
        {currentStep === "Bmi" && userData.gender && (
          <Bmi
            dataage={userData.age}
            dataweight={userData.weight}
            dataheight={userData.height}
            onSubmit={handleBmiSubmit}
            onEdit={() => handleEditStep("Gender")}
          />
        )}
        {currentStep === "Complete" &&
          userData.gender &&
          userData.age &&
          userData.weight &&
          userData.height &&
          userData.bmi && <Complete />}
      </div>

    </>
  );
}
export default Register;