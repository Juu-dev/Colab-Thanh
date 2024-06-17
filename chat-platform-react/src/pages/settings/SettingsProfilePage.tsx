import { Edit } from "akar-icons";
import { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

import { UserAvatar } from "@-components/settings/profile/UserAvatar";
import { UserBanner } from "@-components/settings/profile/UserBanner";
import {
  OverlayStyle,
  PageStyle,
  ProfileAboutSectionStyle,
  ProfileAboutSectionHeaderStyle,
  ProfileDescriptionFieldStyle,
  ProfileEditActionBarStyle,
  ProfileSectionStyle,
  SettingsProfileUserDetailsStyle,
  DynamicButtonStyle,
} from "@-styles";
import { updateUserProfile } from "@-utils/api";
import { CDN_URL } from "@-utils/constants";
import { useAuthContext } from "@-utils/context";

export const SettingsProfilePage = () => {
  const { user, updateAuthUser } = useAuthContext();

  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarSource, setAvatarSource] = useState(
    CDN_URL.BASE.concat(user?.profile?.avatar || ""),
  );
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(avatarSource);

  const [bannerSource, setBannerSource] = useState(
    CDN_URL.BASE.concat(user?.profile?.banner || ""),
  );
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about, setAbout] = useState(user?.profile?.about || "");
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updating About");
    setAbout(user?.profile?.about || "");
  }, [user?.profile?.about]);

  useEffect(() => {
    console.log("Updating Banner URL");
    console.log(user?.profile?.banner);
    setBannerSource(CDN_URL.BASE.concat(user?.profile?.banner || ""));
    setBannerSourceCopy(CDN_URL.BASE.concat(user?.profile?.banner || ""));
  }, [user?.profile?.banner]);

  const isChanged = () => aboutCopy !== about || bannerFile || avatarFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setAvatarSourceCopy(avatarSource);
    setIsEditing(false);
    setAvatarFile(undefined);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
    URL.revokeObjectURL(avatarSourceCopy);
  };

  const save = async () => {
    const formData = new FormData();
    bannerFile && formData.append("banner", bannerFile);
    avatarFile && formData.append("avatar", avatarFile);
    about !== aboutCopy && formData.append("about", aboutCopy);
    try {
      setLoading(true);
      const { data: updatedUser } = await updateUserProfile(formData);
      console.log(updatedUser);
      URL.revokeObjectURL(bannerSourceCopy);
      URL.revokeObjectURL(avatarSourceCopy);
      setBannerFile(undefined);
      setAvatarFile(undefined);
      updateAuthUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <OverlayStyle>
          <MoonLoader size={40} color="#fff" />
        </OverlayStyle>
      )}
      <PageStyle>
        <UserBanner
          bannerSource={bannerSource}
          bannerSourceCopy={bannerSourceCopy}
          setBannerSourceCopy={setBannerSourceCopy}
          setBannerFile={setBannerFile}
        />
        <ProfileSectionStyle>
          <SettingsProfileUserDetailsStyle>
            <UserAvatar
              avatarSource={avatarSource}
              avatarSourceCopy={avatarSourceCopy}
              setAvatarSourceCopy={setAvatarSourceCopy}
              setAvatarFile={setAvatarFile}
            />
            <span>@{user?.username}</span>
          </SettingsProfileUserDetailsStyle>
          <ProfileAboutSectionStyle>
            <ProfileAboutSectionHeaderStyle>
              <label htmlFor="about">About Me</label>
              <Edit
                cursor="pointer"
                strokeWidth={2}
                size={28}
                onClick={() => setIsEditing(!isEditing)}
              />
            </ProfileAboutSectionHeaderStyle>
            <ProfileDescriptionFieldStyle
              maxLength={200}
              disabled={!isEditing}
              value={aboutCopy}
              onChange={(e) => setAboutCopy(e.target.value)}
            />
          </ProfileAboutSectionStyle>
        </ProfileSectionStyle>
        {isChanged() && (
          <ProfileEditActionBarStyle>
            <div>
              <span>You have unsaved changes</span>
            </div>
            <div className="buttons">
              <DynamicButtonStyle
                size="md"
                variant="secondary"
                onClick={reset}
                disabled={loading}
              >
                Reset
              </DynamicButtonStyle>
              <DynamicButtonStyle size="md" onClick={save} disabled={loading}>
                Save
              </DynamicButtonStyle>
            </div>
          </ProfileEditActionBarStyle>
        )}
      </PageStyle>
    </>
  );
};
