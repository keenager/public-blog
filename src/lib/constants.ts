export const routeListOfBlog = [
  { href: "/blog", name: "모두" },
  // { href: "/blog/?tag=law", name: "법률" },
  { href: "/blog/tags/book", name: "책" },
  { href: "/blog/tags/dev", name: "웹개발" },
  { href: "/blog/tags/travel", name: "여행" },
  { href: "/blog/tags/essay", name: "일기" },
  { href: "/blog/tags/etc", name: "그밖에" },
];

export const routeListOfApps = [
  { href: "/apps", name: "개요" },
  { href: "/apps/roi", name: "수익률계산" },
];
export const routeList = [
  // { href: "/", name: "홈페이지" },
  { href: "/blog", name: "블로그", subRouteList: routeListOfBlog },
  { href: "/apps", name: "앱(App)", subRouteList: routeListOfApps },
];
