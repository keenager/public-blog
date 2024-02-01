import { navbarItems } from "./nav-bar";

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
        {navbarItems.map((item) => (
          <li key={item.key} onClick={hideDrawer}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
