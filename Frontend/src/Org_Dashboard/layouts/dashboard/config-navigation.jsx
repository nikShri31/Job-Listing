
import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------


const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Users',
    path: '/org/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Applications',
    path: '/org/applications',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
