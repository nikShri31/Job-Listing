import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

export function useResponsive(query, start, end) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}


/**
 * mediaUp: useMediaQuery(theme.breakpoints.up(start)) checks if the screen width is greater than or equal to the start breakpoint.
Example: useResponsive('up', 'md') returns true if the screen width is equal to or larger than the "md" (medium, usually 960px) breakpoint.

mediaDown: useMediaQuery(theme.breakpoints.down(start)) checks if the screen width is less than or equal to the start breakpoint.
Example: useResponsive('down', 'sm') returns true if the screen width is less than or equal to the "sm" (small, usually 600px) breakpoint.

mediaBetween: useMediaQuery(theme.breakpoints.between(start, end)) checks if the screen width is between the start and end breakpoints.
Example: useResponsive('between', 'sm', 'md') returns true if the screen width is between 600px and 960px.

mediaOnly: useMediaQuery(theme.breakpoints.only(start)) checks if the screen width is exactly at the start breakpoint.
Example: useResponsive('only', 'lg') returns true if the screen width is exactly at 1280px (large breakpoint).
 * 
 */