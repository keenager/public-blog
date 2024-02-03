import { routeList, tagRouteList } from "@/lib/constants";
import MenuLink from "./link";

export default function SideBar() {
  const hideDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "nav-drawer"
    )! as HTMLInputElement;
    drawerCheckbox.checked = false;
  };

  return (
    <div className="drawer-side">
      <label htmlFor="nav-drawer" className="drawer-overlay"></label>

      <ul className="menu h-full w-48 bg-base-200 p-4">
        {routeList.map(({ href, name }) => (
          <li key={href} onClick={hideDrawer}>
            <MenuLink href={href} name={name} />
            {href.includes("blog") && (
              <ul>
                {tagRouteList.map(({ href, name }) => (
                  <li key={href}>
                    <MenuLink href={href} name={name} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
