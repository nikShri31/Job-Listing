
import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------


const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Profile',
    path: '/org/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Job applications',
    path: '/org/products',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
