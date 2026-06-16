import { IconSVG } from '@components/shared/IconSVG';

export const ReportBugButton = () => {
  return (
    <a href='mailto:huelleigor1@outlook.com?subject=Otzdarva Builds bug report:' >
      <IconSVG icon='Bug' className='hover:text-red-600' />
    </a>
  )
}