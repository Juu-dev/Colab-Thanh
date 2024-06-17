import {
  SettingsSidebarHeaderStyle,
  SettingsSidebarItemContainerStyle,
  SettingsSidebarStyle,
} from "@-styles";
import { settingsItems } from "@-utils/constants";

import { SettingsSidebarItem } from "./SettingsSidebarItem";

export const SettingsSidebar = () => {
  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeaderStyle>
        <span>Settings</span>
      </SettingsSidebarHeaderStyle>
      <SettingsSidebarItemContainerStyle>
        {settingsItems.map((item) => (
          <SettingsSidebarItem key={item.id} item={item} />
        ))}
      </SettingsSidebarItemContainerStyle>
    </SettingsSidebarStyle>
  );
};
