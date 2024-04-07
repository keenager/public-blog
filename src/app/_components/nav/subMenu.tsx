import MenuLink from "./link";

export default function SubMenu({
  menuName,
  subRouteList,
}: {
  menuName: string;
  subRouteList: { href: string; name: string }[];
}) {
  const closeSubMenu = () => {
    const $menu = document.getElementById(menuName) as HTMLDetailsElement;
    $menu.open = false;
  };

  return (
    <li>
      <details id={menuName}>
        <summary>{menuName}</summary>
        <ul className="p-2 bg-base-100 rounded-t-none dark:bg-gray-900">
          {subRouteList.map(({ href, name }) => (
            <li key={href} onClick={closeSubMenu}>
              <MenuLink href={href} name={name} />
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
