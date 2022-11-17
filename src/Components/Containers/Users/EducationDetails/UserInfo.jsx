import React from "react";
import StackComp from "../../../UI/Stack/Stack";
import { HeadingLabel, Group } from "./EducationDetails.style.js";
import KeyValue from "./../../../UI/KeyValue/KeyValue";
import Name from "./Name";
import { BiUpload } from "react-icons/bi";
import { ImgContainer, Img, Overlay } from "./UserInfo.style";
import IconButton from "../../../UI/IconButton/IconButton";
import Tooltip from "./../../../UI/Tooltip/ToolTip";
import defaultImage from "../../../../assets/images/user/default.jpg";

const UserInfo = ({
  openModal,
  data,
  imageHandler,
  preview,
  setPhone,
  setName,
  name,
  phone,
}) => {
  const { publicUrl } = data;
  return (
    <StackComp>
      <Group direction="row" justifyContent="space-between" alignItems="center">
        <HeadingLabel variant="h6">User Details</HeadingLabel>
      </Group>
      <Group alignItems="center" gap="1rem" justifyContent="center">
        <ImgContainer>
          <Img
            src={preview ? preview : publicUrl ? publicUrl : defaultImage}
            width="100%"
            height="100%"
            alt="user-img"
          />
          <Overlay>
            <Tooltip title="Upload Image">
              <IconButton style={{ cursor: "pointer" }}>
                <label htmlFor="icon-button-file" style={{ cursor: "pointer" }}>
                  <BiUpload color="white" />
                </label>
              </IconButton>
            </Tooltip>
          </Overlay>
        </ImgContainer>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={imageHandler}
          // onChange={(e) => {
          //   const selectImage = e.target.files[0];
          //   set_Image(selectImage);
          // }}
          // onChange={(e) => {
          //   enqueueSnackbar("Profile Picture Uploaded!", {
          //     variant: "success",
          //   });
          // }}
        />
        <Name name={name} setValue={setName} defaultValue={name} />
      </Group>
      <Group alignItems="flex-start" justifyContent="space-evenly" gap="1.3rem">
        {/* <KeyValue title="School name" snackBarTitle="School name changed succesfully" setValue={setSchoolName}  defaultValue={schoolName} /> */}
        <KeyValue
          title="Contact Number"
          snackBarTitle=" Contact changed succesfully"
          setValue={setPhone}
          defaultValue={phone}
        />
      </Group>
    </StackComp>
  );
};

export default UserInfo;
