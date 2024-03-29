import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectUser, fetchUsersByName } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, passwordUpdatePage, rootPage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import Button from "components/Button";
import TextArea from "components/TextArea";
import { useRef } from "react";
import { IMAGE_PATH } from "constants/appConstants";
import Image from "components/Image";
import Link from "next/link";
import { User } from "model/user";
import { selectAuth } from "redux/slice/authSlice";
import { fetchAuthUserById, selectAuthUser, updateAuthUser } from "redux/slice/authUserSlice";
import { Error, setupAuthConfig } from "util/redux/apiBaseUtils";
import PersistLogin from "components/PersistLogin";
import { isEmpty } from "util/object/ObjectUtils";
import { ErrorResponse, UpdateUserFormData } from "botapeer-openapi/typescript-axios";

const WrapCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
`

const InnerCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`

const submitAreaCss = css`
  text-align: center;
  padding: 32px 0 0 0;
`

const InputsCss = css`
  flex: 1;
`
const CircleCss = css`
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: #E8E8E8;
`
const CoverCss = css`
  cursor: pointer;
  position: relative;
  background: #E8E8E8;
  height: 250px;
  width: 100%;
  margin: 0 0 80px 0;
`

const bgCircleCss = css`
  position: absolute;
  height: 115px;
  width: 115px;
  bottom: -50px;
  left: 30px;
  z-index: 1;
  background:#fff;
  border-radius: 50%;
`

const ProfileImageCss = css`
  &:hover {
    opacity: 0.8;
  }
`

const CoverImageCss = css`
  &:hover {
    opacity: 0.8;
  }
`

const AccountUpdateView = ({}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const authUser = useAppSelector(selectAuthUser);
  const [fileCover, setFileCover] = useState<string | undefined>();
  const [fileProfile, setFileProfile] = useState<string | undefined>('');
  const [formData, setFormData] = useState<UpdateUserFormData>()
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const fileProfileInput = useRef<HTMLInputElement>(null);
  const fileCoverInput = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorResponse>();

  useEffect(() => {
    const id = auth?.userId;
    if(!id) {
      return;
    } else {
      dispatch(fetchAuthUserById(id));
    }
  },[dispatch, auth?.userId])

  useEffect(() => {
    if(authUser.status == "succeeded" && !formData) {
      const _formData = Object.assign({},formData, {
        name: authUser?.data?.name,
        description: authUser?.data?.description,
        email: authUser?.data?.email
      });
      if(authUser.data?.coverImage) {
        setFileCover(IMAGE_PATH + authUser.data?.coverImage);
      }
      if(authUser.data?.profileImage) {
        setFileProfile(IMAGE_PATH + authUser.data?.profileImage);
      }
      setFormData(_formData);
    }
  },[authUser, formData])

  const childPages = [
    {
    href: rootPage.path + authUser?.data?.name,
    label: accountPage.text,
    }
  ]

  const currentPage = {
    label: (accountUpdatePage.text)
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  const handleClick = async() => {
    let profileFile = undefined;
    let coverFile = undefined;
    if(fileProfileInput?.current?.files) {
      profileFile = fileProfileInput.current.files[0];
    }

    if(fileCoverInput?.current?.files) {
      coverFile = fileCoverInput.current.files[0];
    }

    const authUserId = authUser.data?.id?.toString() ?? "";

    const updateAuthUserResultAction = await dispatch(updateAuthUser([authUserId, formData, profileFile, coverFile, setupAuthConfig()]))
    if(updateAuthUser.fulfilled.match(updateAuthUserResultAction)) {
      if(authUser.data?.id) {
        const FetchAuthUserByIdResultAction = await dispatch(fetchAuthUserById(authUser.data?.id))
        if(fetchAuthUserById.fulfilled.match(FetchAuthUserByIdResultAction)) {
          setMessage("更新しました");
        }
      }
    } else {
        setErrors(updateAuthUserResultAction.payload as ErrorResponse);
    }
  }

  const handleCoverUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length > 0) {
      var _binaryData = [];
      _binaryData.push(files[0]);
      const _file = window.URL.createObjectURL(new Blob(_binaryData, {type: "application/zip"}))
      setFileCover(_file);
    }
  }

  const handleProfileUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length > 0) {
      var _binaryData = [];
      _binaryData.push(files[0]);
      const _file = window.URL.createObjectURL(new Blob(_binaryData, {type: "application/zip"}))
      setFileProfile(_file);
    }
  }

  const handleName = (name: string) => {
    const _formData = Object.assign({}, formData, {name});
    setFormData(_formData);
  }

  const handleDesc = (description: string) => {
    const _formData = Object.assign({}, formData, {description});
    setFormData(_formData);
  }

  const handleEmail = (email: string) => {
    const _formData = Object.assign({}, formData, {email});
    setFormData(_formData);
  } 

  const handleMessageReset = () => {
    setMessage('');
    setErrors(undefined);
  }

  return (
      <Auth>
        <Layout breadCrumbProps={breadCrumb} propMessage={message} handleMessageReset={handleMessageReset} errorResponse={errors}>
          <div css={WrapCss}>
          <h2>{accountUpdatePage.text}</h2>
          <Divider />
          <div css={InnerCss}>
            <div css={InputsCss}>
            <label htmlFor="cover_image">
              <div css={CoverCss}>
                <div css={bgCircleCss}>
                  <label htmlFor="profile_image">
                  <div css={CircleCss}>
                  {fileProfile ?
                  <Image src={fileProfile} objectFit='cover' alt="profile image" layout='fill' css={ProfileImageCss} />
                  : null}
                  </div>
                  </label>
                </div>
                {fileCover ?
                <Image src={fileCover} objectFit='cover' alt="cover image" layout='fill' css={CoverImageCss} />
                : null}
              </div>
              </label>
              <Input
              labelText="名前"
              type="text"
              handleInput={(e) => handleName(e.target.value)}
              text={formData?.name ?? ""}
              /><br /><br />
              <Input
              labelText="メールアドレス"
              type="text"
              handleInput={(e) => handleEmail(e.target.value)}
              text={formData?.email ?? ""}
              /><br /><br />
              <TextArea
              labelText="説明"
              handleInput={(e) => handleDesc(e.target.value)}
              text={formData?.description ?? ""}
              /><br /><br />
              {/* <Link href={passwordUpdatePage.path}>パスワードの更新</Link>
              <br /><br /> */}
            </div>
            <div css={submitAreaCss}> 
              <Button handleClick={handleClick} disabled={disabled}>更新</Button>
            </div>
          </div>
          <input onChange={handleProfileUpdate} type="file" id="profile_image" ref={fileProfileInput} accept="image/*" hidden />
          <input onChange={handleCoverUpdate} type="file" id="cover_image" ref={fileCoverInput} accept="image/*" 
                hidden />
          </div>
      </Layout>
    </Auth>
  );
};

export default AccountUpdateView;
